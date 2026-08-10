<template>
  <div class="studio-layout">
    <!-- Top Nav -->
    <nav class="top-nav">
      <div class="nav-brand">
        <span class="brand-icon">&#9678;</span>
        <span class="brand-text">SplatVerse Studio</span>
        <span class="brand-ver">v0.2</span>
      </div>
      <div class="nav-links">
        <router-link to="/" exact-active-class="active">{{ t('nav.dashboard') }}</router-link>
        <router-link to="/pipeline" active-class="active">{{ t('nav.pipeline') }}</router-link>
        <router-link to="/render" active-class="active">{{ t('nav.render') }}</router-link>
        <router-link to="/projects" active-class="active">{{ t('nav.projects') }}</router-link>
        <router-link to="/mcp" active-class="active">{{ t('nav.mcpTools') }}</router-link>
      </div>
      <div class="nav-right">
        <button class="lang-toggle" @click="toggleLocale" :title="locale === 'zh' ? 'Switch to English' : '切换为中文'">
          {{ locale === 'zh' ? 'EN' : '中' }}
        </button>
        <div class="nav-status">
          <span class="status-dot" :class="mcpConnected ? 'connected' : 'disconnected'"></span>
          <span class="status-text">{{ mcpConnected ? t('nav.connected') : t('nav.offline') }}</span>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Toast Stack -->
    <div class="toast-stack">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="sse-toast"
        :class="[toast.type, toast.leaving ? 'toast-leave' : '']"
      >
        <span class="toast-msg">{{ toast.message }}</span>
        <button class="toast-close" @click="dismissToast(toast.id)">&times;</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useSSE } from './composables/useSSE';
import { useI18n } from './composables/useI18n';

const { locale, t, toggleLocale } = useI18n();

const mcpConnected = ref(false);
let statusPollTimer: ReturnType<typeof setInterval> | null = null;

const { latestEvent, connect } = useSSE();

async function checkMcpStatus() {
  try {
    const res = await fetch('/api/mcp/status');
    const data = await res.json();
    mcpConnected.value = data.connected;
  } catch {
    mcpConnected.value = false;
  }
}

// --- Toast system ---
interface Toast {
  id: number;
  type: string;
  message: string;
  leaving: boolean;
}

const toasts = ref<Toast[]>([]);
let toastSeq = 0;

function addToast(type: string, message: string, duration = 4000) {
  const id = ++toastSeq;
  toasts.value.push({ id, type, message, leaving: false });
  // Auto-dismiss after duration
  setTimeout(() => dismissToast(id), duration);
}

function dismissToast(id: number) {
  const target = toasts.value.find(item => item.id === id);
  if (!target) return;
  target.leaving = true;
  setTimeout(() => {
    toasts.value = toasts.value.filter(x => x.id !== id);
  }, 300);
}

// Watch SSE events and convert to toasts
let lastEventKey = '';
onMounted(async () => {
  connect();
  await checkMcpStatus();
  statusPollTimer = setInterval(checkMcpStatus, 5000);
});

onUnmounted(() => {
  if (statusPollTimer) {
    clearInterval(statusPollTimer);
    statusPollTimer = null;
  }
});

// React to latestEvent changes (watch-like)
watch(latestEvent, (evt) => {
  if (!evt) return;
  const key = `${evt.type}-${evt.timestamp}`;
  if (key === lastEventKey) return;
  lastEventKey = key;

  const data = evt.data || {};
  // P1修复：data 可能是对象，避免显示 [object Object]
  let message: string;
  if (typeof data === 'string') {
    message = data;
  } else if (data.status) {
    message = String(data.status);
  } else if (data.action) {
    message = String(data.action);
  } else if (data.source && data.stepName) {
    message = `${data.source}: ${data.stepName}`;
  } else if (data.source && data.message) {
    message = `${data.source}: ${data.message}`;
  } else {
    message = evt.type;
  }

  // Skip heartbeat and pure connect events
  if (evt.type === 'connected') return;
  if (message === 'heartbeat') return;

  addToast(evt.type, message.slice(0, 100));
});
</script>

<style>
.studio-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.top-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 20px;
  height: 48px;
  background: #12121a;
  border-bottom: 1px solid #2a2a3a;
  flex-shrink: 0;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-icon {
  font-size: 20px;
  color: #7c6aff;
}

.brand-text {
  font-weight: 700;
  font-size: 15px;
  color: #fff;
}

.brand-ver {
  font-size: 11px;
  color: #666;
  padding: 1px 6px;
  background: #1e1e2e;
  border-radius: 4px;
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-links a {
  color: #999;
  text-decoration: none;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.15s;
}

.nav-links a:hover {
  color: #ccc;
  background: #1e1e2e;
}

.nav-links a.active {
  color: #7c6aff;
  background: #1e1e2e;
}

.nav-status {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 16px;
}

.lang-toggle {
  padding: 3px 10px;
  border: 1px solid #2a2a3a;
  border-radius: 6px;
  background: #1e1e2e;
  color: #ccc;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  min-width: 36px;
  text-align: center;
}
.lang-toggle:hover {
  background: #2a2a3a;
  border-color: #7c6aff;
  color: #fff;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.connected { background: #4ade80; }
.status-dot.disconnected { background: #f87171; }

.status-text {
  font-size: 12px;
  color: #888;
}

.main-content {
  flex: 1;
  overflow: auto;
  padding: 20px;
}

/* --- Toast Stack --- */
.toast-stack {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
  z-index: 1000;
  max-width: 360px;
}

.sse-toast {
  padding: 10px 14px;
  background: #1e1e2e;
  border: 1px solid #2a2a3a;
  border-radius: 8px;
  font-size: 13px;
  color: #ccc;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: toastIn 0.25s ease-out;
}

.sse-toast.toast-leave {
  animation: toastOut 0.25s ease-in forwards;
}

.sse-toast.task_update { border-left: 3px solid #7c6aff; }
.sse-toast.batch_update { border-left: 3px solid #4ade80; }
.sse-toast.log { border-left: 3px solid #60a5fa; }
.sse-toast.error { border-left: 3px solid #f87171; }

.toast-msg { flex: 1; }

.toast-close {
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
}
.toast-close:hover { color: #fff; }

@keyframes toastIn {
  from { opacity: 0; transform: translateY(10px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes toastOut {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(6px) scale(0.95); }
}
</style>
