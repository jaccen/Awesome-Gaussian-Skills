/**
 * Toonflow Vendor 适配器 — 3DGS Renderer
 *
 * 遵循 Toonflow 供应商适配器协议（data/vendor/*.ts），
 * 将 Awesome-Gaussian-Skills 的 3DGS 渲染能力注册为
 * Toonflow 的"图像模型"和"视频模型"供应商。
 *
 * 使用方式：
 *   1. 复制本文件到 Toonflow 的 data/vendor/3dgs-renderer.ts
 *   2. 在 Toonflow 设置页面配置供应商，填入 toonflow-bridge 地址
 *   3. 在项目中选择 3DGS 模型作为图像/视频模型
 *
 * 注意：本文件使用 Toonflow VM 沙箱兼容的 exports 风格，
 *       不要改为 ESM export 风格，否则 Sucrase 编译会出错。
 */

// ============================================================
// 供应商配置（必须导出）
// ============================================================

exports.vendor = {
  id: '3dgs-renderer',
  name: '3DGS Renderer (Awesome-Gaussian-Skills)',
  inputs: [
    { key: 'bridgeUrl', label: 'Bridge 服务地址', type: 'text' },
    { key: 'bridgeToken', label: 'Bridge Token', type: 'password' },
    { key: 'gpuServer', label: 'GPU 服务器地址', type: 'text' },
    { key: 'renderQuality', label: '渲染质量', type: 'select', options: ['draft', 'preview', 'final'] }
  ],
  models: {
    image: [
      '3dgs-scene-v1 (3DGS场景渲染)',
      '3dgs-character-v1 (3DGS角色渲染)',
      '3dgs-environment-v1 (3DGS环境渲染)'
    ],
    video: [
      '3dgs-animation-v1 (3DGS相机动画)',
      '3dgs-articulated-v1 (3DGS角色动画)',
      '3dgs-composite-v1 (3DGS+数字人合成)'
    ]
  }
};

// ============================================================
// 文本模型适配器（3DGS 不直接提供文本能力，使用桥接模式）
// ============================================================

exports.textRequest = function(model, think, thinkLevel) {
  const createOpenAI = typeof globalThis.__createOpenAI !== 'undefined'
    ? globalThis.__createOpenAI
    : null;

  if (!createOpenAI) {
    throw new Error('3DGS Renderer 不提供文本模型，请在 Toonflow 设置中配置其他文本供应商（如 DeepSeek/OpenAI）');
  }

  const openai = createOpenAI({
    apiKey: this.inputValues?.bridgeToken || 'sk-placeholder',
    baseURL: this.inputValues?.bridgeUrl || 'http://localhost:10590/v1'
  });

  return openai.languageModel(model || '3dgs-scene-v1');
};

// ============================================================
// 图像模型适配器（核心：3DGS 渲染替代2D AI生图）
// ============================================================

exports.imageRequest = async function(config, model) {
  const bridgeUrl = this.inputValues?.bridgeUrl || 'http://localhost:10590';
  const bridgeToken = this.inputValues?.bridgeToken || '';
  const quality = this.inputValues?.renderQuality || 'preview';

  const sceneType = model.includes('character') ? 'character'
    : model.includes('environment') ? 'environment'
    : 'scene';

  // Step 1: 构建3DGS场景
  const buildResponse = await axios.post(`${bridgeUrl}/api/render/frame`, {
    storyboardId: config.storyboardId || `gen-${Date.now()}`,
    projectId: config.projectId || '',
    sceneDescription: config.prompt,
    width: config.width || 1920,
    height: config.height || 1080,
    quality: quality,
    sceneType: sceneType
  }, {
    headers: { Authorization: `Bearer ${bridgeToken}` },
    timeout: 120000
  });

  const taskId = buildResponse.data?.taskId;
  if (!taskId) {
    throw new Error('3DGS渲染任务创建失败');
  }

  // Step 2: 轮询渲染状态
  const maxRetries = 120;
  let retries = 0;

  while (retries < maxRetries) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const statusResponse = await axios.get(`${bridgeUrl}/api/render/status/${taskId}`, {
      headers: { Authorization: `Bearer ${bridgeToken}` }
    });

    const taskStatus = statusResponse.data?.task;

    if (taskStatus?.status === 'completed') {
      const outputPath = taskStatus.outputUrl;
      if (!outputPath) {
        throw new Error('3DGS渲染完成但无输出文件');
      }

      const imageResponse = await axios.get(outputPath, {
        responseType: 'arraybuffer'
      });

      const base64 = Buffer.from(imageResponse.data, 'binary').toString('base64');
      return `data:image/png;base64,${base64}`;
    }

    if (taskStatus?.status === 'failed') {
      throw new Error(`3DGS渲染失败: ${taskStatus.error || '未知错误'}`);
    }

    retries++;
  }

  throw new Error('3DGS渲染超时');
};

// ============================================================
// 视频模型适配器（核心：3DGS 相机动画替代 I2V/T2V）
// ============================================================

exports.videoRequest = async function(config, model) {
  const bridgeUrl = this.inputValues?.bridgeUrl || 'http://localhost:10590';
  const bridgeToken = this.inputValues?.bridgeToken || '';

  const renderResponse = await axios.post(`${bridgeUrl}/api/render/animation`, {
    storyboardId: config.storyboardId || `anim-${Date.now()}`,
    projectId: config.projectId || '',
    duration: config.duration || 3,
    fps: 24,
    animationType: model.includes('articulated') ? 'articulated'
      : model.includes('composite') ? 'composite'
      : 'camera',
    sceneDescription: config.prompt
  }, {
    headers: { Authorization: `Bearer ${bridgeToken}` },
    timeout: 300000
  });

  const taskId = renderResponse.data?.taskId;

  const maxRetries = 300;
  let retries = 0;

  while (retries < maxRetries) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const statusResponse = await axios.get(`${bridgeUrl}/api/render/status/${taskId}`, {
      headers: { Authorization: `Bearer ${bridgeToken}` }
    });

    const taskStatus = statusResponse.data?.task;

    if (taskStatus?.status === 'completed') {
      return taskStatus.outputUrl;
    }

    if (taskStatus?.status === 'failed') {
      throw new Error(`3DGS动画渲染失败: ${taskStatus.error || '未知错误'}`);
    }

    retries++;
  }

  throw new Error('3DGS动画渲染超时');
};

// ============================================================
// TTS 适配器（3DGS 不提供 TTS）
// ============================================================

exports.ttsRequest = async function(config, model) {
  throw new Error('3DGS Renderer 不提供 TTS 能力，请在 Toonflow 设置中配置 TTS 供应商（如 CosyVoice/GRSAI）');
};
