import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://19cashj.github.io',
  base: '/',
  integrations: [react(), markdoc(), keystatic()],
});