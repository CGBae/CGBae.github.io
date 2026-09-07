import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Requires the locally supplied DUM-E source package; normal builds use public assets.
const root = fileURLToPath(new URL('../', import.meta.url));
const source = join(root, 'docs/portfolio-source/DUME/source-media');
const destination = join(root, 'public/projects/dume');
const tokens = readFileSync(join(root, 'src/styles/tokens.css'), 'utf8');
const token = (name) => {
  const value = tokens.match(new RegExp('--' + name + ':\\s*([^;]+);'))?.[1].trim();
  if (!value) throw new Error('Missing portfolio token: ' + name);
  return value;
};
const videos = ['demo-highlight', 'demo-full', 'context-fetch', 'inspection-context', 'take-from-hand'];
const images = ['manual-page-009.webp', 'manual-step04-detail.webp', 'inspection-detail.webp', 'request-to-handover.webp'];
const diagrams = ['manual-context.svg', 'task-state-provenance.svg', 'assessment-state.svg', 'robot-inspection.svg', 'step-context-fix.svg'];
const palette = {
  '#09171d': token('paper'),
  '#10262d': token('soft'),
  '#17343b': token('soft'),
  '#27464d': token('line'),
  '#76dfc4': token('rust'),
  '#a1babd': token('muted'),
  '#e8c07d': token('rust'),
  '#ecf4f2': token('ink'),
};
mkdirSync(destination, { recursive: true });
const unchanged = [...images, ...videos.flatMap((name) => [name + '.mp4', name + '-poster.webp', name + '.ko.vtt'])];
for (const file of unchanged) copyFileSync(join(source, file), join(destination, file));
for (const file of diagrams) {
  const svg = readFileSync(join(source, file), 'utf8')
    .replace(/(fill|stroke)="(#[0-9a-f]{6})"/gi, (_match, attribute, color) => {
      const replacement = palette[color.toLowerCase()];
      if (!replacement) throw new Error('Unmapped color: ' + color);
      return attribute + '="' + replacement + '"';
    })
    .replace(/text\{font-family:[^}]+\}/, 'text{font-family:' + token('font-sans') + '}')
    .replace(/rx="[^"]+"/g, 'rx="0"');
  writeFileSync(join(destination, file), svg);
}
console.log('Prepared ' + (unchanged.length + diagrams.length) + ' DUM-E assets; original media unchanged.');
