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

    <!-- 配置面板切换按钮 -->
    <div class="config-toggle" v-if="!currentTask">
      <button class="toggle-btn" @click="showConfig = !showConfig">
        {{ showConfig ? '收起配置' : '模型配置' }}
      </button>
      <span class="config-hint" v-if="!config?.llm?.apiKeySet && !showConfig">
        ⚠ 未配置 LLM API Key，点击配置
      </span>
    </div>

    <!-- 配置面板 -->
    <div class="config-section" v-if="showConfig && !currentTask">
      <h3>模型配置</h3>

      <!-- LLM -->
      <div class="config-group">
        <div class="config-group-header">
          <span class="config-icon">🧠</span>
          <span>LLM 大语言模型</span>
          <span class="config-status" :class="config?.llm?.apiKeySet ? 'ok' : 'warn'">
            {{ config?.llm?.apiKeySet ? '已配置' : '未配置' }}
          </span>
        </div>
        <div class="config-body">
          <div class="config-row">
            <label>供应商</label>
            <select v-model="llmProvider" @change="onLlmProviderChange" class="select-input">
              <option value="deepseek">DeepSeek（推荐，最便宜）</option>
              <option value="openai">OpenAI (GPT-4o)</option>
              <option value="qwen">阿里通义千问</option>
              <option value="kimi">Moonshot (Kimi)</option>
              <option value="glm">智谱 GLM</option>
              <option value="ollama">本地 Ollama</option>
              <option value="oneapi">OneAPI 中转</option>
            </select>
          </div>
          <div class="config-row">
            <label>API 密钥</label>
            <input v-model="configForm.llm.apiKey" type="password" placeholder="sk-..."
              :class="['text-input', config?.llm?.apiKeySet ? 'has-value' : '']" />
            <span class="input-hint" v-if="config?.llm?.apiKeySet">已设置（如需修改请重新输入）</span>
          </div>
          <div class="config-row">
            <label>接口地址</label>
            <input v-model="configForm.llm.baseUrl" class="text-input" placeholder="https://api.deepseek.com/v1" />
          </div>
          <div class="config-row">
            <label>模型</label>
            <input v-model="configForm.llm.model" class="text-input" placeholder="deepseek-chat" />
          </div>
          <div class="config-provider-hint" v-if="llmProvider === 'deepseek'">
            注册地址：platform.deepseek.com，注册即送免费额度
          </div>
          <div class="config-provider-hint" v-else-if="llmProvider === 'openai'">
            注册地址：platform.openai.com
          </div>
          <div class="config-provider-hint" v-else-if="llmProvider === 'ollama'">
            安装 Ollama 后执行：ollama pull qwen2.5:14b
          </div>
        </div>
      </div>

      <!-- TTS -->
      <div class="config-group">
        <div class="config-group-header">
          <span class="config-icon">🔊</span>
          <span>TTS 语音合成</span>
        </div>
        <div class="config-body">
          <div class="config-row">
            <label>供应商</label>
            <select v-model="configForm.tts.provider" class="select-input">
              <option value="edge">EdgeTTS（免费，无需Key）</option>
              <option value="cosyvoice">CosyVoice2（本地部署，声音克隆）</option>
              <option value="openai">OpenAI 语音</option>
              <option value="aliyun">阿里云语音合成</option>
            </select>
          </div>
          <div class="config-row" v-if="configForm.tts.provider === 'cosyvoice'">
            <label>CosyVoice 地址</label>
            <input v-model="configForm.tts.cosyvoiceUrl" class="text-input" placeholder="http://localhost:5000" />
          </div>
        </div>
      </div>

      <!-- ASR -->
      <div class="config-group">
        <div class="config-group-header">
          <span class="config-icon">📝</span>
          <span>ASR 语音识别（字幕对齐）</span>
        </div>
        <div class="config-body">
          <div class="config-row">
            <label>供应商</label>
            <select v-model="configForm.asr.provider" class="select-input">
              <option value="skip">跳过（用LLM估算时间轴）</option>
              <option value="whisper-local">本地 Whisper（免费，需安装）</option>
              <option value="aliyun">阿里云语音识别</option>
              <option value="tencent">腾讯云语音识别</option>
            </select>
          </div>
          <div class="config-row" v-if="configForm.asr.provider === 'whisper-local'">
            <label>Whisper 模型</label>
            <select v-model="configForm.asr.whisperModel" class="select-input">
              <option value="tiny">tiny（最快，精度低）</option>
              <option value="base">base（推荐平衡）</option>
              <option value="small">small（较快，精度中）</option>
              <option value="medium">medium（均衡）</option>
              <option value="large">large（最精确，需GPU）</option>
            </select>
          </div>
          <div class="config-provider-hint" v-if="configForm.asr.provider === 'whisper-local'">
            安装：pip install openai-whisper
          </div>
        </div>
      </div>

      <!-- 视频生成 -->
      <div class="config-group">
        <div class="config-group-header">
          <span class="config-icon">🎬</span>
          <span>视频生成</span>
        </div>
        <div class="config-body">
          <div class="config-row">
            <label>供应商</label>
            <select v-model="configForm.videoGen.provider" class="select-input">
              <option value="skip">跳过（用Ken Burns效果，免费）</option>
              <option value="seedance">Seedance API（字节，推荐）</option>
              <option value="kling">Kling API（快手可灵）</option>
              <option value="wan-local">本地 Wan2.1（需GPU+ComfyUI）</option>
            </select>
          </div>
          <div class="config-row" v-if="configForm.videoGen.provider === 'seedance'">
            <label>Seedance 密钥</label>
            <input v-model="configForm.videoGen.seedanceApiKey" type="password" placeholder="sk-..."
              :class="['text-input', config?.videoGen?.seedanceKeySet ? 'has-value' : '']" />
          </div>
        </div>
      </div>

      <!-- MoneyPrinterTurbo -->
      <div class="config-group">
        <div class="config-group-header">
          <span class="config-icon">🚀</span>
          <span>MoneyPrinterTurbo 集成</span>
          <span class="config-status" :class="mptConnected ? 'ok' : 'warn'">
            {{ mptConnected ? '已连接' : (mptChecking ? '检测中...' : '未连接') }}
          </span>
        </div>
        <div class="config-body">
          <div class="config-row">
            <label>启用集成</label>
            <input type="checkbox" v-model="configForm.mpt.enabled" />
            <span class="input-hint" v-if="config?.mpt?.configured && configForm.mpt.enabled">
              已写入 .env（重启服务生效）
            </span>
          </div>
          <div class="config-row">
            <label>服务地址</label>
            <input v-model="configForm.mpt.apiUrl" class="text-input"
              placeholder="http://localhost:8501" @blur="checkMptHealth" />
          </div>
          <div class="config-row">
            <label>素材来源</label>
            <select v-model="configForm.mpt.materialSource" class="select-input">
              <option value="pexels">Pexels（免费素材库）</option>
              <option value="pixabay">Pixabay（免费素材库）</option>
              <option value="coverr">Coverr（免费素材库）</option>
              <option value="local">本地素材目录</option>
            </select>
          </div>
          <div class="config-row">
            <label>默认音色</label>
            <input v-model="configForm.mpt.defaultVoice" class="text-input"
              placeholder="zh-CN-XiaoxiaoNeural" />
          </div>
          <div class="config-provider-hint">
            MoneyPrinterTurbo 是免费开源 AI 短视频生成工具。集成后作为 Studio 的<span style="color:#7c6aff">最终视频降级</span>与<span style="color:#7c6aff">跨平台发布</span>方案。
            启动方式：<span style="color:#888">docker compose -f docker-compose.mpt.yml up -d</span>
          </div>
        </div>
      </div>

      <!-- 保存按钮 -->
      <div class="config-actions">
        <button class="save-config-btn" @click="saveConfig" :disabled="savingConfig">
          {{ savingConfig ? '保存中...' : '保存配置' }}
        </button>
        <span class="save-hint" v-if="configSaved">✓ 已保存，需重启服务生效</span>
        <span class="save-hint error" v-if="configError">{{ configError }}</span>
      </div>
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
        <span class="char-count" :class="{ 'over-limit': form.text.length > 20000 }">{{ form.text.length }} / 20000</span>
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

      <!-- MPT 任务级选项 -->
      <div class="mpt-task-options" v-if="config?.mpt?.configured">
        <div class="mpt-task-header">
          <span>🚀 MoneyPrinterTurbo 兜底</span>
          <span class="mpt-task-desc">视频/配音失败时自动降级，完成后可选发布</span>
        </div>
        <div class="mpt-task-inline">
          <label class="mpt-check">
            <input type="checkbox" v-model="form.enableMptFallback" />
            视频兜底（MPT 在线素材生成完整视频）
          </label>
          <label class="mpt-check">
            <input type="checkbox" v-model="form.enableMptTTS" />
            配音兜底（MPT TTS）
          </label>
        </div>
        <div class="form-row" v-if="form.enableMptTTS">
          <label>MPT 音色</label>
          <input v-model="form.mptVoiceName" class="text-input"
            placeholder="zh-CN-XiaoxiaoNeural（默认）" />
        </div>
        <div class="mpt-publish-row" v-if="form.enableMptFallback">
          <label class="mpt-publish-label">发布到</label>
          <label class="mpt-check">
            <input type="checkbox" v-model="form.publishTikTok" />
            TikTok
          </label>
          <label class="mpt-check">
            <input type="checkbox" v-model="form.publishYouTube" />
            YouTube
          </label>
          <label class="mpt-check">
            <input type="checkbox" v-model="form.publishInstagram" />
            Instagram
          </label>
        </div>
      </div>

      <button class="generate-btn" @click="startPipeline" :disabled="!canSubmit"
        :title="!canSubmit ? (form.text.length < 10 ? '至少输入10个字' : '提交中...') : ''">
        {{ submitting ? '提交中...' : '一键生成视频' }}
      </button>
      <p v-if="submitError" class="submit-error">{{ submitError }}</p>
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
          <span>{{ currentTask.output.scenes?.length || 0 }} 个分镜</span>
          <span>{{ currentTask.output.characters?.length || 0 }} 个角色</span>
          <span v-if="currentTask.output.durationSec">{{ currentTask.output.durationSec }}秒</span>
          <span v-if="currentTask.output.mptFallbackUsed" class="mpt-badge">🚀 MoneyPrinterTurbo 生成</span>
        </div>
        <div class="publish-results" v-if="currentTask.output.publishResults?.length">
          <span v-for="pr in currentTask.output.publishResults" :key="pr.platform"
            class="publish-item" :class="pr.success ? 'ok' : 'fail'">
            {{ pr.platform }}: {{ pr.success ? '已发布 ✓' : '失败 ✗' }}
          </span>
        </div>
        <video v-if="currentTask.output.finalVideoUrl"
          :src="currentTask.output.finalVideoUrl" controls
          @error="videoError = '视频加载失败'"
          class="result-video"></video>
        <p v-if="videoError" class="error-msg">{{ videoError }}</p>
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
        <span>{{ t.progress || 0 }}%</span>
        <span class="task-time">{{ formatTime(t.createdAt) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  getPipelineHealth,
  getPipelineStyles,
  getPipelineConfig,
  savePipelineConfig,
  createPipelineTask,
  getPipelineTask,
  listPipelineTasks,
  getMptHealth,
  type PipelineTaskInfo,
  type StylePresetInfo,
  type PipelineConfig,
  type PipelineConfigSave,
} from '../composables/useApi';

const form = ref({
  title: '',
  text: '',
  style: '写实',
  videoRatio: '16:9',
  voiceMode: 'narration+dialogue',
  enableTTS: true,
  enableVideoGen: true,
  // MPT 任务级选项
  enableMptFallback: false,
  enableMptTTS: false,
  mptVoiceName: '',
  publishTikTok: false,
  publishYouTube: false,
  publishInstagram: false,
});

const health = ref<any>(null);
const styles = ref<StylePresetInfo[]>([]);
const currentTask = ref<PipelineTaskInfo | null>(null);
const tasks = ref<PipelineTaskInfo[]>([]);
const submitting = ref(false);

// 配置面板状态
const showConfig = ref(false);
const config = ref<PipelineConfig | null>(null);
const configForm = ref({
  llm: { apiKey: '', baseUrl: 'https://api.deepseek.com/v1', model: 'deepseek-chat' },
  tts: { provider: 'edge', cosyvoiceUrl: 'http://localhost:5000' },
  asr: { provider: 'skip', whisperModel: 'base', whisperDevice: 'cpu' },
  videoGen: { provider: 'skip', seedanceApiKey: '', seedanceBaseUrl: 'https://api.seedance.ai/v1' },
  mpt: { enabled: false, apiUrl: '', materialSource: 'pexels', defaultVoice: 'zh-CN-XiaoxiaoNeural' },
});
const llmProvider = ref('deepseek');
const savingConfig = ref(false);
const configSaved = ref(false);
const configError = ref('');
const videoError = ref('');
const submitError = ref('');
const mptChecking = ref(false);
const mptConnected = ref(false);

let pollTimer: ReturnType<typeof setInterval> | null = null;
let pollRetryCount = 0;
let configLoadedOnce = false;

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
  submitError.value = '';
  try {
    // 收集 MPT 发布平台（仅当启用视频兜底且勾选平台时提交）
    const publishPlatforms: Array<{ name: string; title: string; isShort: boolean }> = [];
    if (form.value.enableMptFallback) {
      const title = form.value.title || 'Studio 自动生成';
      if (form.value.publishTikTok) publishPlatforms.push({ name: 'tiktok', title, isShort: form.value.videoRatio === '9:16' });
      if (form.value.publishYouTube) publishPlatforms.push({ name: 'youtube', title, isShort: form.value.videoRatio === '9:16' });
      if (form.value.publishInstagram) publishPlatforms.push({ name: 'instagram', title, isShort: form.value.videoRatio === '9:16' });
    }
    const res = await createPipelineTask({
      text: form.value.text,
      title: form.value.title,
      style: form.value.style,
      videoRatio: form.value.videoRatio,
      voiceMode: form.value.voiceMode,
      enableTTS: form.value.enableTTS,
      enableVideoGen: form.value.enableVideoGen,
      enableMptFallback: form.value.enableMptFallback,
      enableMptTTS: form.value.enableMptTTS,
      mptVoiceName: form.value.mptVoiceName || undefined,
      publishPlatforms: publishPlatforms.length > 0 ? publishPlatforms : undefined,
    });
    currentTask.value = res.task;
    startPolling(res.task.id);
  } catch (err: any) {
    submitError.value = err.response?.data?.error || err.message || '提交失败';
  } finally {
    submitting.value = false;
  }
}

function startPolling(taskId: string) {
  if (pollTimer) clearInterval(pollTimer);
  let polling = false; // P1修复：防重叠
  pollTimer = setInterval(async () => {
    if (polling) return; // 上一次还没返回，跳过本次
    polling = true;
    try {
      const res = await getPipelineTask(taskId);
      currentTask.value = res.task;
      if (res.task.status === 'completed' || res.task.status === 'failed') {
        stopPolling();
      }
    } catch (err) {
      // P1修复：单次抖动不停止轮询，最多重试3次
      pollRetryCount++;
      if (pollRetryCount > 3) {
        stopPolling();
      }
    } finally {
      polling = false;
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
  pollRetryCount = 0;
  if (t.status === 'running' || t.status === 'pending') {
    startPolling(t.id);
  }
}

// 格式化时间
function formatTime(iso: string): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  } catch { return iso; }
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

// ============================================================
// 配置面板
// ============================================================

const LLM_PRESETS: Record<string, { baseUrl: string; model: string }> = {
  deepseek: { baseUrl: 'https://api.deepseek.com/v1', model: 'deepseek-chat' },
  openai: { baseUrl: 'https://api.openai.com/v1', model: 'gpt-4o' },
  qwen: { baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1', model: 'qwen-plus' },
  kimi: { baseUrl: 'https://api.moonshot.cn/v1', model: 'moonshot-v1-8k' },
  glm: { baseUrl: 'https://open.bigmodel.cn/api/paas/v4', model: 'glm-4-flash' },
  ollama: { baseUrl: 'http://localhost:11434/v1', model: 'qwen2.5:14b' },
  oneapi: { baseUrl: 'http://localhost:3000/v1', model: 'deepseek-chat' },
};

function onLlmProviderChange() {
  const preset = LLM_PRESETS[llmProvider.value];
  if (preset) {
    configForm.value.llm.baseUrl = preset.baseUrl;
    configForm.value.llm.model = preset.model;
  }
}

async function loadConfig() {
  try {
    const res = await getPipelineConfig();
    config.value = res;
    // 填充表单（Key 不回显，只填其他字段）
    configForm.value.llm.baseUrl = res.llm.baseUrl;
    configForm.value.llm.model = res.llm.model;
    configForm.value.llm.apiKey = '';
    configForm.value.tts.provider = res.tts.provider;
    configForm.value.tts.cosyvoiceUrl = res.tts.cosyvoiceUrl;
    configForm.value.asr.provider = res.asr.provider;
    configForm.value.asr.whisperModel = res.asr.whisperModel;
    configForm.value.asr.whisperDevice = res.asr.whisperDevice;
    configForm.value.videoGen.provider = res.videoGen.provider;
    configForm.value.videoGen.seedanceApiKey = '';
    configForm.value.videoGen.seedanceBaseUrl = res.videoGen.seedanceBaseUrl;
    // MPT 配置填充
    if (res.mpt) {
      configForm.value.mpt.enabled = res.mpt.enabled;
      configForm.value.mpt.apiUrl = res.mpt.apiUrl;
      configForm.value.mpt.materialSource = res.mpt.materialSource;
      configForm.value.mpt.defaultVoice = res.mpt.defaultVoice;
    }
    checkMptHealth();

    // P1修复：只在首次加载时自动展开配置面板，不反复打扰用户
    if (!res.llm.apiKeySet && !configLoadedOnce) {
      showConfig.value = true;
    }
    configLoadedOnce = true;
    // 推断当前供应商
    for (const [key, preset] of Object.entries(LLM_PRESETS)) {
      if (res.llm.baseUrl === preset.baseUrl) {
        llmProvider.value = key;
        break;
      }
    }
  } catch { /* ignore */ }
}

async function checkMptHealth() {
  mptChecking.value = true;
  try {
    const health = await getMptHealth();
    mptConnected.value = health.available === true;
  } catch {
    mptConnected.value = false;
  } finally {
    mptChecking.value = false;
  }
}

async function saveConfig() {
  savingConfig.value = true;
  configError.value = '';
  configSaved.value = false;
  try {
    const res = await savePipelineConfig({
      llm: {
        apiKey: configForm.value.llm.apiKey || undefined,
        baseUrl: configForm.value.llm.baseUrl,
        model: configForm.value.llm.model,
      },
      tts: {
        provider: configForm.value.tts.provider,
        cosyvoiceUrl: configForm.value.tts.cosyvoiceUrl,
        cosyvoiceApiKey: undefined,
      },
      asr: {
        provider: configForm.value.asr.provider,
        whisperModel: configForm.value.asr.whisperModel,
        whisperDevice: configForm.value.asr.whisperDevice,
      },
      videoGen: {
        provider: configForm.value.videoGen.provider,
        seedanceApiKey: configForm.value.videoGen.seedanceApiKey || undefined,
        seedanceBaseUrl: configForm.value.videoGen.seedanceBaseUrl,
      },
      mpt: {
        enabled: configForm.value.mpt.enabled,
        apiUrl: configForm.value.mpt.apiUrl || undefined,
        materialSource: configForm.value.mpt.materialSource,
        defaultVoice: configForm.value.mpt.defaultVoice,
      },
    } as PipelineConfigSave);
    configSaved.value = true;
    // P2修复：并行刷新配置和健康检查
    await Promise.allSettled([loadConfig(), loadHealth()]);
  } catch (err: any) {
    configError.value = err.response?.data?.error || err.message;
  } finally {
    savingConfig.value = false;
  }
}

onMounted(() => {
  loadHealth();
  loadStyles();
  loadTasks();
  loadConfig();
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

/* --- 配置面板 --- */
.config-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.toggle-btn {
  padding: 8px 16px;
  background: #1e1e2e;
  border: 1px solid #3a3a4e;
  border-radius: 8px;
  color: #7c6aff;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}
.toggle-btn:hover { background: #2a2a3e; border-color: #7c6aff; }

.config-hint { font-size: 12px; color: #facc15; }

.config-section {
  background: #1a1a2e;
  border: 1px solid #2a2a3e;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.config-section h3 {
  font-size: 16px;
  color: #e0e0e0;
  margin: 0 0 16px 0;
}

.config-group {
  border: 1px solid #2a2a3e;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
}

.config-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #16162a;
  font-size: 14px;
  font-weight: 600;
  color: #ccc;
}

.config-icon { font-size: 16px; }

.config-status {
  margin-left: auto;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}
.config-status.ok { background: #0f2e1f; color: #4ade80; }
.config-status.warn { background: #2e2a0f; color: #facc15; }

.config-body {
  padding: 12px 14px;
}

.config-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.config-row label {
  width: 100px;
  font-size: 12px;
  color: #888;
  flex-shrink: 0;
}

.config-row .text-input,
.config-row .select-input {
  flex: 1;
  background: #16162a;
  border: 1px solid #2a2a3e;
  border-radius: 6px;
  padding: 8px 10px;
  color: #e0e0e0;
  font-size: 13px;
}

.text-input.has-value {
  border-color: #4ade80;
}

.input-hint {
  font-size: 11px;
  color: #4ade80;
  flex-shrink: 0;
}

.config-provider-hint {
  font-size: 11px;
  color: #666;
  margin: 4px 0 8px 110px;
}

.config-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}

.save-config-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.save-config-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.save-hint { font-size: 12px; color: #4ade80; }
.save-hint.error { color: #f87171; }

/* --- 原有样式 --- */
.pipeline-header { margin-bottom: 24px; }

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
.char-count.over-limit {
  color: #f87171;
  font-weight: 600;
}

.submit-error {
  color: #f87171;
  font-size: 13px;
  margin-top: 8px;
  text-align: center;
}

.task-time {
  color: #666;
  font-size: 12px;
  margin-left: auto;
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

/* --- MoneyPrinterTurbo 样式 --- */
.mpt-task-options {
  margin: 16px 0;
  padding: 12px 14px;
  background: #16162a;
  border: 1px solid #2a2a3e;
  border-left: 3px solid #8b5cf6;
  border-radius: 8px;
}

.mpt-task-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #e0e0e0;
  margin-bottom: 10px;
}

.mpt-task-desc {
  font-size: 11px;
  font-weight: 400;
  color: #888;
}

.mpt-task-inline {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.mpt-check {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #ccc;
  cursor: pointer;
  margin: 0;
}

.mpt-check input[type="checkbox"] {
  accent-color: #7c6aff;
  cursor: pointer;
}

.mpt-publish-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 8px;
  padding-top: 10px;
  border-top: 1px dashed #2a2a3e;
}

.mpt-publish-label {
  font-size: 12px;
  color: #888;
  margin: 0;
}

.mpt-badge {
  background: #2e1f3a;
  color: #a78bfa;
  border: 1px solid #4c3a6e;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.publish-results {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.publish-item {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 4px;
  border: 1px solid #2a2a3e;
}
.publish-item.ok { color: #4ade80; border-color: #1e3a2f; background: #0f2e1f; }
.publish-item.fail { color: #f87171; border-color: #3a1e1e; background: #2e0f0f; }
</style>
