import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const config = {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 8000,
      proxy: {
        '/api': {target: process.env.VITE_API_ENDPOINT ? process.env.VITE_API_ENDPOINT: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },  
      },
      
      },
  };
  return defineConfig(config);
};

