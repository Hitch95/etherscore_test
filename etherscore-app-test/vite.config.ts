import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    https: {
      key: './etherscore-test.com.key.pem',
      cert: './etherscore-test.com.pem',
    },
    host: 'localhost',
    port: 5173,
  }
});
