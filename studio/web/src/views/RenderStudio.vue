<template>
  <div class="render-studio">
    <h1>{{ t('render.title') }}</h1>

      <!-- Live 3D Preview (embedded renderer) -->
      <div class="panel">
        <div class="panel-header">
          <div>
            <h2>{{ t('render.livePreview') }}</h2>
            <p class="panel-desc">{{ t('render.previewDesc') }}</p>
          </div>
          <div class="renderer-toggle">
            <button
              :class="['toggle-btn', rendererMode === 'threejs' ? 'active' : '']"
              @click="switchRenderer('threejs')"
            >{{ t('render.threejsPreview') }}</button>
            <button
              :class="['toggle-btn', rendererMode === 'gsplat' ? 'active' : '']"
              @click="switchRenderer('gsplat')"
            >{{ t('render.gsplatProduction') }}</button>
          </div>
        </div>

        <div class="renderer-iframe-wrap">
          <!-- Three.js Preview renderer -->
          <iframe
            v-show="rendererMode === 'threejs'"
            ref="threejsIframe"
            src="/renderer.html"
            class="renderer-iframe"
            allow="cross-origin-isolated"
            sandbox="allow-scripts allow-same-origin allow-downloads"
            @load="onRendererIframeLoad('threejs')"
          ></iframe>
          <!-- gsplat.js Production renderer -->
          <iframe
            v-show="rendererMode === 'gsplat'"
            ref="gsplatIframe"
            src="/gsplat-renderer.html"
            class="renderer-iframe"
            allow="cross-origin-isolated"
            sandbox="allow-scripts allow-same-origin allow-downloads"
            @load="onRendererIframeLoad('gsplat')"
          ></iframe>
        </div>
        <p class="hint" style="margin-top:8px; margin-bottom:0;">
          <template v-if="rendererMode === 'threejs'">
            {{ t('render.threejsHint') }}
          </template>
          <template v-else>
            {{ t('render.gsplatHint') }}
          </template>
          <span v-if="rendererReady" class="ready-dot" :title="t('render.livePreview')"></span>
        </p>

        <!-- Send scene to renderer -->
        <div class="renderer-controls" v-if="rendererMode === 'gsplat' && selectedSceneFile">
          <button @click="sendSceneToRenderer" class="btn btn-sm btn-accent" :disabled="!gsplatReady">
            {{ t('render.loadInGsplat') }}
          </button>
          <button @click="captureRendererFrame" class="btn btn-sm" :disabled="!gsplatReady">
            {{ t('render.captureFrame') }}
          </button>
        </div>
      </div>

      <!-- Direct Render -->
      <div class="panel">
        <h2>{{ t('render.directRender') }}</h2>
        <p class="panel-desc">{{ t('render.directDesc') }}</p>

      <div class="form-group">
        <label>{{ t('render.sceneFile') }}</label>
        <div class="scene-file-row">
          <select v-model="selectedSceneFile" class="scene-select">
            <option value="">{{ t('render.syntheticScene') }}</option>
            <option v-for="sf in sceneFiles" :key="sf.name" :value="sf.path">
              {{ sf.name }} ({{ sf.sizeMB }}MB, {{ sf.format }})
            </option>
          </select>
          <button @click="loadSceneFiles" class="btn btn-sm" :disabled="loadingScenes">
            <span v-if="loadingScenes" class="btn-spinner-sm"></span>
            {{ sceneFiles.length > 0 ? t('render.refresh') : t('render.scan') }}
          </button>
        </div>
        <p v-if="sceneFiles.length === 0 && !loadingScenes" class="hint">
          {{ t('render.noSceneFiles') }} <code>scenes/</code> {{ t('render.noSceneFiles2') }}
        </p>
      </div>

      <div class="form-group">
        <label>{{ t('render.sceneDesc') }}</label>
        <textarea v-model="sceneDesc" rows="3" :placeholder="t('render.sceneDescPlaceholder')"></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>{{ t('render.cameraPos') }}</label>
          <div class="coord-inputs">
            <input v-model.number="camPos.x" type="number" step="0.1" placeholder="x" />
            <input v-model.number="camPos.y" type="number" step="0.1" placeholder="y" />
            <input v-model.number="camPos.z" type="number" step="0.1" placeholder="z" />
          </div>
        </div>
        <div class="form-group">
          <label>{{ t('render.cameraTarget') }}</label>
          <div class="coord-inputs">
            <input v-model.number="camTarget.x" type="number" step="0.1" placeholder="x" />
            <input v-model.number="camTarget.y" type="number" step="0.1" placeholder="y" />
            <input v-model.number="camTarget.z" type="number" step="0.1" placeholder="z" />
          </div>
        </div>
        <div class="form-group">
          <label>{{ t('render.fov') }}</label>
          <input v-model.number="fov" type="number" min="10" max="120" step="1" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>{{ t('render.quality') }}</label>
          <select v-model="quality">
            <option value="draft">{{ t('render.draft') }}</option>
            <option value="preview">{{ t('render.preview') }}</option>
            <option value="final">{{ t('render.final') }}</option>
          </select>
        </div>
      </div>

      <button @click="renderDirect" :disabled="rendering || (!sceneDesc && !selectedSceneFile)" class="btn btn-primary">
        <span v-if="rendering" class="btn-spinner"></span>
        {{ rendering ? t('render.rendering') : t('render.renderScene') }}
      </button>

      <!-- Error State -->
      <div v-if="renderError" class="result-error">
        <span class="error-icon">&#9888;</span>
        <span>{{ t('render.renderFailed') }}{{ renderError }}</span>
      </div>

      <!-- Result -->
      <div v-if="renderResult && !renderError" class="render-result">
        <h3>{{ t('render.renderResult') }}</h3>
        <div class="result-grid">
          <div class="result-field">
            <span class="result-label">{{ t('render.sceneId') }}</span>
            <span class="result-value mono">{{ renderResult.sceneId }}</span>
          </div>
          <div v-if="renderResult.renderUrl" class="result-field">
            <span class="result-label">{{ t('render.renderUrl') }}</span>
            <a :href="renderResult.renderUrl" target="_blank" class="result-link">{{ renderResult.renderUrl }}</a>
          </div>
        </div>
        <div v-if="renderResult.previewUrl" class="result-preview">
          <img :src="renderResult.previewUrl" alt="Render Preview" @error="previewFailed = true" />
          <div v-if="previewFailed" class="preview-fallback">
            <span>{{ t('render.previewUnavailable') }}</span>
          </div>
        </div>
      </div>

      <!-- gsplat.js Captured Frame -->
      <div v-show="capturedFrame" class="render-result" style="margin-top:16px; border:1px solid #4ecdc4; padding:12px;">
        <h3>{{ t('render.capturedFrame') }}</h3>
        <div class="result-preview">
          <img v-if="capturedFrame" :key="captureKey" :src="capturedFrame" alt="gsplat.js Capture" style="max-width:100%; border:1px solid #333;" />
        </div>
      </div>
    </div>

    <!-- Batch Render (Toonflow) -->
    <div class="panel">
      <h2>{{ t('render.batchRender') }}</h2>
      <p class="panel-desc">{{ t('render.batchDesc') }}</p>

      <div class="form-group">
        <label>{{ t('render.projectId') }}</label>
        <input v-model="batchProjectId" :placeholder="t('render.projectIdPlaceholder')" />
      </div>

      <div class="form-group">
        <label>{{ t('render.storyboardIds') }}</label>
        <input v-model="batchStoryboardIds" :placeholder="t('render.storyboardIdsPlaceholder')" />
      </div>

      <button @click="renderBatch" :disabled="batchRendering || !batchProjectId" class="btn btn-primary">
        <span v-if="batchRendering" class="btn-spinner"></span>
        {{ batchRendering ? t('render.renderingBatch') : t('render.renderBatch') }}
      </button>

      <div v-if="batchError" class="result-error">
        <span class="error-icon">&#9888;</span>
        <span>{{ t('render.batchFailed') }}{{ batchError }}</span>
      </div>

      <div v-if="batchResult" class="render-result">
        <h3>{{ t('render.batchResult') }}</h3>
        <div class="result-grid">
          <div class="result-field">
            <span class="result-label">{{ t('render.batchId') }}</span>
            <span class="result-value mono">{{ batchResult.id }}</span>
          </div>
          <div class="result-field">
            <span class="result-label">{{ t('render.status') }}</span>
            <span class="badge" :class="batchResult.status === 'completed' ? 'badge-green' : 'badge-blue'">{{ batchResult.status }}</span>
          </div>
          <div class="result-field">
            <span class="result-label">{{ t('render.tasks') }}</span>
            <span class="result-value">{{ batchResult.tasks?.length || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue';
import * as api from '../composables/useApi';
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();

// ---- Renderer mode ----
type RendererMode = 'threejs' | 'gsplat';
const rendererMode = ref<RendererMode>('gsplat');  // Default to gsplat for production quality
const rendererReady = ref(false);
const gsplatReady = ref(false);
const capturedFrame = ref<string | null>(null);
const captureKey = ref(0);  // Force re-render of captured frame image

const threejsIframe = ref<HTMLIFrameElement | null>(null);
const gsplatIframe = ref<HTMLIFrameElement | null>(null);

function switchRenderer(mode: RendererMode) {
  rendererMode.value = mode;
  rendererReady.value = false;
  gsplatReady.value = false;
}

function onRendererIframeLoad(mode: RendererMode) {
  if (mode === rendererMode.value) {
    rendererReady.value = true;
    if (mode === 'gsplat') {
      // Wait for gsplat.js to signal readiness
      setTimeout(() => { gsplatReady.value = true; }, 2000);
    }
  }
}

// ---- postMessage communication with gsplat iframe ----
function sendToGsplatIframe(message: any) {
  const iframe = gsplatIframe.value;
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage(message, '*');
  }
}

function sendSceneToRenderer() {
  if (!selectedSceneFile.value) return;

  // Construct Bridge URL for the scene file
  const filename = selectedSceneFile.value.replace(/^scenes\//, '');
  const baseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
  const url = `${baseUrl}/api/files/scenes/${filename}`;

  if (rendererMode.value === 'gsplat') {
    sendToGsplatIframe({
      type: 'load_scene',
      url,
    });
  }
  // Three.js mode uses MCP WebSocket — triggered by "Render Scene" button
}

function captureRendererFrame() {
  if (rendererMode.value === 'gsplat') {
    const iframe = gsplatIframe.value;
    if (iframe?.contentWindow) {
      console.log('[RenderStudio] Sending render_request to gsplat iframe');
      iframe.contentWindow.postMessage({ type: 'render_request' }, '*');
    } else {
      console.error('[RenderStudio] gsplatIframe or contentWindow is null', iframe);
    }
  }
}

// Listen for messages from gsplat iframe
function handleIframeMessage(event: MessageEvent) {
  const msg = event.data;
  if (!msg || !msg.type) return;

  console.log('[RenderStudio] iframe message:', msg.type, msg.image ? 'image len=' + msg.image.length : '');

  switch (msg.type) {
    case 'renderer_ready':
      if (msg.engine === 'gsplat') {
        gsplatReady.value = true;
        rendererReady.value = true;
        console.log('[RenderStudio] gsplat renderer ready');
      }
      break;

    case 'render_result':
      if (msg.image) {
        // Force reactivity: set value and increment key to trigger re-render
        capturedFrame.value = msg.image;
        captureKey.value++;
        nextTick(() => {
          console.log('[RenderStudio] capturedFrame set, length:', capturedFrame.value?.length, 'key:', captureKey.value);
        });
      } else {
        console.warn('[RenderStudio] render_result received but no image data');
      }
      break;

    case 'render_error':
      console.error('[RenderStudio] render error from iframe:', msg.error);
      break;

    case 'scene_loaded':
      console.log('[RenderStudio] scene loaded in gsplat:', msg.source);
      break;
  }
}

// ---- Scene file management ----
const selectedSceneFile = ref('');
const sceneFiles = ref<any[]>([]);
const loadingScenes = ref(false);

// ---- Render form ----
const sceneDesc = ref('');
const camPos = reactive({ x: 0, y: 1.5, z: 4 });
const camTarget = reactive({ x: 0, y: 0.8, z: 0 });
const fov = ref(50);
const quality = ref('preview');
const rendering = ref(false);
const renderResult = ref<any>(null);
const renderError = ref('');
const previewFailed = ref(false);

// ---- Batch render ----
const batchProjectId = ref('');
const batchStoryboardIds = ref('');
const batchRendering = ref(false);
const batchResult = ref<any>(null);
const batchError = ref('');

async function renderDirect() {
  rendering.value = true;
  renderResult.value = null;
  renderError.value = '';
  previewFailed.value = false;
  capturedFrame.value = null;
  try {
    const result = await api.renderDirect({
      sceneDescription: sceneDesc.value,
      sceneFile: selectedSceneFile.value || undefined,
      cameraSpec: {
        position: { ...camPos },
        target: { ...camTarget },
        fov: fov.value,
      },
      renderConfig: { quality: quality.value },
    });
    if (result.error) {
      renderError.value = result.error;
      renderResult.value = null;
    } else {
      renderResult.value = result;
      // Sync auto-adjusted camera back to UI
      if (result.usedCameraSpec) {
        const { position, target, fov: usedFov } = result.usedCameraSpec;
        camPos.x = parseFloat(position.x.toFixed(1));
        camPos.y = parseFloat(position.y.toFixed(1));
        camPos.z = parseFloat(position.z.toFixed(1));
        camTarget.x = parseFloat(target.x.toFixed(1));
        camTarget.y = parseFloat(target.y.toFixed(1));
        camTarget.z = parseFloat(target.z.toFixed(1));
        if (usedFov) fov.value = usedFov;
      }
    }
  } catch (err: any) {
    renderError.value = err?.response?.data?.error || err.message || 'Unknown error';
  } finally {
    rendering.value = false;
  }
}

async function renderBatch() {
  if (!batchProjectId.value) return;
  batchRendering.value = true;
  batchResult.value = null;
  batchError.value = '';
  try {
    const ids = batchStoryboardIds.value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const result = await api.renderBatch({
      projectId: batchProjectId.value,
      storyboardIds: ids,
    });
    batchResult.value = result.batch;
  } catch (err: any) {
    batchError.value = err?.response?.data?.error || err.message || 'Unknown error';
  } finally {
    batchRendering.value = false;
  }
}

async function loadSceneFiles() {
  loadingScenes.value = true;
  try {
    const res = await api.listSceneFiles();
    sceneFiles.value = res.scenes || [];
  } catch {
    sceneFiles.value = [];
  } finally {
    loadingScenes.value = false;
  }
}

onMounted(() => {
  loadSceneFiles();
  window.addEventListener('message', handleIframeMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleIframeMessage);
});
</script>

<style scoped>
.render-studio { max-width: 800px; margin: 0 auto; }
h1 { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 24px; }

.panel {
  background: #12121a;
  border: 1px solid #2a2a3a;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

h2 { font-size: 17px; font-weight: 600; color: #ddd; margin-bottom: 6px; }
.panel-desc { font-size: 13px; color: #666; margin-bottom: 0; }

/* Renderer toggle */
.renderer-toggle {
  display: flex;
  gap: 0;
  border: 1px solid #2a2a3a;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.toggle-btn {
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  background: #1a1a2a;
  color: #888;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.toggle-btn:hover {
  background: #222240;
  color: #aaa;
}

.toggle-btn.active {
  background: #7c6aff;
  color: #fff;
}

.toggle-btn:first-child {
  border-right: 1px solid #2a2a3a;
}

/* Renderer controls row */
.renderer-controls {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.form-group { margin-bottom: 14px; }
.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #888;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.form-group textarea,
.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  background: #0a0a0f;
  border: 1px solid #2a2a3a;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
}
.form-group textarea:focus,
.form-group input:focus,
.form-group select:focus { border-color: #7c6aff; }

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 4px;
}
.form-row .form-group { flex: 1; }

.coord-inputs {
  display: flex;
  gap: 8px;
}
.coord-inputs input {
  width: 80px !important;
  flex: none;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-primary {
  background: #7c6aff;
  color: #fff;
}
.btn-primary:hover { background: #6b5ae0; }
.btn:disabled { opacity: 0.4; cursor: default; }

.btn-accent {
  background: #4ecdc4;
  color: #111;
}
.btn-accent:hover:not(:disabled) { background: #3dbdb5; }

.btn-spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Error */
.result-error {
  margin-top: 16px;
  padding: 12px 16px;
  background: #2e0f0f;
  border: 1px solid #5c2020;
  border-radius: 8px;
  font-size: 13px;
  color: #f87171;
  display: flex;
  align-items: center;
  gap: 8px;
}
.error-icon { font-size: 18px; }

/* Result */
.render-result {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #2a2a3a;
}
.render-result h3 { font-size: 14px; color: #ccc; margin-bottom: 12px; }

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.result-field { display: flex; flex-direction: column; gap: 4px; }
.result-label { font-size: 11px; color: #666; text-transform: uppercase; font-weight: 600; }
.result-value { font-size: 14px; color: #ccc; }
.result-value.mono { font-family: monospace; font-size: 13px; }
.result-link { font-size: 13px; color: #7c6aff; text-decoration: none; word-break: break-all; }
.result-link:hover { text-decoration: underline; }

.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}
.badge-green { background: #0f2e1f; color: #4ade80; }
.badge-blue { background: #0f1e2e; color: #60a5fa; }

.result-preview {
  margin-top: 12px;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
  position: relative;
}
.result-preview img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
}
.preview-fallback {
  padding: 40px;
  text-align: center;
  color: #666;
  font-size: 13px;
}

/* Scene file selector */
.scene-file-row {
  display: flex;
  gap: 8px;
  align-items: center;
}
.scene-select {
  flex: 1;
  padding: 8px 12px;
  background: #0a0a0f;
  border: 1px solid #2a2a3a;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
}
.scene-select:focus { border-color: #7c6aff; }

.btn-sm {
  padding: 6px 14px;
  font-size: 12px;
  border-radius: 6px;
  background: #1e1e2e;
  color: #ccc;
  border: 1px solid #2a2a3a;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}
.btn-sm:hover:not(:disabled) { background: #2a2a3a; border-color: #7c6aff; }
.btn-sm:disabled { opacity: 0.4; cursor: default; }

.btn-spinner-sm {
  display: inline-block;
  width: 10px; height: 10px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  vertical-align: middle;
}

.hint {
  font-size: 12px;
  color: #555;
  margin-top: 6px;
}
.hint code {
  background: #1a1a2a;
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 11px;
  color: #7c6aff;
}

/* Renderer iframe */
.renderer-iframe-wrap {
  width: 100%;
  aspect-ratio: 16/9;
  border: 1px solid #2a2a3a;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
  position: relative;
}
.renderer-iframe {
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
}

/* Ready indicator dot */
.ready-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ade80;
  margin-left: 6px;
  vertical-align: middle;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
