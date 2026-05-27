// =============Рендер карточек с патентами=============
import { viewImage } from './viewer.js';
import { patents } from '../data/patents.js';

function renderGalleryPatents() {
    const container = document.querySelector('.gallery-page__patents');

    if (!container) return;

    const patentsHTML = patents.map(item => `

        <div class="gallery-card">
            <div class="gallery-card__image">
                <img src="${item.img}" alt="${item.alt}">
            </div>
            <div class="gallery-card__info">
                <div class="gallery-card__number">${item.number || ''}</div>
                <div class="gallery-card__title">${item.title || ''}</div>
                <div class="gallery-card__date">${item.date || ''}</div>
            </div>
        </div>

    `).join('');

    container.innerHTML = patentsHTML;

    viewImage(); //после отрисовки карточек запускаем просмотрщик
}

// Автоматический запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', renderGalleryPatents);
