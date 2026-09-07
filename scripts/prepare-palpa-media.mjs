import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Requires the supplied PALPA source package; normal builds use the public outputs.
const root = fileURLToPath(new URL('../', import.meta.url));
const source = join(root, 'docs/portfolio-source/PALPA/source-media');
const destination = join(root, 'public/projects/palpa');
const tokens = readFileSync(join(root, 'src/styles/tokens.css'), 'utf8');
const token = (name) => {
  const value = tokens.match(new RegExp('--' + name + ':\\s*([^;]+);'))?.[1].trim();
  if (!value) throw new Error('Missing portfolio token: ' + name);
  return value;
};
const files = [
  'palpa-demo.mp4', 'palpa-demo-poster.webp', 'palpa-demo.ko.vtt',
  'palpa-feedback.mp4', 'palpa-feedback-poster.webp', 'palpa-feedback.ko.vtt',
  'palpa-motion-example.mp4', 'palpa-motion-poster.webp', 'palpa-motion-example.ko.vtt',
  'palpa-teaching.webp', 'palpa-teaching-jog.webp', 'palpa-teaching-waypoints.webp',
  'palpa-speed.webp', 'palpa-speed-settings.webp', 'palpa-result.webp',
];
const diagrams = ['palpa-control-flow.svg', 'palpa-motion-lead.svg', 'palpa-motion-policy.svg'];
const palette = {
  '#f7f9fa': token('paper'), '#142028': token('ink'), '#596b75': token('muted'),
  '#14796a': token('rust'), '#d7e0e4': token('line'), '#b4c4cb': token('line'),
  '#d5ff40': token('line'), '#eaf4f0': token('soft'), '#eff8d5': token('soft'),
  '#edf5eb': token('soft'), '#e7ecef': token('line'), white: token('paper'),
};
mkdirSync(destination, { recursive: true });
for (const file of files) copyFileSync(join(source, file), join(destination, file));
for (const file of diagrams) {
  const svg = readFileSync(join(source, file), 'utf8')
    .replace(/(fill|stroke)="(#[0-9a-f]{6}|white)"/gi, (_match, attr, color) => {
      const replacement = palette[color.toLowerCase()];
      if (!replacement) throw new Error('Unmapped color: ' + color);
      return attr + '="' + replacement + '"';
    })
    .replace(/font-family="[^"]+"/g, 'font-family="' + token('font-sans').replace(/\s+/g, ' ') + '"')
    .replace(/rx="[^"]+"/g, 'rx="0"');
  writeFileSync(join(destination, file), svg);
}
console.log('Prepared ' + (files.length + diagrams.length) + ' PALPA assets; photos, videos and captions unchanged.');
