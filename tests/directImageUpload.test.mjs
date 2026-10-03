import test from 'node:test';
import assert from 'node:assert/strict';
import { uploadImagesDirectly } from '../src/api/Admin/ProductManagement/directImageUpload.js';

test('uploads GIF bytes without auth headers and registers only after all uploads', async () => {
  const files = [{ type: 'image/gif', size: 12 }, { type: 'image/png', size: 20 }];
  const calls = [];
  let index = 0;
  const result = await uploadImagesDirectly({
    files,
    requestUploadUrl: async (contentType) => {
      calls.push(['sign', contentType]);
      return { uploadUrl: `https://test.example/${index}`, imageKey: `key-${index++}` };
    },
    fetchFile: async (url, options) => {
      calls.push(['put', url]);
      assert.equal(options.method, 'PUT');
      assert.equal(options.credentials, 'omit');
      assert.deepEqual(Object.keys(options.headers), ['Content-Type']);
      assert.equal(options.headers['Content-Type'], options.body.type);
      assert.ok(files.includes(options.body));
      return { ok: true };
    },
    registerImageKeys: async (keys) => {
      calls.push(['register', keys]);
      return 'registered';
    },
  });
  assert.equal(result, 'registered');
  assert.deepEqual(calls.map(([action]) => action), ['sign', 'put', 'sign', 'put', 'register']);
  assert.deepEqual(calls.at(-1)[1], ['key-0', 'key-1']);
});

test('failed S3 upload never registers keys', async () => {
  let registered = false;
  await assert.rejects(uploadImagesDirectly({
    files: [{ type: 'image/gif', size: 12 }],
    requestUploadUrl: async () => ({ uploadUrl: 'https://test.example', imageKey: 'key' }),
    fetchFile: async () => ({ ok: false }),
    registerImageKeys: async () => { registered = true; },
  }));
  assert.equal(registered, false);
});

test('invalid image is rejected before URL requests', async () => {
  let requested = false;
  await assert.rejects(uploadImagesDirectly({
    files: [{ type: 'text/plain', size: 12 }],
    requestUploadUrl: async () => { requested = true; },
    registerImageKeys: async () => {},
  }));
  assert.equal(requested, false);
});
