import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/portfolio/",
  plugins: [react()],
  optimizeDeps: {
    include: [
      'gsap',
      'gsap/ScrollTrigger',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/rapier',
      '@react-three/postprocessing',
      'react-fast-marquee',
      'react-icons/fi',
      'react-icons/md',
    ],
  },
})
