<template>
  <div class="project-browser">
    <h1>{{ t('projects.title') }}</h1>

    <!-- Loading -->
    <div v-if="loading" class="empty-state">
      <div class="spinner"></div>
      <p>{{ t('projects.checkingToonflow') }}</p>
    </div>

    <!-- Toonflow not detected -->
    <div v-else-if="!toonflowConnected" class="empty-state">
      <div class="empty-icon">&#9888;</div>
      <p>{{ t('projects.toonflowNotDetected') }}</p>
      <p class="hint">{{ t('projects.startToonflowFirst') }}</p>
      <button @click="refresh" class="btn btn-sm" style="margin-top: 12px;">{{ t('projects.retry') }}</button>
    </div>

    <!-- Empty projects list -->
    <div v-else-if="projects.length === 0" class="empty-state">
      <div class="empty-icon">&#128194;</div>
      <p>{{ t('projects.noProjects') }}</p>
      <p class="hint">{{ t('projects.createInToonflow') }}</p>
    </div>

    <!-- Project list -->
    <div v-else class="project-list">
      <div v-for="proj in projects" :key="proj.id" class="project-card" @click="selectProject(proj)">
        <div class="project-header">
          <span class="project-name">{{ proj.name || t('projects.untitled') }}</span>
          <span class="project-id">{{ proj.id }}</span>
        </div>
        <div class="project-meta">
          <span>{{ proj.description || t('projects.noDescription') }}</span>
        </div>
        <div v-if="proj.storyboardCount" class="project-count">{{ proj.storyboardCount }} {{ t('projects.storyboards') }}</div>
      </div>
    </div>

    <!-- Storyboards of selected project -->
    <div v-if="selectedProject" class="storyboard-section">
      <h2>{{ t('projects.storyboardsTitle') }} — {{ selectedProject.name }}</h2>

      <div v-if="loadingStoryboards" class="empty-state">
        <div class="spinner small"></div>
        <p>{{ t('projects.loadingStoryboards') }}</p>
      </div>

      <div v-else-if="storyboards.length === 0" class="empty-state">
        <p>{{ t('projects.noStoryboards') }}</p>
      </div>

      <div v-else class="storyboard-list">
        <div v-for="sb in storyboards" :key="sb.id" class="storyboard-card">
          <div class="sb-header">
            <span class="sb-id">{{ sb.id }}</span>
            <span class="sb-track">{{ sb.track }}</span>
          </div>
          <div class="sb-desc">{{ sb.videoDesc || sb.prompt }}</div>
          <div class="sb-meta">
            <span>{{ sb.duration }}s</span>
            <span>{{ sb.shouldGenerateImage ? t('projects.image') : t('projects.video') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as api from '../composables/useApi';
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();

const loading = ref(true);
const toonflowConnected = ref(false);
const projects = ref<any[]>([]);
const selectedProject = ref<any>(null);
const storyboards = ref<any[]>([]);
const loadingStoryboards = ref(false);
const warning = ref('');

async function refresh() {
  loading.value = true;
  try {
    const res = await api.getToonflowProjects();
    projects.value = res.projects || [];
    warning.value = res.warning || '';
    toonflowConnected.value = !res.warning; // if warning exists, toonflow is not truly connected
  } catch {
    toonflowConnected.value = false;
    projects.value = [];
  } finally {
    loading.value = false;
  }
}

async function selectProject(proj: any) {
  selectedProject.value = proj;
  loadingStoryboards.value = true;
  try {
    const res = await api.getToonflowStoryboards(proj.id);
    storyboards.value = res.storyboards || [];
  } catch {
    storyboards.value = [];
  } finally {
    loadingStoryboards.value = false;
  }
}

onMounted(() => refresh());
</script>

<style scoped>
.project-browser { max-width: 800px; margin: 0 auto; }
h1 { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 24px; }
h2 { font-size: 18px; color: #ccc; margin-bottom: 16px; }

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
}
.empty-icon { font-size: 36px; margin-bottom: 12px; }
.hint { font-size: 13px; color: #555; margin-top: 8px; }

.spinner {
  width: 28px; height: 28px;
  border: 3px solid #2a2a3a;
  border-top-color: #7c6aff;
  border-radius: 50%;
  margin: 0 auto 12px;
  animation: spin 0.8s linear infinite;
}
.spinner.small { width: 18px; height: 18px; border-width: 2px; }

@keyframes spin {
  to { transform: rotate(360deg); }
}

.project-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}

.project-card {
  background: #12121a;
  border: 1px solid #2a2a3a;
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.15s;
}
.project-card:hover { border-color: #7c6aff; }

.project-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.project-name { font-weight: 600; color: #ddd; font-size: 15px; }
.project-id { font-size: 11px; color: #555; font-family: monospace; }
.project-meta { font-size: 13px; color: #666; }
.project-count { font-size: 11px; color: #7c6aff; margin-top: 6px; }

.storyboard-section { margin-top: 32px; }

.storyboard-list { display: flex; flex-direction: column; gap: 8px; }

.storyboard-card {
  background: #12121a;
  border: 1px solid #2a2a3a;
  border-radius: 8px;
  padding: 12px 16px;
}

.sb-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
.sb-id { font-family: monospace; font-size: 12px; color: #888; }
.sb-track { font-size: 11px; color: #7c6aff; }
.sb-desc { font-size: 13px; color: #bbb; margin-bottom: 6px; }
.sb-meta { display: flex; gap: 12px; font-size: 12px; color: #666; }

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
</style>
