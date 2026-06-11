import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/gensite/' : '/',
  server: {
    allowedHosts: ['grape.ru.tuna.am', 'gensite.ru.tuna.am', 'localhost'],
  },
}))
