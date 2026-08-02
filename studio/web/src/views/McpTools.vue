<template>
  <div class="mcp-tools">
    <h1>{{ t('mcp.title') }}</h1>
    <p class="subtitle">{{ t('mcp.subtitle') }}</p>

    <div class="toolbar">
      <button @click="loadTools" class="btn" :disabled="loadingTools">
        <span v-if="loadingTools" class="btn-spinner"></span>
        {{ tools.length > 0 ? t('mcp.refreshTools') : t('mcp.loadTools') }}
      </button>
      <button @click="connectMcp" class="btn" :disabled="mcpConnected">
        {{ mcpConnected ? t('mcp.connected') : t('mcp.connectMcp') }}
      </button>
      <span v-if="mcpConnected" class="tool-count">{{ tools.length }} {{ t('mcp.toolsLoaded') }}</span>
    </div>

    <div v-if="tools.length === 0 && !loadingTools" class="empty-state">
      <p>{{ t('mcp.clickToLoad') }}</p>
    </div>

    <div v-else class="tool-grid">
      <div
        v-for="tool in tools"
        :key="tool.name"
        class="tool-card"
        :class="{ selected: selectedTool?.name === tool.name }"
        @click="selectTool(tool)"
      >
        <div class="tool-name">{{ tool.name }}</div>
        <div class="tool-desc">{{ (tool.description || '').slice(0, 60) }}{{ (tool.description || '').length > 60 ? '...' : '' }}</div>
        <div class="tool-badge" :class="isImplemented(tool.name) ? 'impl' : 'stub'">
          {{ isImplemented(tool.name) ? t('mcp.implemented') : t('mcp.stub') }}
        </div>
      </div>
    </div>

    <!-- Tool Call Panel -->
    <div v-if="selectedTool" class="call-panel">
      <h2>{{ t('mcp.call') }}: {{ selectedTool.name }}</h2>
      <p class="call-desc">{{ selectedTool.description }}</p>

      <div class="form-group">
        <label>{{ t('mcp.arguments') }}</label>
        <textarea v-model="callArgs" rows="6" placeholder='{"key": "value"}' class="code-input"></textarea>
      </div>

      <div class="call-actions">
        <button @click="callTool" :disabled="calling" class="btn btn-primary">
          <span v-if="calling" class="btn-spinner"></span>
          {{ calling ? t('mcp.calling') : t('mcp.execute') }}
        </button>
      </div>

      <div v-if="callResult !== null" class="call-result">
        <div class="result-header">
          <h3>{{ t('mcp.result') }}</h3>
          <button @click="copyResult" class="btn btn-sm" :disabled="!callResultStr">
            {{ copied ? t('mcp.copied') : t('mcp.copy') }}
          </button>
        </div>
        <pre :class="{ 'result-error': callResultIsError }">{{ formatResult(callResult) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import * as api from '../composables/useApi';
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();

const IMPLEMENTED = new Set([
  'import_scene', 'set_camera', 'modify_gaussians', 'render_frame',
  'query_scene', 'cast_ray', 'prune_by_importance', 'export_result',
  'set_gaussian_density', 'adjust_opacity', 'set_rotation',
]);

const mcpConnected = ref(false);
const loadingTools = ref(false);
const tools = ref<any[]>([]);
const selectedTool = ref<any>(null);
const callArgs = ref('{}');
const calling = ref(false);
const callResult = ref<any>(null);
const copied = ref(false);

const callResultIsError = computed(() => callResult.value && callResult.value.error);
const callResultStr = computed(() => formatResult(callResult.value));

function isImplemented(name: string) {
  return IMPLEMENTED.has(name);
}

async function connectMcp() {
  try {
    await api.connectMcp();
    mcpConnected.value = true;
  } catch {
    mcpConnected.value = false;
  }
}

async function loadTools() {
  loadingTools.value = true;
  try {
    const res = await api.listMcpTools();
    tools.value = res.tools || [];
    // If MCP is truly connected, we should get tools; empty = MCP unavailable
    mcpConnected.value = tools.value.length > 0;
  } catch {
    mcpConnected.value = false;
    tools.value = [];
  } finally {
    loadingTools.value = false;
  }
}

function selectTool(tool: any) {
  selectedTool.value = tool;
  // Pre-fill args from schema
  const schema = tool.inputSchema;
  if (schema?.properties) {
    const args: Record<string, any> = {};
    for (const [key, prop] of Object.entries(schema.properties as Record<string, any>)) {
      if (prop.default !== undefined) args[key] = prop.default;
      else if (prop.type === 'number') args[key] = 0;
      else if (prop.type === 'boolean') args[key] = false;
      else args[key] = '';
    }
    callArgs.value = JSON.stringify(args, null, 2);
  } else {
    callArgs.value = '{}';
  }
  callResult.value = null;
  copied.value = false;
}

async function callTool() {
  if (!selectedTool.value) return;
  calling.value = true;
  callResult.value = null;
  copied.value = false;
  try {
    let args: Record<string, unknown>;
    try {
      args = JSON.parse(callArgs.value);
    } catch {
      callResult.value = { error: t('mcp.invalidJson') };
      return;
    }
    const result = await api.callMcpTool(selectedTool.value.name, args);
    callResult.value = result;
  } catch (err: any) {
    callResult.value = { error: err?.response?.data?.error || err.message || 'Unknown error' };
  } finally {
    calling.value = false;
  }
}

function formatResult(result: any): string {
  if (typeof result === 'string') return result;
  try {
    return JSON.stringify(result, null, 2);
  } catch {
    return String(result);
  }
}

async function copyResult() {
  try {
    await navigator.clipboard.writeText(callResultStr.value);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
  } catch { /* clipboard denied */ }
}

// Auto-connect and load tools on mount
onMounted(async () => {
  await connectMcp();
  await loadTools();
});
</script>

<style scoped>
.mcp-tools { max-width: 900px; margin: 0 auto; }
h1 { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 4px; }
.subtitle { color: #666; font-size: 13px; margin-bottom: 24px; }

.toolbar { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }

.tool-count {
  font-size: 12px;
  color: #666;
  margin-left: 4px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #2a2a3a;
  border-radius: 8px;
  background: #1e1e2e;
  color: #ccc;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}
.btn:hover { background: #2a2a3a; color: #fff; }
.btn:disabled { opacity: 0.4; }

.btn-primary { background: #7c6aff; color: #fff; border-color: #7c6aff; }
.btn-primary:hover { background: #6b5ae0; }

.btn-spinner {
  width: 12px; height: 12px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.empty-state { text-align: center; padding: 40px; color: #666; }

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 32px;
}

.tool-card {
  background: #12121a;
  border: 1px solid #2a2a3a;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: border-color 0.15s;
}
.tool-card:hover { border-color: #7c6aff; }
.tool-card.selected { border-color: #7c6aff; background: #1a1a2e; }

.tool-name { font-size: 14px; font-weight: 600; color: #ddd; margin-bottom: 4px; }
.tool-desc { font-size: 12px; color: #666; margin-bottom: 8px; line-height: 1.4; min-height: 32px; }

.tool-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
}
.tool-badge.impl { background: #0f2e1f; color: #4ade80; }
.tool-badge.stub { background: #2e2a0f; color: #facc15; }

.call-panel {
  background: #12121a;
  border: 1px solid #2a2a3a;
  border-radius: 12px;
  padding: 20px;
}

h2 { font-size: 17px; color: #ccc; margin-bottom: 4px; }
.call-desc { font-size: 13px; color: #666; margin-bottom: 16px; }

.form-group { margin-bottom: 14px; }
.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #888;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.code-input {
  width: 100%;
  padding: 10px;
  background: #0a0a0f;
  border: 1px solid #2a2a3a;
  border-radius: 8px;
  color: #e0e0e0;
  font-family: 'Cascadia Code', monospace;
  font-size: 13px;
  outline: none;
  resize: vertical;
}
.code-input:focus { border-color: #7c6aff; }

.call-actions { margin-bottom: 4px; }

.call-result {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #2a2a3a;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.result-header h3 { font-size: 13px; color: #888; margin: 0; }

.call-result pre {
  background: #0a0a0f;
  border: 1px solid #1e1e2e;
  border-radius: 8px;
  padding: 12px;
  font-size: 12px;
  color: #ccc;
  overflow: auto;
  max-height: 300px;
  white-space: pre-wrap;
  word-break: break-all;
}

.call-result pre.result-error {
  border-color: #5c2020;
  color: #f87171;
}

.btn-sm {
  padding: 4px 10px;
  font-size: 11px;
}
</style>
