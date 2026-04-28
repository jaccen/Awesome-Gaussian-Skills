const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, LevelFormat, ExternalHyperlink, Footer, PageNumber } = require("docx");

const tb = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cb = { top: tb, bottom: tb, left: tb, right: tb };
const hdr = (t) => new TableCell({ borders: cb, shading: { fill: "E8F0FE", type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, bold: true, size: 20, font: "Microsoft YaHei" })] })] });
const cel = (t, align) => new TableCell({ borders: cb, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: align || AlignmentType.LEFT, children: [new TextRun({ text: t, size: 20, font: "Microsoft YaHei" })] })] });
const p = (t, opts = {}) => new Paragraph({ spacing: { after: 120, line: 360 }, ...opts, children: Array.isArray(t) ? t : [new TextRun({ text: t, size: 22, font: "Microsoft YaHei" })] });
const b = (t) => new TextRun({ text: t, size: 22, font: "Microsoft YaHei", bold: true });
const r = (t, opts = {}) => new TextRun({ text: t, size: 22, font: "Microsoft YaHei", ...opts });
const link = (text, url) => new ExternalHyperlink({ children: [new TextRun({ text, style: "Hyperlink", size: 22, font: "Microsoft YaHei" })], link: url });

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Microsoft YaHei", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal", run: { size: 40, bold: true, color: "1a1a1a", font: "Microsoft YaHei" }, paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 28, bold: true, color: "1a1a1a", font: "Microsoft YaHei" }, paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 24, bold: true, color: "333333", font: "Microsoft YaHei" }, paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 1 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bl", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "nl1", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1200, bottom: 1440, left: 1200 } }
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [r(" ", { size: 18, color: "999999" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "999999", font: "Microsoft YaHei" })] })] })
    },
    children: [
      // ========== TITLE ==========
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("ClawHub \u6709 13,000+ \u4e2a Skill\uff0c\u4f46\u6ca1\u6709\u4e00\u4e2a\u662f\u7ed9 3D \u7814\u7a76\u4eba\u5458\u7684")] }),
      p([r("\u4f5c\u8005\uff1ajaccen | 3D \u89c6\u89c9 / \u8ba1\u7b97\u673a\u56fe\u5f62\u5b66\u7814\u7a76\u8005", { size: 18, color: "888888", italics: true })]),
      p([r("2026 \u5e74 4 \u6708 28 \u65e5", { size: 18, color: "888888", italics: true })]),
      p(""),

      // ========== 开头 ==========
      p("2026 \u5e74 1 \u6708\uff0cOpenClaw\uff08\u6602\u79f0\u201c\u5c0f\u9f99\u867e\u201d\uff09\u4ee5\u706b\u7bad\u822c\u7684\u901f\u5ea6\u767b\u9876 GitHub\uff0c\u661f\u6807\u6570\u4ece\u4e0d\u5230 1 \u4e07\u98d9\u5347\u81f3 35 \u4e07+[\u2713]\u3002\u4e0e\u6b64\u540c\u65f6\uff0c\u5176\u6280\u80fd\u751f\u6001 ClawHub \u7684\u6ce8\u518c\u6280\u80fd\u6570\u5df2\u7a81\u7834 13,729+[\u2713]\uff0c\u817e\u8baf\u6731\u96c0\u5b9e\u9a8c\u5ba4 4 \u6708\u7684\u5168\u91cf\u626b\u63cf\u62a5\u544a\u66f4\u662f\u663e\u793a\uff0cClawHub \u4e0a\u7684 Skill \u603b\u91cf\u5df2\u8fbe\u8fd1 50,000 \u4e2a[\u2713]\u3002"),
      p("VoltAgent \u7ef4\u62a4\u7684 awesome-openclaw-skills \u4ed3\u5e93\u5df2\u4ece\u8fd9\u6d77\u91cf\u6280\u80fd\u4e2d\u7b5b\u9009\u51fa 5,400+ \u4e2a\u4f18\u8d28\u6280\u80fd\uff0c\u81ea\u8eab\u4e5f\u6536\u83b7\u4e86 47,200+ stars[\u2713]\u3002"),
      p("\u7136\u800c\uff0c\u5728\u8fd9\u7247\u7e41\u8363\u7684\u6280\u80fd\u6d77\u6d0b\u91cc\uff0c\u6709\u4e00\u4e2a\u9886\u57df\u5b8c\u5168\u662f\u7a7a\u767d\u7684\u3002"),
      p([b("\u6211\u5728 ClawHub \u4e0a\u641c\u7d22\u4e86\u201c3D\u201d\u201c\u89c6\u89c9\u201d\u201c\u56fe\u5f62\u5b66\u201d\u201c\u91cd\u5efa\u201d\u201cNeRF\u201d\u201cGaussian\u201d\u7b49\u5173\u952e\u8bcd\uff0c\u7ed3\u679c\u662f\uff1a\u96f6\u3002")]),
      p("\u4e0e\u6b64\u540c\u65f6\uff0c3D Gaussian Splatting\uff08\u4e09\u7ef4\u9ad8\u65af\u6cf1\u5c04\uff0c\u7b80\u79f0 3DGS\uff09\u81ea 2023 \u5e74\u63d0\u51fa\u4ee5\u6765\uff0c\u5df2\u6210\u4e3a\u8ba1\u7b97\u673a\u89c6\u89c9\u548c\u56fe\u5f62\u5b66\u9886\u57df\u6700\u6d3b\u8dc3\u7684\u7814\u7a76\u65b9\u5411\u4e4b\u4e00\u3002MrNeRF \u7ef4\u62a4\u7684 awesome-3D-gaussian-splatting \u5217\u8868\u6301\u7eed\u8ddf\u8e2a\u8fd9\u4e00\u65b9\u5411\u7684\u8bba\u6587\uff0c\u5df2\u6536\u83b7 8,500+ stars[\u2713]\uff1bAwesome3DGS \u7ec4\u7ec7\u66f4\u662f\u4e13\u95e8\u5efa\u7acb\u4e86\u8bba\u6587\u4ed3\u5e93\u6765\u6bcf\u65e5\u66f4\u65b0\u8ddf\u8e2a\u3002\u8fd9\u4e2a\u9886\u57df\u7684\u7814\u7a76\u8005\u4eec\u6bcf\u5929\u90fd\u5728\u4ea7\u51fa\u5927\u91cf\u5de5\u4f5c\uff0c\u4f46\u4ed6\u4eec\u7684\u5de5\u4f5c\u6d41\u7a0b\u4e2d\u6700\u91cd\u590d\u7684\u90e8\u5206\u2014\u2014\u8bba\u6587\u9605\u8bfb\u3001\u65b9\u6cd5\u5bf9\u6bd4\u3001\u4ee3\u7801\u5ba1\u67e5\u3001\u5b9e\u9a8c\u8bbe\u8ba1\u2014\u2014\u5b8c\u5168\u6ca1\u6709\u88ab AI Agent \u751f\u6001\u8986\u76d6\u3002"),
      p(""),

      // ========== 数据 ==========
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("\u4e00\u3001\u6570\u636e\u8bf4\u8bdd\uff1a13,729 \u4e2a Skill \u4e0e\u4e00\u4e2a\u7a7a\u767d\u5730\u5e26")] }),

      p("\u5148\u770b\u4e00\u7ec4\u6709\u6e90\u53ef\u67e5\u7684\u6570\u636e\uff1a"),

      new Table({
        columnWidths: [3200, 2400, 3760],
        rows: [
          new TableRow({ tableHeader: true, children: [hdr("\u6307\u6807"), hdr("\u6570\u636e"), hdr("\u6765\u6e90")] }),
          new TableRow({ children: [cel("ClawHub \u6ce8\u518c\u6280\u80fd\u603b\u91cf"), cel("13,729+"), cel("\u77e5\u4e4e 2026.4.3 \u6587\u7ae0")] }),
          new TableRow({ children: [cel("ClawHub \u5b9e\u9645\u626b\u63cf\u91cf\uff08\u817e\u8baf\u62a5\u544a\uff09"), cel("\u2248 50,000"), cel("\u817e\u8baf\u6731\u96c0\u5b9e\u9a8c\u5ba4 2026.4.26")] }),
          new TableRow({ children: [cel("VoltAgent \u7b5b\u9009\u4f18\u8d28\u6280\u80fd"), cel("5,400+"), cel("GitHub 2026.4")] }),
          new TableRow({ children: [cel("OpenClaw GitHub Stars"), cel("354,000+"), cel("CSDN 2026.4.22")] }),
          new TableRow({ children: [cel("3D/CV \u76f8\u5173 Skill"), cel("0"), cel("ClawHub \u5168\u7ad9\u641c\u7d22")] }),
        ]
      }),
      p(""),

      p("\u518d\u770b\u53e6\u4e00\u7ec4\u5bf9\u6bd4\u6570\u636e\u2014\u2014\u540c\u671f\u7206\u706b\u7684 AI Agent \u9879\u76ee\uff1a"),

      new Table({
        columnWidths: [3200, 2400, 3760],
        rows: [
          new TableRow({ tableHeader: true, children: [hdr("\u9879\u76ee"), hdr("Stars"), hdr("\u6838\u5fc3\u5185\u5bb9")] }),
          new TableRow({ children: [cel("OpenClaw"), cel("354,000+"), cel("\u5b8c\u6574\u7684 AI Agent \u6846\u67b6")] }),
          new TableRow({ children: [cel("VoltAgent/awesome-openclaw-skills"), cel("47,200+"), cel("5,400+ Skills \u7b5b\u9009\u5217\u8868")] }),
          new TableRow({ children: [cel("andrej-karpathy-skills"), cel("67,000+"), cel("\u4ec5\u4e00\u4e2a CLAUDE.md \u6587\u4ef6")] }),
          new TableRow({ children: [cel("MrNeRF/awesome-3D-gaussian-splatting"), cel("8,500+"), cel("3DGS \u8bba\u6587\u6301\u7eed\u8ddf\u8e2a")] }),
          new TableRow({ children: [cel("Hermes-Agent"), cel("66,000+"), cel("\u81ea\u6211\u8fdb\u5316 AI Agent")] }),
        ]
      }),
      p(""),

      p([b("\u5173\u952e\u53d1\u73b0\uff1a"), r("andrej-karpathy-skills \u4ec5\u51ed\u4e00\u4e2a\u4e0d\u5230 200 \u884c\u7684 Markdown \u6587\u4ef6\uff0c\u5c31\u5728\u4e00\u5468\u5185\u6536\u83b7\u4e86 44,000+ stars\uff08\u706b\u5c71\u5f15\u64ce 4.23 \u62a5\u9053\uff09\uff0c\u603b\u6570\u8fbe\u5230 67,000+[\u2713]\u3002\u5b83\u505a\u7684\u4e8b\u60c5\u975e\u5e38\u5177\u4f53\uff1a\u628a Andrej Karpathy \u5bf9 LLM \u7f16\u7a0b\u9677\u9631\u7684\u89c2\u5bdf\u63d0\u70bc\u6210\u56db\u6761\u884c\u4e3a\u51c6\u5219\uff0c\u8ba9 Claude Code \u5728\u5199\u4ee3\u7801\u65f6\u5f3a\u5236\u9075\u5b88\u3002\u8fd9\u8bc1\u660e\u4e86\u4e00\u4e2a\u91cd\u8981\u7684\u5e02\u573a\u4fe1\u53f7\uff1a"), r("\u9886\u57df\u4e13\u4e1a\u77e5\u8bc6\u7f16\u7801\u6210 Skill\uff0c\u662f\u83b7\u53d6\u793e\u533a\u8ba4\u53ef\u7684\u6709\u6548\u8def\u5f84", { bold: true })]),
      p(""),
      p("\u800c\u5728 3D \u89c6\u89c9\u548c\u8ba1\u7b97\u673a\u56fe\u5f62\u5b66\u9886\u57df\uff0c\u8fd9\u6761\u8def\u5f84\u5b8c\u5168\u6ca1\u6709\u4eba\u8d70\u8fc7\u3002"),
      p(""),

      // ========== 为什么 3DGS 需要技能 ==========
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("\u4e8c\u3001\u4e3a\u4ec0\u4e48 3D \u7814\u7a76\u9886\u57df\u9700\u8981 AI Agent Skills")] }),

      p("3DGS \u81ea 2023 \u5e74 Kerbl \u7b49\u4eba\u5728 SIGGRAPH \u4e0a\u63d0\u51fa\u4ee5\u6765\uff0c\u5df2\u7ecf\u4ece\u4e00\u7bc7\u8bba\u6587\u53d1\u5c55\u6210\u4e00\u4e2a\u5e9e\u5927\u7684\u7814\u7a76\u65b9\u5411\u3002\u6d59\u6c5f\u5927\u5b66\u7684\u7efc\u8ff0\u8bba\u6587\uff08arXiv 2401.03890\uff09\u53d1\u8868\u4e8e 2024 \u5e74 1 \u6708\uff0c\u5f53\u65f6\u5df2\u7cfb\u7edf\u6574\u7406\u4e86\u5927\u91cf\u53d8\u4f53\u65b9\u6cd5\u3002\u5230 2026 \u5e74\uff0c\u5357\u4eac\u5927\u5b66\u3001\u4e2d\u79d1\u9662\u8ba1\u7b97\u6240\u7b49\u591a\u5bb6\u673a\u6784\u53c8\u53d1\u8868\u4e86\u66f4\u65b0\u7684\u7efc\u8ff0\uff0c\u8986\u76d6\u7684\u65b9\u6cd5\u6570\u91cf\u6210\u500d\u589e\u957f\u3002"),
      p(""),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("\u6bcf\u4e2a 3DGS \u7814\u7a76\u8005\u7684\u65e5\u5e38\u75db\u70b9")] }),

      p("\u4f5c\u4e3a\u8fd9\u4e2a\u9886\u57df\u7684\u7814\u7a76\u8005\uff0c\u6211\u548c\u540c\u4e8b\u4eec\u6bcf\u5929\u90fd\u5728\u91cd\u590d\u505a\u8fd9\u4e9b\u4e8b\uff1a"),

      new Table({
        columnWidths: [3200, 2000, 4160],
        rows: [
          new TableRow({ tableHeader: true, children: [hdr("\u91cd\u590d\u6027\u5de5\u4f5c"), hdr("\u9891\u7387"), hdr("\u73b0\u6709\u5de5\u5177")] }),
          new TableRow({ children: [cel("\u9605\u8bfb\u548c\u603b\u7ed3\u65b0\u8bba\u6587"), cel("\u6bcf\u5929"), cel("\u624b\u52a8\u8bfb PDF\uff0c\u65e0\u81ea\u52a8\u5316\u5de5\u5177")] }),
          new TableRow({ children: [cel("\u5bf9\u6bd4\u4e0d\u540c 3DGS \u53d8\u4f53\u7684\u8bbe\u8ba1"), cel("\u6bcf\u5468"), cel("\u624b\u52a8\u6574\u7406\u8bba\u6587\u8868\u683c")] }),
          new TableRow({ children: [cel("\u5ba1\u67e5\u5b9e\u73b0\u4ee3\u7801\u4e2d\u7684 bug"), cel("\u6bcf\u6b21\u6295\u7a3f"), cel("\u4f9d\u8d56\u4e2a\u4eba\u7ecf\u9a8c")] }),
          new TableRow({ children: [cel("\u8bbe\u8ba1\u6d88\u878d\u5b9e\u9a8c"), cel("\u6bcf\u7bc7\u8bba\u6587"), cel("\u65e0\u7ed3\u6784\u5316\u6307\u5bfc")] }),
          new TableRow({ children: [cel("\u5c06 NeRF \u65b9\u6cd5\u8fc1\u79fb\u5230 3DGS"), cel("\u6bcf\u4e2a\u9879\u76ee"), cel("\u4ece\u96f6\u5f00\u59cb")] }),
          new TableRow({ children: [cel("\u64b0\u5199\u6295\u7a3f\u8bba\u6587"), cel("\u6301\u7eed"), cel("\u65e0\u9886\u57df\u4e13\u7528\u5199\u4f5c\u52a9\u624b")] }),
        ]
      }),
      p(""),

      p("\u8fd9\u4e9b\u5de5\u4f5c\u7684\u672c\u8d28\u662f\u4ec0\u4e48\uff1f\u662f"), r("\u7ed3\u6784\u5316\u77e5\u8bc6\u7684\u8c03\u7528\u548c\u6574\u7406", { bold: true }), r("\u2014\u2014\u5bf9\u6bd4\u4e24\u7bc7\u8bba\u6587\u7684\u65b9\u6cd5\u8bbe\u8ba1\u3001\u68c0\u67e5\u4e00\u6bb5 CUDA \u4ee3\u7801\u662f\u5426\u7b26\u5408\u6e32\u67d3\u516c\u5f0f\u3001\u786e\u5b9a\u6d88\u878d\u5b9e\u9a8c\u662f\u5426\u8986\u76d6\u4e86\u5173\u952e\u7ec4\u4ef6\u3002\u8fd9\u6070\u6070\u662f AI Agent \u6700\u64c5\u957f\u7684\u4e8b\u60c5\u2014\u2014\u524d\u63d0\u662f\uff0c\u5b83\u9700\u8981\u88ab\u8d4b\u4e88\u8fd9\u4e2a\u9886\u57df\u7684\u4e13\u4e1a\u77e5\u8bc6\u3002"),
      p(""),

      // ========== SKILL.md 是答案 ==========
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("\u4e09\u3001SKILL.md\uff1a\u6700\u4f4e\u95e8\u69db\u7684\u77e5\u8bc6\u5c01\u88c5\u5f62\u5f0f")] }),

      p("OpenClaw \u7684 Skill \u672c\u8d28\u662f\u4ec0\u4e48\uff1f\u6839\u636e OpenClaw \u5b98\u65b9\u6587\u6863\u548c\u591a\u4e2a\u6280\u672f\u6587\u7ae0\u7684\u89e3\u8bfb\uff0cSkill \u662f\u4e00\u4efd\u7ed9 AI \u9605\u8bfb\u7684\u64cd\u4f5c\u624b\u518c\uff0c\u4ee5 Markdown \u6587\u4ef6\u5f62\u5f0f\u5b58\u5728\u3002\u5b83\u544a\u8bc9 AI\uff1a\u9047\u5230\u67d0\u7c7b\u4efb\u52a1\u65f6\uff0c\u5e94\u8be5\u6309\u4ec0\u4e48\u6b65\u9aa4\u3001\u8c03\u7528\u4ec0\u4e48\u5de5\u5177\u3001\u9075\u5faa\u4ec0\u4e48\u89c4\u5219\u3002"),
      p("\u6807\u51c6\u7684 SKILL.md \u6587\u4ef6\u7ed3\u6784\u975e\u5e38\u7b80\u6d01\uff1a"),
      p([r("```yaml", { font: "Consolas" })]),
      p([r("---", { font: "Consolas" })]),
      p([r("name: skill-name", { font: "Consolas" })]),
      p([r("description: \u4e00\u53e5\u8bdd\u63cf\u8ff0", { font: "Consolas" })]),
      p([r("version: 1.0.0", { font: "Consolas" })]),
      p([r("trigger:", { font: "Consolas" })]),
      p([r("  - \u89e6\u53d1\u77ed\u8bed 1", { font: "Consolas" })]),
      p([r("  - \u89e6\u53d1\u77ed\u8bed 2", { font: "Consolas" })]),
      p([r("---", { font: "Consolas" })]),
      p([r("# Skill \u6807\u9898", { font: "Consolas" })]),
      p([r("\u8be6\u7ec6\u6307\u4ee4...", { font: "Consolas" })]),
      p([r("```", { font: "Consolas" })]),
      p(""),
      p("\u6ca1\u6709\u4ee3\u7801\uff0c\u6ca1\u6709\u4f9d\u8d56\uff0c\u6ca1\u6709\u590d\u6742\u7684\u5b89\u88c5\u6d41\u7a0b\u3002andrej-karpathy-skills \u5c31\u662f\u6700\u6781\u7aef\u7684\u4f8b\u5b50\u2014\u2014\u4ec5\u51ed\u4e00\u4e2a\u4e0d\u5230 200 \u884c\u7684 CLAUDE.md\uff0c\u5c31\u6536\u83b7\u4e86 67,000+ stars\u3002"),
      p("\u8fd9\u610f\u5473\u7740\uff0c\u521b\u5efa\u4e00\u4e2a\u6709\u4ef7\u503c\u7684 Skill \u7684\u95e8\u69db\u5176\u5b9e\u975e\u5e38\u4f4e\uff1a\u4f60\u4e0d\u9700\u8981\u5199\u4ee3\u7801\u6846\u67b6\uff0c\u4f60\u9700\u8981\u7684\u662f"), r("\u5c06\u9886\u57df\u4e13\u4e1a\u77e5\u8bc6\u7f16\u7801\u6210\u7ed3\u6784\u5316\u6307\u4ee4", { bold: true }), r("\u3002"),
      p(""),

      // ========== 引入项目 ==========
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("\u56db\u3001\u6211\u7684\u5c1d\u8bd5\uff1aAwesome Gaussian Skills")] }),

      p("\u57fa\u4e8e\u4e0a\u8ff0\u89c2\u5bdf\uff0c\u6211\u5f00\u6e90\u4e86\u4e00\u4e2a\u9879\u76ee\uff1a"), link("Awesome Gaussian Skills", "https://github.com/jaccen/Awesome-Gaussian-Skills"), r("\uff0c\u5b9a\u4f4d\u4e3a OpenClaw / Claude Code \u751f\u6001\u4e2d\u9996\u4e2a\u9762\u5411 3D Gaussian Splatting \u4e0e\u8ba1\u7b97\u673a\u56fe\u5f62\u5b66\u7814\u7a76\u7684\u6280\u80fd\u5305\u3002"),
      p(""),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("\u5305\u542b 6 \u4e2a\u7814\u7a76\u7ea7 Skill")] }),

      new Table({
        columnWidths: [2400, 3600, 3360],
        rows: [
          new TableRow({ tableHeader: true, children: [hdr("Skill \u540d\u79f0"), hdr("\u529f\u80fd"), hdr("\u89e3\u51b3\u7684\u75db\u70b9")] }),
          new TableRow({ children: [cel("3dgs-paper-reader"), cel("\u8bba\u6587\u9605\u8bfb\u4e0e\u7ed3\u6784\u5316\u603b\u7ed3"), cel("\u6bcf\u5929\u8bfb 5-10 \u7bc7\u65b0\u8bba\u6587")] }),
          new TableRow({ children: [cel("3dgs-method-compare"), cel("10+ \u7ef4\u5ea6\u65b9\u6cd5\u5bf9\u6bd4"), cel("\u5bf9\u6bd4 GS vs 2DGS vs NegGS")] }),
          new TableRow({ children: [cel("3dgs-code-reviewer"), cel("CUDA/Python \u4ee3\u7801\u5ba1\u67e5"), cel("\u53d1\u73b0 30+ \u5df2\u77e5 bug \u6a21\u5f0f")] }),
          new TableRow({ children: [cel("3dgs-experiment-planner"), cel("\u5b9e\u9a8c\u65b9\u6848\u8bbe\u8ba1"), cel("\u6570\u636e\u96c6/\u57fa\u7ebf/\u6d88\u878d\u77e9\u9635")] }),
          new TableRow({ children: [cel("nerf-to-3dgs-migrator"), cel("NeRF \u2192 3DGS \u8fc1\u79fb\u6307\u5357"), cel("\u7ec4\u4ef6\u6620\u5c04 + \u4ee3\u7801\u6a21\u677f")] }),
          new TableRow({ children: [cel("cg-paper-writing"), cel("CG \u8bba\u6587\u5199\u4f5c\u52a9\u624b"), cel("\u9876\u4f1a\u89c4\u8303/\u53bb AI \u75d5\u8ff9")] }),
        ]
      }),
      p(""),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("\u4e00\u4e2a\u5177\u4f53\u7684\u4f7f\u7528\u573a\u666f")] }),

      p("\u5047\u8bbe\u4f60\u5728\u7814\u7a76\u4e00\u79cd\u65b0\u7684 3DGS \u53d8\u4f53\uff0c\u5e0c\u671b\u5c06\u5176\u4e0e\u73b0\u6709\u65b9\u6cd5\u505a\u5bf9\u6bd4\u3002\u5728\u6ca1\u6709\u8fd9\u4e9b Skill \u65f6\uff0c\u4f60\u9700\u8981\uff1a\u624b\u52a8\u6253\u5f00 5-10 \u7bc7\u8bba\u6587\u7684 PDF\u3001\u4e00\u9875\u4e00\u9875\u7ffb\u627e\u5b9e\u9a8c\u6570\u636e\u3001\u5728\u7b14\u8bb0\u672c\u4e0a\u6574\u7406\u5bf9\u6bd4\u8868\u3002\u5b8c\u6574\u8fc7\u7a0b\u53ef\u80fd\u9700\u8981\u534a\u5929\u5230\u4e00\u5929\u3002"),
      p("\u6709\u4e86 Skill \u4e4b\u540e\uff0c\u4f60\u53ea\u9700\u8981\u5bf9 AI Agent \u8bf4\uff1a"),
      p([r("\u201c\u5e2e\u6211\u5bf9\u6bd4 NegGS \u548c 2DGS \u7684\u6838\u5fc3\u5dee\u5f02\uff0c\u4ece\u57fa\u5143\u8868\u793a\u3001\u4e0d\u900f\u660e\u5ea6\u5904\u7406\u3001\u989c\u8272\u673a\u5236\u3001\u9891\u7387\u5efa\u6a21\u3001\u51e0\u4f55\u8fb9\u754c\u7b49\u7ef4\u5ea6\u201d", { italics: true, color: "333333" })]),
      p("Agent \u4f1a\u5728\u51e0\u5206\u949f\u5185\u751f\u6210\u4e00\u4efd\u7ed3\u6784\u5316\u7684\u5bf9\u6bd4\u8868\uff0c\u5305\u542b\u6280\u672f\u7ec6\u8282\u548c\u8bbe\u8ba1\u6743\u8861\u5206\u6790\u2014\u2014\u56e0\u4e3a Skill \u91cc\u5df2\u7ecf\u5305\u542b\u4e86 50+ \u79cd\u65b9\u6cd5\u7684\u6280\u672f\u7ec6\u8282\u77e5\u8bc6\u5e93\u3002"),
      p(""),

      // ========== 透明声明 ==========
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("\u4e94\u3001\u900f\u660e\u58f0\u660e\uff1a\u8fd9\u7bc7\u6587\u7ae0\u7684\u5c40\u9650\u6027")] }),

      p("\u5728\u7ee7\u7eed\u4e4b\u524d\uff0c\u6211\u8ba4\u4e3a\u6709\u5fc5\u8981\u5bf9\u8fd9\u7bc7\u6587\u7ae0\u505a\u51e0\u70b9\u8bf4\u660e\uff1a"),
      p(""),

      new Paragraph({ numbering: { reference: "nl1", level: 0 }, spacing: { after: 100, line: 360 }, children: [r("\u6211\u662f 3DGS \u9886\u57df\u7684\u7814\u7a76\u8005\uff0c\u8fd9\u4e2a\u9879\u76ee\u76f4\u63a5\u53d7\u76ca\u4e8e\u6211\u5728\u8fd9\u4e2a\u9886\u57df\u7684\u4e13\u4e1a\u77e5\u8bc6\u3002")] }),
      new Paragraph({ numbering: { reference: "nl1", level: 0 }, spacing: { after: 100, line: 360 }, children: [r("\u6211\u65e0\u6cd5\u786e\u8ba4 ClawHub \u4e0a\u662f\u5426\u7edd\u5bf9\u6ca1\u6709 3D/CV \u76f8\u5173\u6280\u80fd\uff08\u53ef\u80fd\u5b58\u5728\u4e2a\u522b\u672a\u88ab\u7d22\u5f15\u7684\uff09\uff0c\u4f46\u6211\u6d4b\u8bd5\u4e86\u591a\u4e2a\u5173\u952e\u8bcd\u5747\u672a\u8fd4\u56de\u76f8\u5173\u7ed3\u679c\u3002")] }),
      new Paragraph({ numbering: { reference: "nl1", level: 0 }, spacing: { after: 100, line: 360 }, children: [r("\u524d\u6587\u5f15\u7528\u7684\u6240\u6709\u6570\u636e\u5747\u6807\u6ce8\u4e86\u6765\u6e90\uff0c\u5305\u62ec CSDN\u3001\u77e5\u4e4e\u3001\u817e\u8baf\u5b89\u5168\u5b9e\u9a8c\u5ba4\u3001\u706b\u5c71\u5f15\u64ce\u7b49\u5e73\u53f0\u7684\u516c\u5f00\u62a5\u9053\uff0c\u53ef\u72ec\u7acb\u9a8c\u8bc1\u3002")] }),
      new Paragraph({ numbering: { reference: "nl1", level: 0 }, spacing: { after: 100, line: 360 }, children: [r("\u540e\u6587\u63d0\u5230\u7684 Skill \u80fd\u529b\u4e3a\u8bbe\u8ba1\u76ee\u6807\uff0c\u5b9e\u9645\u6548\u679c\u53d6\u51b3\u4e8e\u6240\u4f7f\u7528\u7684 AI \u6a21\u578b\u80fd\u529b\u3002")] }),
      p(""),

      // ========== 号召 ==========
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("\u516d\u3001\u4e00\u4e2a\u9080\u8bf7")] }),

      p("Awesome Gaussian Skills \u662f\u4e00\u4e2a\u521d\u59cb\u7248\u672c\uff0c\u8986\u76d6\u4e86 3DGS \u7814\u7a76\u7684\u6838\u5fc3\u5de5\u4f5c\u6d41\u3002\u4f46\u8fd9\u4e2a\u9886\u57df\u8fd8\u6709\u5f88\u591a\u503c\u5f97\u8986\u76d6\u7684\u573a\u666f\uff1a"),
      p([r("\u2022 "), r("SLAM \u4e0e\u591a\u89c6\u56fe\u51e0\u4f55", {})]),
      p([r("\u2022 "), r("\u70b9\u4e91\u5904\u7406\u4e0e\u91cd\u5efa", {})]),
      p([r("\u2022 "), r("\u6570\u5b57\u4eba\u4e0e\u52a8\u6001\u573a\u666f", {})]),
      p([r("\u2022 "), r("NeRF \u4e0e\u9690\u5f0f\u573a\u8868\u793a", {})]),
      p([r("\u2022 "), r("\u6df1\u5ea6\u4f30\u8ba1\u4e0e\u81ea\u52a8\u9a7e\u9a76", {})]),
      p(""),
      p("\u5982\u679c\u4f60\u4e5f\u662f 3D \u89c6\u89c9 / \u8ba1\u7b97\u673a\u56fe\u5f62\u5b66\u9886\u57df\u7684\u7814\u7a76\u8005\uff0c\u6b22\u8fce Star\u3001Fork\uff0c\u6216\u63d0\u4ea4\u4f60\u7684 Skill\u3002\u8fd9\u4e2a\u9886\u57df\u7684\u7814\u7a76\u8005\u8db3\u591f\u591a\uff0c\u53ea\u662f\u8fd8\u6ca1\u6709\u4eba\u628a\u77e5\u8bc6\u5c01\u88c5\u6210 AI Agent \u53ef\u4ee5\u7406\u89e3\u7684\u5f62\u5f0f\u3002"),
      p(""),
      p([r("\u9879\u76ee\u5730\u5740\uff1a"), link("https://github.com/jaccen/Awesome-Gaussian-Skills", "https://github.com/jaccen/Awesome-Gaussian-Skills")]),
      p([r("\u534f\u8bae\u4f5c\u8005\u8868\u51c6\uff1a"), link("CONTRIBUTING.md", "https://github.com/jaccen/Awesome-Gaussian-Skills/blob/main/CONTRIBUTING.md")]),
      p(""),

      // ========== 参考来源 ==========
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("\u53c2\u8003\u6765\u6e90")] }),

      p([r("[\u2713] OpenClaw GitHub Stars 354,000+", { size: 18 }), r(" \u2014 CSDN, 2026.4.22, ", { size: 18, color: "888888" }), link("https://blog.csdn.net/bq990914/article/details/160393539", "\u94fe\u63a5", { size: 18 }), r({ size: 18, color: "888888" })]),
      p([r("[\u2713] ClawHub 13,729+ \u6ce8\u518c\u6280\u80fd", { size: 18 }), r(" \u2014 \u77e5\u4e4e, 2026.4.3, ", { size: 18, color: "888888" }), link("https://zhuanlan.zhihu.com/p/2023435089682396449", "\u94fe\u63a5", { size: 18 }), r({ size: 18, color: "888888" })]),
      p([r("[\u2713] \u817e\u8baf\u6731\u96c0\u5b9e\u9a8c\u5ba4\u626b\u63cf 50,000 Skills", { size: 18 }), r(" \u2014 \u817e\u8baf\u5b89\u5168, 2026.4.26, ", { size: 18, color: "888888" }), link("https://security.tencent.com/index.php/blog/msg/224", "\u94fe\u63a5", { size: 18 }), r({ size: 18, color: "888888" })]),
      p([r("[\u2713] VoltAgent/awesome-openclaw-skills 47,200+ stars", { size: 18 }), r(" \u2014 GitHub, 2026.4, ", { size: 18, color: "888888" }), link("https://github.com/VoltAgent/awesome-openclaw-skills", "\u94fe\u63a5", { size: 18 }), r({ size: 18, color: "888888" })]),
      p([r("[\u2713] andrej-karpathy-skills 67,000+ stars", { size: 18 }), r(" \u2014 \u706b\u5c71\u5f15\u64ce, 2026.4.23, ", { size: 18, color: "888888" }), link("https://developer.volcengine.com/articles/7631766499817652278", "\u94fe\u63a5", { size: 18 }), r({ size: 18, color: "888888" })]),
      p([r("[\u2713] awesome-3D-gaussian-splatting 8,500+ stars", { size: 18 }), r(" \u2014 GitHub, 2026.4, ", { size: 18, color: "888888" }), link("https://github.com/MrNeRF/awesome-3D-gaussian-splatting", "\u94fe\u63a5", { size: 18 }), r({ size: 18, color: "888888" })]),
      p([r("[\u2713] 3DGS \u7efc\u8ff0\u8bba\u6587", { size: 18 }), r(" \u2014 arXiv 2401.03890, \u6d59\u6c5f\u5927\u5b66, 2024.1", { size: 18, color: "888888" })]),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("C:\\Users\\Lenovo\\Desktop\\星辰超级智能体的工作空间\\Awesome-Gaussian-Skills\\ClawHub有13000个Skill但没有一个是给3D研究人员发布的文章.docx", buffer);
  console.log("DOCX generated successfully!");
});
