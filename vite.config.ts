// vite.config.ts
import path from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    glsl({
      defaultExtension: 'glsl',
      include: ['**/*.glsl', '**/*.vs', '**/*.fs', '**/*.vert', '**/*.frag'],
    }),
  ],
  resolve: {
    alias: {
      // Root and common folders
      '@app': path.resolve(__dirname, 'src/app'),
      '@features': path.resolve(__dirname, 'src/app/features'),
      '@shared': path.resolve(__dirname, 'src/app/features/shared'),

      // Feature-specific folders
      '@camera': path.resolve(__dirname, 'src/app/features/camera'),
      '@earth': path.resolve(__dirname, 'src/app/features/earth'),
      '@halo': path.resolve(__dirname, 'src/app/features/halo'),
      '@mars': path.resolve(__dirname, 'src/app/features/mars'),
      '@prominence': path.resolve(__dirname, 'src/app/features/prominence'),
      '@starfield': path.resolve(__dirname, 'src/app/features/starfield'),
      '@sun': path.resolve(__dirname, 'src/app/features/sun'),

      // Components
      '@components': path.resolve(__dirname, 'src/components'),
      '@common': path.resolve(__dirname, 'src/components/common'),
      '@core3d': path.resolve(__dirname, 'src/components/core-3d'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),

      // Utilities and hooks
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/shared/utils'),
      '@mathUtils': path.resolve(__dirname, 'src/shared/utils/mathUtils'),
      '@shaderUtils': path.resolve(__dirname, 'src/shared/utils/shaderUtils'),

      // Assets, styles, and shaders
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@shaders': path.resolve(__dirname, 'src/app/features/*/shaders'),

      // State and types
      '@state': path.resolve(__dirname, 'src/app/state'),
      '@types': path.resolve(__dirname, 'src/types'),

      // i18n
      '@i18n': path.resolve(__dirname, 'src/i18n'),

      '@textures': path.resolve(__dirname, 'public/assets/textures'),
    },
  },
});
