// Элементы
const siteMapBtn = document.getElementById('siteMapBtn');
const siteMapPanel = document.getElementById('siteMapPanel');
const siteMapOverlay = document.getElementById('siteMapOverlay');
const siteMapClose = document.getElementById('siteMapClose');

// Функция открытия карты сайта
function openSiteMap() {
    siteMapPanel.classList.add('open');
    siteMapOverlay.classList.add('open');
}

// Функция закрытия карты сайта
function closeSiteMap() {
    siteMapPanel.classList.remove('open');
    siteMapOverlay.classList.remove('open');
}

// Открытие по клику на три полоски
siteMapBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openSiteMap();
});

// Закрытие по крестику
siteMapClose.addEventListener('click', closeSiteMap);

// Закрытие по клику на затемнение
siteMapOverlay.addEventListener('click', closeSiteMap);

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteMapPanel.classList.contains('open')) {
        closeSiteMap();
    }
});