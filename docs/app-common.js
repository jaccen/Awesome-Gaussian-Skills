(function () {
  var I18N = {
    zh: {
      title: "Awesome Gaussian Skills · 3D 高斯溅射开源工具箱",
      "title.methods": "方法库 · Awesome Gaussian Skills", "title.studio": "在线工作台 · Awesome Gaussian Skills", "title.skills": "技能与安装 · Awesome Gaussian Skills",
      "nav.methods": "方法", "nav.skills": "技能", "nav.book": "电子书", "nav.studio": "Studio", "nav.github": "GitHub",
      "nav.home": "首页", "nav.methods2": "方法库", "nav.studio2": "在线工作台", "nav.skills2": "技能与安装",
      "hero.version": "v0.9.4 · 现已开源",
      "hero.sub": "面向 3D Gaussian Splatting 与计算机图形学的空间智能开源工具箱",
      "hero.badge.methods": "859 方法", "hero.badge.cats": "23 个分类", "hero.badge.skills": "16 项技能",
      "hero.cta.methods": "探索方法", "hero.cta.book": "阅读电子书",
      "hero.studio": "SplatVerse Studio →", "hero.star": "在 GitHub 上 Star →",
      "hero.cta.studio": "进入工作台",
      "home.card.methods.t": "方法库", "home.card.methods.d": "859+ 个 3DGS 方法、23 个分类 — 搜索、筛选、对比，一键直达论文与代码。",
      "home.card.studio.t": "在线工作台", "home.card.studio.d": "文生 3D · 图生 3DGS · 实时查看器 — 在浏览器中完成从创意到 3D。",
      "home.card.skills.t": "技能与安装", "home.card.skills.d": "16 项专业技能，秒级接入主流 AI Agent 平台。",
      "home.card.trends.t": "研究热点", "home.card.trends.d": "每日追踪 arXiv、顶会与 GitHub 上的 3DGS 最新动态。",

      "t2w.eyebrow": "文生 3D", "t2w.sub": "用一句话描述场景，换取一个 3D 高斯世界",
      "t2w.sub2": "让 3DGS 与 CAD 创作触手可及的创意平台",
      "t2w.powered": "由 Tripo / Meshy / Hunyuan3D 驱动 —— 多供应商文生 3D 生成",
      "t2w.provider": "3D 供应商", "t2w.getkey": "获取密钥 →",
      "t2w.hunyuan.note": "Hunyuan3D API 采用 TC3-HMAC-SHA256 签名（无法在浏览器直接调用）。点击「生成」将打开腾讯云控制台，或切换到 Tripo / Meshy 进行浏览器内生成。",
      "t2w.hunyuan.open": "打开 Hunyuan3D 控制台 →",
      "t2w.trynow": "立即体验",
      "t2w.tag.gear": "齿轮", "t2w.tag.room": "室内", "t2w.tag.landscape": "风景", "t2w.tag.avatar": "虚拟人", "t2w.tag.mocap": "动作捕捉", "t2w.tag.vehicle": "车辆",
      "t2w.gen": "生成", "t2w.editor": "完整编辑器",
      "t2w.result.method": "方法", "t2w.result.scene": "场景", "t2w.result.export": "主导出", "t2w.result.secondary": "次级",
      "t2w.brief": "场景简报",
      "t2w.genmodel": "生成的 3D 模型", "t2w.preview": "预览渲染",
      "t2w.interact": "交互式 3D — 拖拽旋转，滚轮缩放", "t2w.download": "下载 GLB →",
      "t2w.viewer": "PlayCanvas 3DGS 查看器", "t2w.viewerhint": "交互式 — 拖拽旋转，滚轮缩放",
      "t2w.load": "点击「生成」载入 3DGS 场景",
      "t2w.poweredby": "由", "t2w.openSplat": "打开 SuperSplat 编辑器 →",
      "t2w.preset1": "玩具猫 (.sog)", "t2w.preset1d": "压缩高斯溅射 — 流式格式",
      "t2w.preset2": "宇航员 (glTF)", "t2w.preset2d": "标准 3D 模型 — 环绕与缩放",
      "t2w.preset3": "SuperSplat 编辑器", "t2w.preset3d": "功能完整的浏览器 3DGS 编辑器",
      "t2w.f1t": "自然语言输入", "t2w.f1d": "用大白话描述场景，无需 JSON，无需表单。",
      "t2w.f2t": "智能方法选择", "t2w.f2d": "分析 859+ 3DGS 方法 — 自动为你挑选最优方案。",
      "t2w.f3t": "多格式导出", "t2w.f3d": "3DGS、网格、CAD (STEP)、点云 — 从文本到任意格式。",

      "i2g.eyebrow": "图生 3DGS", "i2g.sub": "上传一张图片 — 从单张照片重建 3D 高斯世界",
      "i2g.sub2": "从生物细胞到建筑：任何图片都能变成可探索的 3D",
      "i2g.input": "图片输入", "i2g.drop": "将图片拖到这里，或点击上传", "i2g.drop2": "PNG、JPG、WebP — 任意场景",
      "i2g.preset.cell": "细胞", "i2g.preset.building": "建筑", "i2g.preset.sculpture": "雕塑", "i2g.preset.product": "产品",
      "i2g.reconstruct": "3DGS 重建", "i2g.getkey": "获取密钥",
      "i2g.hunyuan.note": "兼容 OpenAI 的 API — 直接浏览器调用，无需服务端签名。",
      "i2g.reconstructBtn": "重建", "i2g.clear": "清除",
      "i2g.result.scene": "识别场景", "i2g.result.provider": "3D 供应商", "i2g.result.output": "输出",
      "i2g.loading": "正在载入模型…", "i2g.download": "下载 GLB",
      "i2g.viewer": "Img2GS 3D 查看器", "i2g.viewerhint": "生成场景预览 — 拖拽旋转",
      "i2g.opt1": "重建结果 (.sog)", "i2g.opt2": "预览 (glTF)",
      "i2g.placeholder": "上传图片并点击「重建」以预览 3DGS 输出",
      "i2g.poweredby": "由 PlayCanvas Engine +", "i2g.pipeline": "流水线驱动",
      "i2g.f1t": "单图输入", "i2g.f1d": "上传任意照片 — 从显微影像到城市天际线。",
      "i2g.f2t": "AI 3D 生成", "i2g.f2d": "Tripo / Meshy / Hunyuan3D / Rodin — 多供应商图生 3D 重建。",
      "i2g.f3t": "3DGS + 网格导出", "i2g.f3d": "GLB 模型 → 3DGS 精化 → .ply / .obj / .step 输出。",

      "show.eyebrow": "可视化", "show.title": "3DGS 实战",
      "show.sub": "实时辐射场渲染 — 几分钟内从照片到照片级真实的 3D",
      "show.teaser": "3D Gaussian Splatting (Kerbl et al., SIGGRAPH 2023) — 在自行车、花园、树桩与室内场景上的实时新视角合成",
      "show.aa.title": "Mip-Splatting 抗锯齿",
      "show.aa.desc": "左：3DGS 基线 — 缩放伪影与锯齿。右：Mip-Splatting — 任意尺度下平滑、无锯齿渲染。",
      "show.try": "体验交互式 3DGS 查看器", "show.hide": "收起交互式查看器",
      "show.poweredby": "由", "show.drag": "驱动 — 拖拽旋转，滚轮缩放",

      "methods.eyebrow": "方法库", "methods.title": "方法探索器",
      "methods.sub": "浏览 859 个方法、横跨 23 个分类 — 搜索、筛选、排序，点击任意卡片查看详情。",
      "methods.search": "按名称、描述、分类或 arXiv ID 搜索…",
      "methods.sort": "排序：", "methods.sort.default": "默认", "methods.sort.newest": "最新",
      "methods.sortHint.newest": "按发布日期排序（无 arXiv ID 的排在最后）",
      "methods.sort.name": "名称 A-Z", "methods.sort.code": "有代码",
      "methods.sortHint.name": "按方法名字母顺序", "methods.sortHint.code": "优先显示提供代码的方法",
      "methods.loadMore": "加载更多", "methods.filtering": "当前筛选：", "methods.clear": "清除",
      "methods.reset": "重置筛选", "methods.clearSearch": "清除搜索", "methods.hasCode": "提供代码链接",
      "methods.emptyA": "没有找到与", "methods.emptyB": "匹配的方法，换个关键词或分类试试。",
      "modal.noData": "暂无收录详情", "modal.noLink": "暂无公开链接", "modal.close": "关闭",
      "modal.abstract.loading": "正在载入摘要…", "modal.abstract.none": "暂无摘要",
      "a11y.backTop": "回到顶部",


      "skills.eyebrow": "技能", "skills.title": "16 项专业技能", "skills.sub": "面向 3DGS 研究全流程的端到端 AI 助手。",
      "install.eyebrow": "安装", "install.title": "快速开始", "install.sub": "秒级安装，兼容主流 AI Agent 平台",
      "trends.eyebrow": "热点", "trends.title": "3DGS 研究热点趋势", "trends.sub": "每日追踪 arXiv、会议与 GitHub",

      "footer.guide": "安装指南", "footer.changelog": "更新日志", "footer.built": "为 3DGS 社区打造",

      "cat.all": "全部",
      "copy": "复制", "copied": "已复制！",
      "modal.innovation": "核心创新", "modal.innovations": "核心创新点", "modal.code": "代码", "modal.abstract.en": "English", "modal.abstract.zh": "中文",
      "gen.generating": "生成中…", "gen.regenerate": "重新生成",
      "step.parse": "解析", "step.select": "选择", "step.init": "初始化", "step.train": "训练", "step.validate": "校验", "step.export": "导出",
      "i2gstep.upload": "上传", "i2gstep.analyze": "分析", "i2gstep.generate": "生成", "i2gstep.refine": "精化", "i2gstep.validate": "校验", "i2gstep.export": "导出",
      "i2g.reconstructing": "重建中…", "i2g.rereconstruct": "重新重建",
      "status.done": "完成！", "status.loaded": "模型加载成功"
    },
    en: {
      title: "Awesome Gaussian Skills · 3D Gaussian Splatting Toolbox",
      "title.methods": "Method Library · Awesome Gaussian Skills", "title.studio": "Studio · Awesome Gaussian Skills", "title.skills": "Skills & Install · Awesome Gaussian Skills",
      "nav.methods": "Methods", "nav.skills": "Skills", "nav.book": "Book", "nav.studio": "Studio", "nav.github": "GitHub",
      "nav.home": "Home", "nav.methods2": "Methods", "nav.studio2": "Studio", "nav.skills2": "Skills & Install",
      "hero.version": "v0.9.4 · Open Source",
      "hero.sub": "3D Spatial Intelligence Open-Source Toolbox for 3D Gaussian Splatting & Computer Graphics",
      "hero.badge.methods": "859+ Methods", "hero.badge.cats": "23 Categories", "hero.badge.skills": "16 Skills",
      "hero.cta.methods": "Explore Methods", "hero.cta.book": "Read the Book",
      "hero.studio": "SplatVerse Studio →", "hero.star": "Star on GitHub →",
      "hero.cta.studio": "Open Studio",
      "home.card.methods.t": "Method Library", "home.card.methods.d": "859+ 3DGS methods across 23 categories — search, filter, compare; one click to papers & code.",
      "home.card.studio.t": "Studio", "home.card.studio.d": "Text-to-3D · Image-to-3DGS · Live viewer — from idea to 3D, entirely in your browser.",
      "home.card.skills.t": "Skills & Install", "home.card.skills.d": "16 specialized skills — plug into major AI agent platforms in seconds.",
      "home.card.trends.t": "Trends", "home.card.trends.d": "Daily tracking of 3DGS activity across arXiv, conferences, and GitHub.",

      "t2w.eyebrow": "Text-to-3D", "t2w.sub": "Describe a scene in words — get a 3D Gaussian world in return",
      "t2w.sub2": "The creative platform making 3DGS & CAD accessible to everyone",
      "t2w.powered": "Powered by Tripo / Meshy / Hunyuan3D — multi-provider text-to-3D generation",
      "t2w.provider": "3D Provider", "t2w.getkey": "Get Key →",
      "t2w.hunyuan.note": "Hunyuan3D API uses TC3-HMAC-SHA256 signing (not callable from browser). Click Generate to open Tencent Cloud console, or switch to Tripo/Meshy for in-browser generation.",
      "t2w.hunyuan.open": "Open Hunyuan3D Console →",
      "t2w.trynow": "Try it now",
      "t2w.tag.gear": "Gear", "t2w.tag.room": "Room", "t2w.tag.landscape": "Landscape", "t2w.tag.avatar": "Avatar", "t2w.tag.mocap": "MoCap", "t2w.tag.vehicle": "Vehicle",
      "t2w.gen": "Generate", "t2w.editor": "Full Editor",
      "t2w.result.method": "Method", "t2w.result.scene": "Scene", "t2w.result.export": "Primary Export", "t2w.result.secondary": "Secondary",
      "t2w.brief": "Scene Brief",
      "t2w.genmodel": "Generated 3D Model", "t2w.preview": "Preview Render",
      "t2w.interact": "Interactive 3D — drag to rotate, scroll to zoom", "t2w.download": "Download GLB →",
      "t2w.viewer": "PlayCanvas 3DGS Viewer", "t2w.viewerhint": "Interactive — drag to rotate, scroll to zoom",
      "t2w.load": "Click \"Generate\" to load a 3DGS scene",
      "t2w.poweredby": "Powered by", "t2w.openSplat": "Open SuperSplat Editor →",
      "t2w.preset1": "Toy Cat (.sog)", "t2w.preset1d": "Compressed Gaussian Splat — streaming format",
      "t2w.preset2": "Astronaut (glTF)", "t2w.preset2d": "Standard 3D model — orbit & zoom",
      "t2w.preset3": "SuperSplat Editor", "t2w.preset3d": "Full-featured browser 3DGS editor",
      "t2w.f1t": "Natural Language In", "t2w.f1d": "Describe your scene in plain words. No JSON, no forms.",
      "t2w.f2t": "Smart Method Selection", "t2w.f2d": "859+ 3DGS methods analyzed — best one auto-picked for you.",
      "t2w.f3t": "Multi-Format Export", "t2w.f3d": "3DGS, mesh, CAD (STEP), point cloud — from text to any format.",

      "i2g.eyebrow": "Image-to-3DGS", "i2g.sub": "Upload an image — reconstruct a 3D Gaussian world from a single photo",
      "i2g.sub2": "From biological cells to architecture: any image becomes explorable 3D",
      "i2g.input": "Image Input", "i2g.drop": "Drop an image here or click to upload", "i2g.drop2": "PNG, JPG, WebP — any scene",
      "i2g.preset.cell": "Cell", "i2g.preset.building": "Building", "i2g.preset.sculpture": "Sculpture", "i2g.preset.product": "Product",
      "i2g.reconstruct": "3DGS Reconstruction", "i2g.getkey": "Get Key",
      "i2g.hunyuan.note": "OpenAI-compatible API — direct browser call, no server-side signing needed.",
      "i2g.reconstructBtn": "Reconstruct", "i2g.clear": "Clear",
      "i2g.result.scene": "Detected Scene", "i2g.result.provider": "3D Provider", "i2g.result.output": "Output",
      "i2g.loading": "Loading model...", "i2g.download": "Download GLB",
      "i2g.viewer": "Img2GS 3D Viewer", "i2g.viewerhint": "Generated scene preview — drag to rotate",
      "i2g.opt1": "Reconstructed (.sog)", "i2g.opt2": "Preview (glTF)",
      "i2g.placeholder": "Upload an image and click Reconstruct to preview 3DGS output",
      "i2g.poweredby": "Powered by PlayCanvas Engine +", "i2g.pipeline": "pipeline",
      "i2g.f1t": "Single Image In", "i2g.f1d": "Upload any photo — from microscopy to cityscape.",
      "i2g.f2t": "AI 3D Generation", "i2g.f2d": "Tripo / Meshy / Hunyuan3D / Rodin — multi-provider image-to-3D reconstruction.",
      "i2g.f3t": "3DGS + Mesh Export", "i2g.f3d": "GLB model → 3DGS refinement → .ply / .obj / .step output.",

      "show.eyebrow": "Visualization", "show.title": "3DGS in Action",
      "show.sub": "Real-time radiance field rendering — from photos to photorealistic 3D in minutes",
      "show.teaser": "3D Gaussian Splatting (Kerbl et al., SIGGRAPH 2023) — real-time novel-view synthesis on bicycle, garden, stump & room scenes",
      "show.aa.title": "Mip-Splatting Anti-Aliasing",
      "show.aa.desc": "Left: 3DGS baseline — zoom artifacts & aliasing. Right: Mip-Splatting — smooth, aliasing-free rendering at any scale.",
      "show.try": "Try Interactive 3DGS Viewer", "show.hide": "Hide Interactive Viewer",
      "show.poweredby": "Powered by", "show.drag": "(MIT) — drag to rotate, scroll to zoom",

      "methods.eyebrow": "Library", "methods.title": "Method Explorer",
      "methods.sub": "Browse 859 methods across 23 categories — search, filter, sort, and click any card for details.",
      "methods.search": "Search by name, description, category or arXiv ID...",
      "methods.sort": "Sort:", "methods.sort.default": "Default", "methods.sort.newest": "Newest",
      "methods.sortHint.newest": "Sorted by publication date (entries without an arXiv ID last)",
      "methods.sort.name": "Name A-Z", "methods.sort.code": "Has code",
      "methods.sortHint.name": "Sorted alphabetically by name", "methods.sortHint.code": "Methods with code links first",
      "methods.loadMore": "Load more", "methods.filtering": "Filtered by:", "methods.clear": "Clear",
      "methods.reset": "Reset filters", "methods.clearSearch": "Clear search", "methods.hasCode": "Code link available",
      "methods.emptyA": "No methods match", "methods.emptyB": "— try a different keyword or category.",
      "modal.noData": "Detailed notes not curated yet", "modal.noLink": "No public link yet", "modal.close": "Close",
      "modal.abstract.loading": "Loading abstract…", "modal.abstract.none": "No abstract available",
      "a11y.backTop": "Back to top",


      "skills.eyebrow": "Skills", "skills.title": "15 Specialized Skills", "skills.sub": "End-to-end AI assistance for 3DGS research workflow.",
      "install.eyebrow": "Install", "install.title": "Quick Start", "install.sub": "Install in seconds, compatible with major AI agent platforms",
      "trends.eyebrow": "Trends", "trends.title": "Hot Trends in 3DGS Research", "trends.sub": "Tracked daily from arXiv, conferences, and GitHub",

      "footer.guide": "Install Guide", "footer.changelog": "Changelog", "footer.built": "Built for the 3DGS community",

      "cat.all": "All",
      "copy": "Copy", "copied": "Copied!",
      "modal.innovation": "Core Innovation", "modal.innovations": "Core Innovations", "modal.code": "Code", "modal.abstract.en": "English", "modal.abstract.zh": "中文",
      "gen.generating": "Generating...", "gen.regenerate": "Regenerate",
      "step.parse": "Parse", "step.select": "Select", "step.init": "Init", "step.train": "Train", "step.validate": "Validate", "step.export": "Export",
      "i2gstep.upload": "Upload", "i2gstep.analyze": "Analyze", "i2gstep.generate": "Generate", "i2gstep.refine": "Refine", "i2gstep.validate": "Validate", "i2gstep.export": "Export",
      "i2g.reconstructing": "Reconstructing...", "i2g.rereconstruct": "Re-reconstruct",
      "status.done": "Done!", "status.loaded": "Model loaded successfully"
    }
  };

  window.AGS_I18N = I18N;
  window.AGS_LANG = (function () {
    var hash = (location.hash || '').replace(/^#/, '').toLowerCase();
    if (hash === 'en' || hash === 'zh') return hash;
    var parts = hash.split('=');
    if (parts.length === 2 && parts[0] === 'lang' && (parts[1] === 'en' || parts[1] === 'zh')) return parts[1];
    try { var s = localStorage.getItem('ags-lang'); return s === 'en' ? 'en' : 'zh'; }
    catch (e) { return 'zh'; }
  })();

  window.AGS_T = function (key) {
    var d = I18N[window.AGS_LANG] || I18N.zh;
    if (d[key] !== undefined) return d[key];
    if (I18N.zh[key] !== undefined) return I18N.zh[key];
    return key;
  };

  // 兼容旧调用；注意 playcanvas.min.js 会覆盖 window.t，
  // 因此内部代码一律使用 AGS_T，不要依赖 window.t
  window.t = window.AGS_T;

  window.applyStaticLang = function () {
    document.documentElement.lang = window.AGS_LANG === 'zh' ? 'zh-CN' : 'en';
    document.title = AGS_T(window.AGS_TITLE_KEY || 'title');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (k) { var v = AGS_T(k); el.textContent = v == null ? '' : String(v); }
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      if (k) el.setAttribute('placeholder', AGS_T(k) || '');
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-aria');
      if (k) el.setAttribute('aria-label', AGS_T(k) || '');
    });
    document.querySelectorAll('.lang-option').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === window.AGS_LANG);
    });
  };

  window.setLang = function (lang) {
    if (lang !== 'zh' && lang !== 'en') return;
    window.AGS_LANG = lang;
    try { localStorage.setItem('ags-lang', lang); } catch (e) {}
    applyStaticLang();
    ['renderTabs', 'renderMethods', 'renderSkills', 'renderInstall', 'renderTrends'].forEach(function (fn) {
      try { if (typeof window[fn] === 'function') window[fn](); } catch (e) {}
    });
    if (typeof window.refreshDynamicLabels === 'function') window.refreshDynamicLabels();
  };

  document.addEventListener('DOMContentLoaded', function () {
    applyStaticLang();
    if (typeof window.refreshDynamicLabels === 'function') window.refreshDynamicLabels();
  });
})();
