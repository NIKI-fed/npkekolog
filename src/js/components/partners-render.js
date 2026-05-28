// =============Рендер карточек с партнёрами=============

import { partners } from '../data/partners.js';

function renderGalleryPartners() {
    const container = document.querySelector('.gallery-page__partners');
    const data = partners;

    if (!container) return;
    if (!data.length) return;   

    const partnersHTML = data.map(item => `

        <div class="gallery-card">
            <div class="gallery-card__image gallery-card__image-small">
                <img src="${item.img}" alt="${item.alt}">
            </div>
        </div>

    `).join('');

    container.innerHTML = partnersHTML;

}

// Автоматический запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', renderGalleryPartners);
