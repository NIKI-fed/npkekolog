// Рендер карточек с объектами

import { projects } from '../data/projects.js';

function renderProjects() {
    const container = document.querySelector('.projects__grid');
    if (!container) return;

    const projectsHTML = projects.map(project => `
        <div class="projects__card">
            <div class="projects__card-image">
                <img src="${project.img}" alt="${project.alt}">
            </div>
            <div class="projects__card-content">
                <div class="projects__card-object">
                    <img src="/assets/icons/geomarker.svg" alt="Локация" class="projects__card-icon">
                    ${project.object}
                </div>
                <div class="projects__card-power">
                    <span>${project.power}</span> ${project.powerDesc}<br>
                    ${project.equipment}
                </div>
                <div class="projects__card-year">
                    <img src="/assets/icons/calendar.svg" alt="Год" class="projects__card-icon">
                    ${project.year}
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = projectsHTML;
}

// Автоматический запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', renderProjects);