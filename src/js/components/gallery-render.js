// =============Рендер карточек с наградами=============

import { awards } from '../data/awards.js';
import { reviews } from '../data/reviews.js';

import { viewImage } from './viewer.js';

// Проверяем, какая страница с галереей открыта, и подтягиваем нужные данные
function getData() {
    const path = window.location.pathname;

    if (path.includes('awards')) return awards;
    if (path.includes('reviews')) return reviews;
    return [];
}

function renderGallery() {
    const data = getData()
    const container = document.querySelector('.gallery-page__gallery');

    if (!container) return;
    if (!data.length) return;   

    const galleryHTML = data.map(item => `

        <div class="gallery-card">
            <div class="gallery-card__image gallery-card__image-bg">
                <img src="${item.img}" alt="${item.alt}">
            </div>
        </div>

    `).join('');

    container.innerHTML = galleryHTML;

    viewImage(); //после отрисовки карточек запускаем просмотрщик
}

// Автоматический запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', renderGallery);
