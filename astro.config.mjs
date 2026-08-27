import { defineConfig } from 'astro/config';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserSite = repository?.toLowerCase().endsWith('.github.io');
const inferredBase = repository && !isUserSite ? `/${repository}` : '/';

export default defineConfig({
  output: 'static',
  site: process.env.PUBLIC_SITE_URL ?? 'https://CGBae.github.io',
  base: process.env.PUBLIC_BASE_PATH ?? inferredBase,
  build: {
    format: 'directory',
  },
});
