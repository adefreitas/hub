import react from '@vitejs/plugin-react-swc';
import relay from 'vite-plugin-relay';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [relay, react()],
    server: {
        port: 3001,
        // hmr: true,
    },
    root: 'dev',
});
