import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = join(root, 'docs/portfolio-source/turtlebot4/source-media');
const destination = join(root, 'public/projects/turtlebot4');
const tokens = readFileSync(join(root, 'src/styles/tokens.css'), 'utf8');
const token = (name) => {
  const value = tokens.match(new RegExp('--' + name + ':\\s*([^;]+);'))?.[1].trim();
  if (!value) throw new Error('Missing portfolio token: ' + name);
  return value;
};
const palette = {
  '#f5f7f2': token('paper'),
  '#183e35': token('ink'),
  '#52685f': token('muted'),
  '#237357': token('rust'),
  '#356b9a': token('ink'),
  '#9a5a1b': token('rust'),
  '#d5dfd5': token('line'),
  '#edf5ef': token('soft'),
  '#e7eee5': token('soft'),
  '#f6ddb7': token('soft'),
  '#f3f4f0': token('soft'),
  '#fff7e9': token('soft'),
  '#eadac0': token('line'),
};
const binaryFiles = [
  'demo-32s.mp4', 'hero-poster.webp', 'target-localization.webp',
  'robot-proximity.mp4', 'robot-proximity-poster.webp',
  'tf-log.webp', 'rviz-context.webp',
];
mkdirSync(destination, { recursive: true });
for (const file of binaryFiles) copyFileSync(join(source, file), join(destination, file));
for (const file of ['herding-geometry.svg', 'localization-flow.svg', 'mission-flow.svg']) {
  // Change presentation attributes only; marker IDs, coordinates and copy stay intact.
  const svg = readFileSync(join(source, file), 'utf8')
    .replace(/(fill|stroke)="(#[0-9a-f]{6})"/gi, (_match, attribute, color) => {
      if (!palette[color.toLowerCase()]) throw new Error('Unmapped diagram color: ' + color);
      return attribute + '="' + palette[color.toLowerCase()] + '"';
    })
    .replace(/font-family="[^"]+"/g, 'font-family="' + token('font-sans') + '"')
    .replace(/rx="[^"]+"/g, 'rx="0"');
  writeFileSync(join(destination, file), svg);
  if (file === 'herding-geometry.svg') {
    // Isolate the existing geometry panel for the responsive two-column page.
    writeFileSync(join(destination, 'herding-geometry-detail.svg'), svg.replace(
      'width="1440" height="1040" viewBox="0 0 1440 1040"',
      'width="796" height="705" viewBox="48 160 796 705"',
    ));
  }
}
console.log('Prepared 11 TurtleBot4 assets: 7 unchanged media files and 4 portfolio-styled SVGs.');
