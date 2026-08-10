<template>
  <div class="pipeline-view">
    <!-- 顶部标题 -->
    <div class="pipeline-header">
      <h2>文稿 → 视频管线</h2>
      <p class="subtitle">输入文稿，一键生成卡通短剧 / 数字人视频</p>
    </div>

    <!-- 健康状态 -->
    <div class="health-bar" v-if="health">
      <span class="health-item" v-for="(v, k) in health.services" :key="k"
        :class="{ ok: v.available !== false, warn: v.available === false }">
        {{ k }}: {{ typeof v === 'object' ? (v.available !== false ? '✓' : '✗') : v }}
      </span>
    </div>

    <!-- 输入区域 -->
    <div class="input-section" v-if="!currentTask">
      <div class="form-row">
        <label>标题</label>
        <input v-model="form.title" placeholder="给短剧起个名字..." class="text-input" />
      </div>

      <div class="form-row">
        <label>文稿内容</label>
        <textarea v-model="form.text" placeholder="粘贴小说、剧本或故事文稿..."
          class="textarea-input" rows="8"></textarea>
        <span class="char-count">{{ form.text.length }} / 20000</span>
      </div>

      <div class="form-row-inline">
        <div class="form-row">
          <label>画风</label>
          <select v-model="form.style" class="select-input">
            <option v-for="s in styles" :key="s.id" :value="s.artStyle">
              {{ s.label }} — {{ s.description }}
            </option>
          </select>
        </div>

        <div class="form-row">
          <label>画面比例</label>
          <select v-model="form.videoRatio" class="select-input">
            <option value="16:9">16:9 横屏</option>
            <option value="9:16">9:16 竖屏</option>
            <option value="1:1">1:1 方形</option>
          </select>
        </div>
      </div>

      <div class="form-row-inline">
        <div class="form-row toggle-row">
          <label>TTS配音</label>
          <input type="checkbox" v-model="form.enableTTS" />
        </div>
        <div class="form-row toggle-row">
          <label>视频驱动</label>
          <input type="checkbox" v-model="form.enableVideoGen" />
        </div>
      </div>

      <button class="generate-btn" @click="startPipeline" :disabled="!canSubmit">
        {{ submitting ? '提交中...' : '一键生成视频' }}
      </button>
    </div>

    <!-- 进度区域 -->
    <div class="progress-section" v-if="currentTask">
      <div class="task-header">
        <h3>{{ form.title || '短剧' }}</h3>
        <span class="status-badge" :class="currentTask.status">{{ statusLabel }}</span>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: currentTask.progress + '%' }"></div>
        <span class="progress-text">{{ currentTask.progress }}%</span>
      </div>

      <div class="steps-list">
        <div v-for="step in currentTask.steps" :key="step.name" class="step-item"
          :class="step.status">
          <span class="step-icon">
            {{ stepIcon(step.status) }}
          </span>
          <span class="step-label">{{ step.label }}</span>
          <span class="step-progress" v-if="step.status === 'running'">
            {{ step.progress }}%
          </span>
          <span class="step-error" v-if="step.error">{{ step.error }}</span>
        </div>
      </div>

      <!-- 结果区域 -->
      <div class="result-section" v-if="currentTask.status === 'completed' && currentTask.output">
        <h4>生成完成</h4>
        <div class="result-stats">
          <span>{{ currentTask.output.scenes.length }} 个分镜</span>
          <span>{{ currentTask.output.characters.length }} 个角色</span>
          <span v-if="currentTask.output.durationSec">{{ currentTask.output.durationSec }}秒</span>
        </div>
        <video v-if="currentTask.output.finalVideoUrl"
          :src="currentTask.output.finalVideoUrl" controls class="result-video"></video>
        <button class="reset-btn" @click="resetTask">再做一个</button>
      </div>

      <div class="error-section" v-if="currentTask.status === 'failed'">
        <p class="error-msg">{{ currentTask.error }}</p>
        <button class="reset-btn" @click="resetTask">重试</button>
      </div>
    </div>

    <!-- 历史任务 -->
    <div class="history-section" v-if="!currentTask && tasks.length > 0">
      <h4>历史任务</h4>
      <div class="task-card" v-for="t in tasks.slice(0, 5)" :key="t.id" @click="loadTask(t)">
        <span class="status-badge" :class="t.status">{{ t.status }}</span>
        <span>{{ t.progress }}%</span>
        <span>{{ t.createdAt }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  getPipelineHealth,
  getPipelineStyles,
  createPipelineTask,
  getPipelineTask,
  listPipelineTasks,
  type PipelineTaskInfo,
  type StylePresetInfo,
} from '../composables/useApi';

const form = ref({
  title: '',
  text: '',
  style: '写实',
  videoRatio: '16:9',
  voiceMode: 'narration+dialogue',
  enableTTS: true,
  enableVideoGen: true,
});

const health = ref<any>(null);
const styles = ref<StylePresetInfo[]>([]);
const currentTask = ref<PipelineTaskInfo | null>(null);
const tasks = ref<PipelineTaskInfo[]>([]);
const submitting = ref(false);
let pollTimer: ReturnType<typeof setInterval> | null = null;

const canSubmit = computed(() =>
  form.value.text.trim().length >= 10 && form.value.text.length <= 20000 && !submitting.value
);

const statusLabel = computed(() => {
  if (!currentTask.value) return '';
  const labels: Record<string, string> = {
    pending: '排队中', running: '处理中', completed: '已完成', failed: '失败', cancelled: '已取消',
  };
  return labels[currentTask.value.status] || currentTask.value.status;
});

function stepIcon(status: string): string {
  const icons: Record<string, string> = {
    pending: '○', running: '◐', completed: '●', failed: '✗', skipped: '—',
  };
  return icons[status] || '○';
}

async function startPipeline() {
  submitting.value = true;
  try {
    const res = await createPipelineTask({
      text: form.value.text,
      title: form.value.title,
      style: form.value.style,
      videoRatio: form.value.videoRatio,
      voiceMode: form.value.voiceMode,
      enableTTS: form.value.enableTTS,
      enableVideoGen: form.value.enableVideoGen,
    });
    currentTask.value = res.task;
    startPolling(res.task.id);
  } catch (err: any) {
    alert(`提交失败: ${err.response?.data?.error || err.message}`);
  } finally {
    submitting.value = false;
  }
}

function startPolling(taskId: string) {
  if (pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(async () => {
    try {
      const res = await getPipelineTask(taskId);
      currentTask.value = res.task;
      if (res.task.status === 'completed' || res.task.status === 'failed') {
        stopPolling();
      }
    } catch (err) {
      console.error('Polling error:', err);
      stopPolling();
    }
  }, 2000);
}

function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}

function resetTask() {
  currentTask.value = null;
  stopPolling();
  loadTasks();
}

async function loadTask(t: PipelineTaskInfo) {
  currentTask.value = t;
  if (t.status === 'running' || t.status === 'pending') {
    startPolling(t.id);
  }
}

async function loadTasks() {
  try {
    const res = await listPipelineTasks();
    tasks.value = res.tasks;
  } catch { /* ignore */ }
}

async function loadHealth() {
  try {
    const res = await getPipelineHealth();
    health.value = res;
  } catch { /* ignore */ }
}

async function loadStyles() {
  try {
    const res = await getPipelineStyles();
    styles.value = res.styles;
  } catch { /* ignore */ }
}

onMounted(() => {
  loadHealth();
  loadStyles();
  loadTasks();
});

onUnmounted(() => {
  stopPolling();
});
</script>

<style scoped>
.pipeline-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

.pipeline-header {
  margin-bottom: 24px;
}

.pipeline-header h2 {
  font-size: 24px;
  margin: 0 0 8px 0;
  color: #e0e0e0;
}

.subtitle {
  color: #888;
  font-size: 14px;
  margin: 0;
}

.health-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  font-size: 12px;
}

.health-item {
  padding: 4px 10px;
  border-radius: 4px;
  background: #1e1e2e;
}

.health-item.ok { color: #4ade80; }
.health-item.warn { color: #f87171; }

.input-section {
  background: #1a1a2e;
  border-radius: 12px;
  padding: 24px;
}

.form-row {
  margin-bottom: 16px;
}

.form-row label {
  display: block;
  font-size: 13px;
  color: #aaa;
  margin-bottom: 6px;
}

.form-row-inline {
  display: flex;
  gap: 16px;
}

.form-row-inline .form-row {
  flex: 1;
}

.text-input,
.textarea-input,
.select-input {
  width: 100%;
  background: #16162a;
  border: 1px solid #2a2a3e;
  border-radius: 8px;
  padding: 10px 12px;
  color: #e0e0e0;
  font-size: 14px;
  box-sizing: border-box;
}

.textarea-input {
  resize: vertical;
  font-family: inherit;
  line-height: 1.6;
}

.text-input:focus,
.textarea-input:focus,
.select-input:focus {
  outline: none;
  border-color: #6366f1;
}

.char-count {
  font-size: 11px;
  color: #666;
  text-align: right;
  display: block;
  margin-top: 4px;
}

.toggle-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle-row label {
  margin: 0;
}

.generate-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.generate-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.generate-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.progress-section {
  background: #1a1a2e;
  border-radius: 12px;
  padding: 24px;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.task-header h3 {
  margin: 0;
  font-size: 18px;
  color: #e0e0e0;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.running { background: #1e3a5f; color: #60a5fa; }
.status-badge.completed { background: #1e3a2f; color: #4ade80; }
.status-badge.failed { background: #3a1e1e; color: #f87171; }
.status-badge.pending { background: #2a2a3e; color: #888; }

.progress-bar-container {
  position: relative;
  height: 24px;
  background: #16162a;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  transition: width 0.5s ease;
}

.progress-text {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 24px;
  font-size: 12px;
  color: white;
  font-weight: 600;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  background: #16162a;
}

.step-item.running { border-left: 3px solid #60a5fa; }
.step-item.completed { border-left: 3px solid #4ade80; }
.step-item.failed { border-left: 3px solid #f87171; }
.step-item.skipped { border-left: 3px solid #555; opacity: 0.5; }

.step-icon {
  font-size: 14px;
  width: 20px;
}

.step-item.completed .step-icon { color: #4ade80; }
.step-item.running .step-icon { color: #60a5fa; animation: spin 1s linear infinite; }
.step-item.failed .step-icon { color: #f87171; }

.step-label {
  color: #ccc;
  flex: 1;
}

.step-progress {
  color: #60a5fa;
  font-size: 12px;
}

.step-error {
  color: #f87171;
  font-size: 11px;
}

.result-section {
  margin-top: 24px;
  text-align: center;
}

.result-section h4 {
  color: #4ade80;
  font-size: 18px;
  margin-bottom: 12px;
}

.result-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 13px;
  color: #aaa;
  margin-bottom: 16px;
}

.result-video {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
}

.reset-btn {
  padding: 10px 24px;
  background: #2a2a3e;
  color: #e0e0e0;
  border: 1px solid #3a3a4e;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.reset-btn:hover {
  background: #3a3a4e;
}

.error-section {
  margin-top: 20px;
  text-align: center;
}

.error-msg {
  color: #f87171;
  font-size: 14px;
  margin-bottom: 12px;
}

.history-section {
  margin-top: 24px;
}

.history-section h4 {
  color: #aaa;
  font-size: 14px;
  margin-bottom: 12px;
}

.task-card {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 16px;
  background: #1a1a2e;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #ccc;
}

.task-card:hover {
  background: #22223a;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
