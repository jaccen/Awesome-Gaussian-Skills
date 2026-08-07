"""
bench/metrics.py — 评测指标实现（竞技场官方评估实现）

提供 PSNR / SSIM 的纯 numpy 实现，以及可选的 LPIPS（需要 torch + lpips 包）。
所有竞技场条目必须注明 eval_impl 版本，保证跨条目可比。

协议约定（与 references/benchmark-data.md 一致）：
  - SSIM 窗口大小 11（与 lpipsPyTorch/skimage 默认一致）
  - PSNR 基于 float64 计算，数据范围 [0,1]
  - 评估实现差异（如 lpipsPyTorch vs 标准 lpips）需在 leaderboard 条目中声明
"""
from __future__ import annotations

import numpy as np

EVAL_IMPL_VERSION = "bench-metrics/1.0.0"


def to_float(img: np.ndarray) -> np.ndarray:
    """Convert uint8/float image to float64 in [0, 1]."""
    if img.dtype == np.uint8:
        return img.astype(np.float64) / 255.0
    return img.astype(np.float64)


def psnr(pred: np.ndarray, gt: np.ndarray, data_range: float = 1.0) -> float:
    """Peak Signal-to-Noise Ratio (higher is better)."""
    p, g = to_float(pred), to_float(gt)
    mse = np.mean((p - g) ** 2)
    if mse <= 1e-12:
        return 100.0
    return float(10.0 * np.log10((data_range ** 2) / mse))


def _gaussian_kernel_1d(size: int = 11, sigma: float = 1.5) -> np.ndarray:
    coords = np.arange(size, dtype=np.float64) - (size - 1) / 2.0
    k = np.exp(-(coords ** 2) / (2 * sigma ** 2))
    return k / k.sum()


def ssim(pred: np.ndarray, gt: np.ndarray, window: int = 11) -> float:
    """Mean SSIM over channels (higher is better), window=11 default."""
    p, g = to_float(pred), to_float(gt)
    if p.ndim == 2:
        p, g = p[..., None], g[..., None]
    kernel = _gaussian_kernel_1d(window)
    kernel2d = np.outer(kernel, kernel)
    c1, c2 = (0.01 ** 2), (0.03 ** 2)

    vals = []
    for c in range(p.shape[2]):
        mu_p = _conv2d(p[..., c], kernel2d)
        mu_g = _conv2d(g[..., c], kernel2d)
        mu_p2, mu_g2, mu_pg = mu_p ** 2, mu_g ** 2, mu_p * mu_g
        sig_p = _conv2d(p[..., c] ** 2, kernel2d) - mu_p2
        sig_g = _conv2d(g[..., c] ** 2, kernel2d) - mu_g2
        sig_pg = _conv2d(p[..., c] * g[..., c], kernel2d) - mu_pg
        num = (2 * mu_pg + c1) * (2 * sig_pg + c2)
        den = (mu_p2 + mu_g2 + c1) * (sig_p + sig_g + c2)
        vals.append(float(np.mean(num / den)))
    return float(np.mean(vals))


def _conv2d(x: np.ndarray, k: np.ndarray) -> np.ndarray:
    """Valid 2D convolution via sliding windows (no scipy dependency)."""
    kh, kw = k.shape
    h, w = x.shape
    oh, ow = h - kh + 1, w - kw + 1
    if oh <= 0 or ow <= 0:
        raise ValueError(f"image {x.shape} smaller than kernel {k.shape}")
    out = np.zeros((oh, ow), dtype=np.float64)
    for i in range(kh):
        for j in range(kw):
            out += k[i, j] * x[i:i + oh, j:j + ow]
    return out


def lpips(pred: np.ndarray, gt: np.ndarray, net: str = "alex") -> float | None:
    """LPIPS (lower is better). Requires torch+lpips; returns None if unavailable."""
    try:
        import torch
        import lpips as lpips_pkg
    except ImportError:
        return None
    loss_fn = lpips_pkg.LPIPS(net=net)
    with torch.no_grad():
        a = torch.from_numpy(to_float(pred)).permute(2, 0, 1).unsqueeze(0).float() * 2 - 1
        b = torch.from_numpy(to_float(gt)).permute(2, 0, 1).unsqueeze(0).float() * 2 - 1
        return float(loss_fn(a, b).item())
