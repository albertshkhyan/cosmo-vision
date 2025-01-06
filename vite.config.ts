// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';
import path from 'path';
import { fileURLToPath } from 'url';

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
      // Common folders
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@scenes': path.resolve(__dirname, 'src/scenes'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@shaders': path.resolve(__dirname, 'src/shaders'),
      '@state': path.resolve(__dirname, 'src/state'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),

      // Optionally alias subfolders in @components for easier importing:
      '@common': path.resolve(__dirname, 'src/components/common'),
      '@core3d': path.resolve(__dirname, 'src/components/core-3d'),
      '@threeD': path.resolve(__dirname, 'src/components/threeD'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
    },
  },
});
