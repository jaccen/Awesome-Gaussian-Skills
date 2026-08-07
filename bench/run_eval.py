"""
bench/run_eval.py — 竞技场评测运行器（本地可复现）

用法：
  python3 bench/run_eval.py \
      --method 3DGS --iterations 30000 \
      --renders path/to/rendered --gt path/to/ground_truth \
      --dataset mipnerf360 --gpu "RTX 3090"

约定：
  - renders/ 与 gt/ 下按相同文件名配对（*.png）
  - 输出追加一条带完整来源标注的 leaderboard 记录到 stdout（JSON），
    人工核验后并入 bench/leaderboard.json
  - 本地实测 = [S] 来源；必须记录 GPU、迭代数、eval_impl 版本，保证可复现
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from metrics import psnr, ssim, lpips, EVAL_IMPL_VERSION  # noqa: E402


def load_image(path: Path):
    try:
        import imageio.v2 as imageio
        return imageio.imread(str(path))
    except ImportError:
        from PIL import Image
        import numpy as np
        return np.asarray(Image.open(path).convert("RGB"))


def pair_files(renders: Path, gt: Path):
    gt_map = {p.name: p for p in gt.iterdir() if p.suffix.lower() in {".png", ".jpg"}}
    pairs = []
    for r in sorted(renders.iterdir()):
        if r.suffix.lower() in {".png", ".jpg"} and r.name in gt_map:
            pairs.append((r, gt_map[r.name]))
    return pairs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--method", required=True)
    ap.add_argument("--iterations", type=int, required=True)
    ap.add_argument("--renders", required=True)
    ap.add_argument("--gt", required=True)
    ap.add_argument("--dataset", required=True)
    ap.add_argument("--gpu", default="unknown")
    ap.add_argument("--commit", default="")
    args = ap.parse_args()

    pairs = pair_files(Path(args.renders), Path(args.gt))
    if not pairs:
        print("ERROR: no matching render/GT pairs found", file=sys.stderr)
        sys.exit(1)

    psnrs, ssims, lpipss = [], [], []
    for rp, gp in pairs:
        pred, gt = load_image(rp), load_image(gp)
        psnrs.append(psnr(pred, gt))
        ssims.append(ssim(pred, gt))
        l = lpips(pred, gt)
        if l is not None:
            lpipss.append(l)

    entry = {
        "method": args.method,
        "iterations": args.iterations,
        "dataset": args.dataset,
        "scene_count": len(pairs),
        "psnr": round(sum(psnrs) / len(psnrs), 2),
        "ssim": round(sum(ssims) / len(ssims), 4),
        "lpips": round(sum(lpipss) / len(lpipss), 4) if lpipss else None,
        "source": "S",  # 服务器/本地实测
        "gpu": args.gpu,
        "eval_impl": EVAL_IMPL_VERSION,
        "commit": args.commit,
        "note": "local reproduction via bench/run_eval.py",
    }
    print(json.dumps(entry, ensure_ascii=False, indent=2))
    print("\n# 核验无误后，将该条目追加到 bench/leaderboard.json 的 results 数组。", file=sys.stderr)


if __name__ == "__main__":
    main()
