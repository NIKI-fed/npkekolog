import { defineConfig } from 'vite'
import htmlInclude from 'vite-plugin-html-include'

export default defineConfig({
    //base: '/test/',  // только для теста на хостинге, чтобы обращения к файлам шли в папку npkekolog/test на хостинге, а не в корневую папку
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
                // Главная
                main: 'src/index.html',
                
                // Технологии и подстраницы
                technologies: 'src/technologies/index.html',
                'technologies-disinfection': 'src/technologies/disinfection.html',
                'technologies-water-treatment': 'src/technologies/water-treatment.html',
                'technologies-wastewater-treatment': 'src/technologies/wastewater-treatment.html',
                'technologies-pools': 'src/technologies/pools.html',
                'technologies-biofouling': 'src/technologies/biofouling.html',
                
                // Оборудование и подстраницы
                equipment: 'src/equipment/index.html',
                'equipment-electrolysis': 'src/equipment/electrolysis.html',
                'equipment-pumps': 'src/equipment/pumps.html',
                'equipment-tanks': 'src/equipment/tanks.html',
                'equipment-wastewater': 'src/equipment/wastewater.html',
                
                // Услуги и подстраницы
                services: 'src/services/index.html',
                'services-development': 'src/services/development.html',
                'services-design': 'src/services/design.html',
                'services-installation': 'src/services/installation.html',
                'services-maintenance': 'src/services/maintenance.html',
                
                // О компании и подстраницы
                about: 'src/about/index.html',
                'about-contacts': 'src/about/contacts.html',
                'about-patents': 'src/about/patents.html',
                'about-awards': 'src/about/awards.html',
                'about-reviews': 'src/about/reviews.html',
                'about-partners': 'src/about/partners.html',
                'about-details': 'src/about/details.html',
                'about-additions': 'src/about/additions.html',

                // Выполненные проекты
                projects: 'src/projects/index.html',

                // Юридические страницы
                consent: 'src/legal/consent.html',
                cookies: 'src/legal/cookies.html',
                privacy: 'src/legal/privacy.html',
            }
        }
    }
})