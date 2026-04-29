import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import relay from 'vite-plugin-relay';

export default defineConfig({
    plugins: [
        relay,
        react(),
        {
            name: 'custom-headers',
            configureServer(server) {
                server.middlewares.use((_req, res, next) => {
                    res.setHeader('cross-origin-opener-policy', 'same-origin');
                    next();
                });
            },
        },
    ],
    resolve: {
        dedupe: ['react', 'react-dom', 'react-hook-form'],
    },
    server: {
        port: 3001,
        headers: {
            'cross-origin-opener-policy': 'same-origin',
        },
    },
});
