import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      port: 5000,
      proxy: {
        '/api': 'http://localhost:5000',
      },
      open: './',
    },
    plugins: [react()],
    define: {
      'process.env': {},
    },
    build: {
      outDir: 'dist',
    },
  };
});
