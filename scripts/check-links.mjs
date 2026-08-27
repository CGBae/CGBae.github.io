import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = fileURLToPath(new URL('../dist/', import.meta.url));

if (!existsSync(distDir)) {
  console.error('dist/가 없습니다. 먼저 npm run build를 실행하세요.');
  process.exit(1);
}

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserSite = repository?.toLowerCase().endsWith('.github.io');
const inferredBase = repository && !isUserSite ? `/${repository}` : '/';
const configuredBase = process.env.PUBLIC_BASE_PATH ?? inferredBase;
const base = configuredBase === '/' ? '' : `/${configuredBase.replace(/^\/+|\/+$/g, '')}`;

function collectHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    return entry.isDirectory()
      ? collectHtmlFiles(fullPath)
      : entry.name.endsWith('.html')
        ? [fullPath]
        : [];
  });
}

function routeForHtml(filePath) {
  const relativePath = relative(distDir, filePath).split(sep).join('/');
  if (relativePath === 'index.html') return '/';
  return `/${relativePath.replace(/index\.html$/, '')}`;
}

function fileForPath(urlPath) {
  let localPath = decodeURIComponent(urlPath);
  if (base && localPath.startsWith(`${base}/`)) localPath = localPath.slice(base.length);
  if (base && localPath === base) localPath = '/';

  const clean = localPath.replace(/^\/+/, '');
  if (!clean || localPath.endsWith('/')) return join(distDir, clean, 'index.html');
  if (extname(clean)) return join(distDir, clean);
  return join(distDir, clean, 'index.html');
}

const failures = [];
const htmlFiles = collectHtmlFiles(distDir);

for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, 'utf8');
  const currentRoute = `${base}${routeForHtml(htmlFile)}`;
  const attributes = html.matchAll(/(?:href|src)=(['"])(.*?)\1/g);

  for (const [, , value] of attributes) {
    if (
      !value ||
      /^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/.test(value)
    ) {
      continue;
    }

    const resolved = new URL(value, `https://local.test${currentRoute}`);
    const targetFile = value.startsWith('#') ? htmlFile : fileForPath(resolved.pathname);

    if (!existsSync(targetFile)) {
      failures.push(`${routeForHtml(htmlFile)} → ${value}`);
      continue;
    }

    if (resolved.hash && targetFile.endsWith('.html')) {
      const id = decodeURIComponent(resolved.hash.slice(1));
      const targetHtml = readFileSync(targetFile, 'utf8');
      const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const idPattern = new RegExp(`id=(['"])${escapedId}\\1`);
      if (!idPattern.test(targetHtml)) failures.push(`${routeForHtml(htmlFile)} → ${value} (anchor)`);
    }
  }
}

if (failures.length) {
  console.error('깨진 내부 링크 또는 자산 경로를 찾았습니다:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Internal link check passed (${htmlFiles.length} HTML routes, base: ${base || '/'}).`);
