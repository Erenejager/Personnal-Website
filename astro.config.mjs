import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://azizghariani.xyz',
  output: 'static',
  build: {
    format: 'directory',
  },
});
