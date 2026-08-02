<template>
  <div class="dashboard">
    <h1>{{ t('dashboard.title') }}</h1>
    <p class="subtitle">{{ t('dashboard.subtitle') }}</p>

    <!-- Service Status Cards -->
    <div class="status-grid">
      <div class="status-card">
        <div class="card-header">
          <span class="card-icon">&#9678;</span>
          <span>{{ t('dashboard.mcpServer') }}</span>
        </div>
        <div class="card-body">
          <span class="badge" :class="mcpConnected ? 'badge-green' : 'badge-red'">
            {{ mcpConnected ? t('dashboard.connected') : t('dashboard.offline') }}
          </span>
          <p class="card-desc">{{ t('dashboard.mcpDesc') }}</p>
        </div>
        <div class="card-footer">
          <button @click="connectMcp" :disabled="mcpConnected" class="btn btn-sm">
            {{ mcpConnected ? t('dashboard.connected') : t('dashboard.connect') }}
          </button>
        </div>
      </div>

      <div class="status-card">
        <div class="card-header">
          <span class="card-icon">&#9654;</span>
          <span>{{ t('dashboard.bridgeServer') }}</span>
        </div>
        <div class="card-body">
          <span class="badge" :class="bridgeOk ? 'badge-green' : 'badge-red'">
            {{ bridgeOk ? t('dashboard.running') : t('dashboard.down') }}
          </span>
          <p class="card-desc">{{ t('dashboard.bridgeDesc') }}</p>
        </div>
        <div class="card-footer">
          <span class="card-stat">{{ t('dashboard.port') }} 10590</span>
        </div>
      </div>

      <div class="status-card">
        <div class="card-header">
          <span class="card-icon">&#9998;</span>
          <span>{{ t('dashboard.toonflowEngine') }}</span>
        </div>
        <div class="card-body">
          <span class="badge" :class="toonflowOk ? 'badge-green' : 'badge-yellow'">
            {{ toonflowOk ? t('dashboard.connected') : t('dashboard.notDetected') }}
          </span>
          <p class="card-desc">{{ t('dashboard.toonflowDesc') }}</p>
        </div>
        <div class="card-footer">
          <span class="card-stat">{{ t('dashboard.port') }} 10588</span>
        </div>
      </div>

      <div class="status-card">
        <div class="card-header">
          <span class="card-icon">&#9733;</span>
          <span>{{ t('dashboard.methodsDb') }}</span>
        </div>
        <div class="card-body">
          <span class="badge badge-blue">789+</span>
          <p class="card-desc">{{ t('dashboard.methodsDesc') }}</p>
        </div>
        <div class="card-footer">
          <a href="/docs/index.html" target="_blank" class="btn btn-sm">{{ t('dashboard.browse') }}</a>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions">
      <h2>{{ t('dashboard.quickActions') }}</h2>
      <div class="action-grid">
        <router-link to="/render" class="action-card">
          <span class="action-icon">&#127916;</span>
          <span>{{ t('dashboard.renderScene') }}</span>
        </router-link>
        <router-link to="/projects" class="action-card">
          <span class="action-icon">&#128214;</span>
          <span>{{ t('dashboard.browseProjects') }}</span>
        </router-link>
        <router-link to="/mcp" class="action-card">
          <span class="action-icon">&#128295;</span>
          <span>{{ t('dashboard.mcpTools') }}</span>
        </router-link>
        <a href="/Text2Word/index.html" target="_blank" class="action-card">
          <span class="action-icon">&#128312;</span>
          <span>{{ t('dashboard.text2Word') }}</span>
        </a>
      </div>
    </div>

    <!-- Recent Tasks -->
    <div class="recent-tasks" v-if="tasks.length > 0">
      <h2>{{ t('dashboard.recentRenders') }}</h2>
      <div class="task-list">
        <div v-for="task in tasks.slice(0, 5)" :key="task.id" class="task-row">
          <span class="task-id">{{ task.id.slice(0, 8) }}</span>
          <span class="task-status" :class="'status-' + task.status">{{ task.status }}</span>
          <div class="progress-bar"><div class="progress-fill" :style="{ width: task.progress + '%' }"></div></div>
          <span class="task-type">{{ task.outputType }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as api from '../composables/useApi';
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();

const mcpConnected = ref(false);
const bridgeOk = ref(true);
const toonflowOk = ref(false);
const tasks = ref<any[]>([]);

let refreshTimer: ReturnType<typeof setInterval> | null = null;

async function refresh() {
  try {
    const status = await api.getMcpStatus();
    mcpConnected.value = status.connected;
  } catch { mcpConnected.value = false; }

  try {
    const health = await api.getHealth();
    bridgeOk.value = health.status === 'ok';
  } catch { bridgeOk.value = false; }

  try {
    const res = await fetch('/api/toonflow/health');
    if (res.ok) {
      const data = await res.json();
      toonflowOk.value = data.connected;
    } else { toonflowOk.value = false; }
  } catch { toonflowOk.value = false; }

  try {
    const res = await api.listTasks();
    tasks.value = res.tasks || [];
  } catch { /* ignore */ }
}

async function connectMcp() {
  try {
    await api.connectMcp();
    mcpConnected.value = true;
  } catch { /* already connected or error */ }
}

onMounted(() => {
  refresh();
  refreshTimer = setInterval(refresh, 10000); // 10s auto-refresh
});

onUnmounted(() => {
  if (refreshTimer) clearInterval(refreshTimer);
});
</script>

<style scoped>
.dashboard { max-width: 960px; margin: 0 auto; }
h1 { font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 4px; }
.subtitle { color: #888; font-size: 14px; margin-bottom: 32px; }

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
}

.status-card {
  background: #12121a;
  border: 1px solid #2a2a3a;
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s;
}
.status-card:hover { border-color: #3a3a5a; }

.card-header {
  padding: 12px 16px;
  border-bottom: 1px solid #1e1e2e;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-icon { font-size: 18px; color: #7c6aff; }

.card-body { padding: 12px 16px; }
.card-desc { font-size: 12px; color: #666; margin-top: 8px; }

.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}
.badge-green { background: #0f2e1f; color: #4ade80; }
.badge-red { background: #2e0f0f; color: #f87171; }
.badge-yellow { background: #2e2a0f; color: #facc15; }
.badge-blue { background: #0f1e2e; color: #60a5fa; }

.card-footer {
  padding: 8px 16px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-stat { font-size: 12px; color: #555; }

.btn {
  padding: 6px 14px;
  border: 1px solid #2a2a3a;
  border-radius: 6px;
  background: #1e1e2e;
  color: #ccc;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}
.btn:hover { background: #2a2a3a; color: #fff; }
.btn:disabled { opacity: 0.4; cursor: default; }

.quick-actions { margin-bottom: 40px; }
h2 { font-size: 18px; font-weight: 600; color: #ccc; margin-bottom: 16px; }

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  background: #12121a;
  border: 1px solid #2a2a3a;
  border-radius: 10px;
  color: #ccc;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.15s;
}
.action-card:hover { border-color: #7c6aff; color: #fff; }
.action-icon { font-size: 22px; }

.task-list { display: flex; flex-direction: column; gap: 8px; }
.task-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: #12121a;
  border-radius: 8px;
  font-size: 13px;
}

.task-id { color: #888; font-family: monospace; }

.task-status {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}
.status-queued, .status-connecting { background: #1e1e2e; color: #888; }
.status-scene_building, .status-camera_setting { background: #1e2e1e; color: #a3e635; }
.status-rendering, .status-compositing { background: #1e1e2e; color: #7c6aff; }
.status-completed { background: #0f2e1f; color: #4ade80; }
.status-failed { background: #2e0f0f; color: #f87171; }

.progress-bar {
  flex: 1;
  height: 4px;
  background: #1e1e2e;
  border-radius: 2px;
  overflow: hidden;
}
.progress-fill { height: 100%; background: #7c6aff; border-radius: 2px; transition: width 0.3s; }
.task-type { color: #666; font-size: 12px; }
</style>
