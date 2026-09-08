import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Run after changing the supplied source package. Production builds use public files.
const root = fileURLToPath(new URL('../', import.meta.url));
const source = join(root, 'docs/portfolio-source/automatic-fueling-robot/source-media');
const destination = join(root, 'public/projects/automatic-fueling-robot');
const manifest = JSON.parse(readFileSync(join(source, 'media-manifest.json'), 'utf8'));
const assets = manifest.assets;
if (assets.length !== 11) throw new Error('Expected 9 core assets and 2 posters.');
// Validate the complete bundle before replacing any existing public assets.
for (const asset of assets) {
  if (!/^[a-z0-9-]+\.(mp4|webp|svg)$/.test(asset.filename)) throw new Error('Invalid media filename.');
  const bytes = readFileSync(join(source, asset.filename));
  const hash = createHash('sha256').update(bytes).digest('hex');
  if (asset.status !== 'generated-and-reviewed' || bytes.length !== asset.bytes || hash !== asset.sha256) {
    throw new Error('Source manifest mismatch: ' + asset.filename);
  }
}
mkdirSync(destination, { recursive: true });
for (const asset of assets) copyFileSync(join(source, asset.filename), join(destination, asset.filename));
console.log('Copied 11 verified Automatic Fueling Robot assets without cropping or re-encoding.');