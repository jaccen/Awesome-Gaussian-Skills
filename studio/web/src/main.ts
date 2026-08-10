import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/Dashboard.vue') },
    { path: '/pipeline', component: () => import('./views/Pipeline.vue') },
    { path: '/render', component: () => import('./views/RenderStudio.vue') },
    { path: '/projects', component: () => import('./views/ProjectBrowser.vue') },
    { path: '/mcp', component: () => import('./views/McpTools.vue') },
  ],
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
