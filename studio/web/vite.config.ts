import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import fs from 'fs';

// Serve the project-root docs/ directory at /docs/ during dev
function serveDocs() {
  return {
    name: 'serve-docs',
    configureServer(server: any) {
      server.middlewares.use('/docs', (req: any, res: any, next: any) => {
        const urlPath = decodeURIComponent(req.url || '/');
        // Strip query string
        const cleanPath = urlPath.split('?')[0];
        const docsRoot = path.resolve(__dirname, '../../docs');
        let filePath = path.join(docsRoot, cleanPath);

        // If directory, try index.html
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
          filePath = path.join(filePath, 'index.html');
        }
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          // Set content type based on extension
          const ext = path.extname(filePath).toLowerCase();
          const types: Record<string, string> = {
            '.html': 'text/html; charset=utf-8',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
          };
          res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
          fs.createReadStream(filePath).pipe(res);
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [vue(), serveDocs()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:10590',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
