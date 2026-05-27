// =============Рендер карточек с объектами=============

import { projects } from '../data/projects.js';

function renderProjects() {
    const container = document.querySelector('.projects__grid');
    if (!container) return;

    const projectsHTML = projects.map(item => `
        <div class="projects__card">
            <div class="projects__card-image">
                <img src="${item.img}" alt="${item.alt}">
            </div>
            <div class="projects__card-content">
                <div class="projects__card-object">
                    <img src="/assets/icons/geomarker.svg" alt="Локация" class="projects__card-icon">
                    ${item.object}
                </div>
                <div class="projects__card-power">
                    <span>${item.power}</span> ${item.powerDesc}<br>
                    ${item.equipment}
                </div>
                <div class="projects__card-year">
                    <img src="/assets/icons/calendar.svg" alt="Год" class="projects__card-icon">
                    ${item.year}
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = projectsHTML;
}

// Автоматический запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', renderProjects);