/**
 * Voice intent mapper + argument validation tests.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { mapVoiceIntent, listVoiceIntents } from '../dist/voice-intent.js';
import {
  ValidationError, asString, asNumber, asVec3, resolveSafePath,
} from '../dist/validate.js';

test('voice intent mapper covers all documented patterns', () => {
  const intents = listVoiceIntents();
  assert.equal(intents.length, 40, `expected 40 intent rules (23 core + 8 sculpting + 9 slat), got ${intents.length}`);
  for (const i of intents) {
    assert.ok(i.intent && i.tools.length > 0, `intent ${i.intent} missing tools`);
  }
});

test('voice intent mapper matches camera / export utterances', () => {
  const r1 = mapVoiceIntent('show the scene from above');
  assert.equal(r1.matched, true);

  const r2 = mapVoiceIntent('export this scene as ply');
  assert.equal(r2.matched, true);
  assert.ok(r2.toolCalls.some((t) => t.tool === 'export_result'));

  const r3 = mapVoiceIntent('asdf qwer totally unrelated');
  assert.equal(r3.matched, false);
});

test('asString validates required/enum', () => {
  assert.equal(asString({ a: 'x' }, 'a'), 'x');
  assert.throws(() => asString({}, 'a', { required: true }), ValidationError);
  assert.throws(() => asString({ a: 'z' }, 'a', { enum: ['x', 'y'] }), ValidationError);
  assert.throws(() => asString({ a: 5 }, 'a'), ValidationError);
});

test('asNumber enforces range and default', () => {
  assert.equal(asNumber({ n: 3 }, 'n', { min: 1, max: 5 }), 3);
  assert.equal(asNumber({}, 'n', { default: 7 }), 7);
  assert.throws(() => asNumber({ n: 9 }, 'n', { max: 5 }), ValidationError);
  assert.throws(() => asNumber({ n: NaN }, 'n'), ValidationError);
});

test('asVec3 requires numeric triples', () => {
  assert.deepEqual(asVec3({ v: [1, 2, 3] }, 'v'), [1, 2, 3]);
  assert.throws(() => asVec3({ v: [1, 2] }, 'v'), ValidationError);
  assert.throws(() => asVec3({ v: [1, 'a', 3] }, 'v'), ValidationError);
});

test('resolveSafePath blocks path traversal', () => {
  const root = '/tmp/allowed';
  const result = resolveSafePath('/tmp/allowed/scene.ply', [root]).replace(/\\/g, '/');
  assert.ok(result.endsWith('tmp/allowed/scene.ply'), `expected path ending with tmp/allowed/scene.ply, got ${result}`);
  assert.throws(() => resolveSafePath('/etc/passwd', [root]), ValidationError);
  assert.throws(() => resolveSafePath('/tmp/allowed/../etc/passwd', [root]), ValidationError);
});
