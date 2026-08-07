/**
 * Exporters — real serialization of in-memory Gaussians to standard formats.
 *
 * PLY:  binary_little_endian, standard 3DGS property layout
 *       (x,y,z, nx..nz, f_dc_0..2, f_rest_0..44, opacity, scale_0..2, rot_0..3).
 *       Activations are inverted so the file is loadable by any 3DGS tool:
 *       opacity → logit, scale → log, SH DC → (color-0.5)/SH_C0.
 * SPLAT: compact 32-bytes-per-splat format (positions f32×3, scales f32×3,
 *        rgba u8×4, quaternion u8×4) used by antimatter15/splat & gsplat.js.
 */

import type { Gaussian } from './types.js';

const SH_C0 = 0.28209479177387814;

/** Inverse sigmoid (logit) — 3DGS PLY stores opacity as logits. */
function logit(o: number): number {
  const c = Math.min(1 - 1e-6, Math.max(1e-6, o));
  return Math.log(c / (1 - c));
}

function normalizeQuat(q: number[]): [number, number, number, number] {
  const len = Math.sqrt(q[0] ** 2 + q[1] ** 2 + q[2] ** 2 + q[3] ** 2) || 1;
  return [q[0] / len, q[1] / len, q[2] / len, q[3] / len];
}

/**
 * Serialize Gaussians to a standard 3DGS binary PLY buffer.
 * Higher-order SH coefficients are not stored in memory, so f_rest_* are 0.
 */
export function toPlyBuffer(gaussians: Gaussian[]): Buffer {
  const props = [
    'x', 'y', 'z', 'nx', 'ny', 'nz',
    'f_dc_0', 'f_dc_1', 'f_dc_2',
    ...Array.from({ length: 45 }, (_, i) => `f_rest_${i}`),
    'opacity',
    'scale_0', 'scale_1', 'scale_2',
    'rot_0', 'rot_1', 'rot_2', 'rot_3',
  ];
  const header =
    'ply\nformat binary_little_endian 1.0\n' +
    `element vertex ${gaussians.length}\n` +
    props.map((p) => `property float ${p}`).join('\n') +
    '\nend_header\n';

  const headerBuf = Buffer.from(header, 'ascii');
  const stride = props.length * 4;
  const dataBuf = Buffer.alloc(gaussians.length * stride);

  gaussians.forEach((g, i) => {
    const off = i * stride;
    let p = 0;
    const w = (v: number) => { dataBuf.writeFloatLE(v, off + (p++ * 4)); };
    w(g.position[0]); w(g.position[1]); w(g.position[2]);
    w(0); w(0); w(0); // normals unused
    // SH DC from stored RGB
    w((g.color[0] - 0.5) / SH_C0);
    w((g.color[1] - 0.5) / SH_C0);
    w((g.color[2] - 0.5) / SH_C0);
    for (let k = 0; k < 45; k++) w(0); // f_rest (not stored in memory)
    w(logit(g.opacity));
    w(Math.log(Math.max(1e-8, g.scale[0])));
    w(Math.log(Math.max(1e-8, g.scale[1])));
    w(Math.log(Math.max(1e-8, g.scale[2])));
    const [rw, rx, ry, rz] = normalizeQuat([g.rotation[0], g.rotation[1], g.rotation[2], g.rotation[3]]);
    w(rw); w(rx); w(ry); w(rz);
  });

  return Buffer.concat([headerBuf, dataBuf]);
}

/**
 * Serialize Gaussians to the compact .splat format (32 bytes per splat).
 */
export function toSplatBuffer(gaussians: Gaussian[]): Buffer {
  const buf = Buffer.alloc(gaussians.length * 32);
  gaussians.forEach((g, i) => {
    const off = i * 32;
    buf.writeFloatLE(g.position[0], off + 0);
    buf.writeFloatLE(g.position[1], off + 4);
    buf.writeFloatLE(g.position[2], off + 8);
    buf.writeFloatLE(g.scale[0], off + 12);
    buf.writeFloatLE(g.scale[1], off + 16);
    buf.writeFloatLE(g.scale[2], off + 20);
    buf.writeUInt8(Math.round(Math.min(1, Math.max(0, g.color[0])) * 255), off + 24);
    buf.writeUInt8(Math.round(Math.min(1, Math.max(0, g.color[1])) * 255), off + 25);
    buf.writeUInt8(Math.round(Math.min(1, Math.max(0, g.color[2])) * 255), off + 26);
    buf.writeUInt8(Math.round(Math.min(1, Math.max(0, g.opacity)) * 255), off + 27);
    const [rw, rx, ry, rz] = normalizeQuat([g.rotation[0], g.rotation[1], g.rotation[2], g.rotation[3]]);
    buf.writeUInt8(Math.round((rw + 1) * 127.5), off + 28);
    buf.writeUInt8(Math.round((rx + 1) * 127.5), off + 29);
    buf.writeUInt8(Math.round((ry + 1) * 127.5), off + 30);
    buf.writeUInt8(Math.round((rz + 1) * 127.5), off + 31);
  });
  return buf;
}
