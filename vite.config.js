import { defineConfig } from 'vite'
import htmlInclude from 'vite-plugin-html-include'

export default defineConfig({
    plugins: [htmlInclude()],
    root: 'src',
    server: {
        open: true,  // ← автоматом откроет браузер при запуске
        // open: '/technologies/'  // ← откроет технологии
        // browser: 'chrome'  // или 'firefox', 'edge'
    },
    publicDir: '../public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: 'src/index.html',
                
                consent: 'src/legal/consent.html',
                cookies: 'src/legal/cookies.html',
                privacy: 'src/legal/privacy.html',

                technologies: 'src/technologies/index.html',
                equipment: 'src/equipment/index.html',
                services: 'src/services/index.html',
                objects: 'src/objects/index.html',
                about: 'src/about/index.html',
            }
        }
    }
})