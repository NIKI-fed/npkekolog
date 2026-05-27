export function viewImage() {
    const viewer = document.getElementById('imageViewer');
    const viewerImage = document.getElementById('viewerImage');
    const viewerCaption = document.getElementById('viewerCaption');
    const viewerOverlay = document.getElementById('viewerOverlay');
    const viewerClose = document.getElementById('viewerClose');

    if (!viewer) return;

    // Функция открытия
    function openViewer(imageSrc, caption) {
        viewerImage.src = imageSrc;
        viewerCaption.textContent = caption || '';
        viewer.classList.add('open');
        // document.body.style.overflow = 'hidden';
    }

    // Функция закрытия
    function closeViewer() {
        viewer.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Навешиваем обработчики на все карточки галереи
    const cards = document.querySelectorAll('.gallery-card');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {

            e.stopPropagation();

            // Находим изображение внутри карточки
            const img = card.querySelector('.gallery-card__image img');
            if (!img) return;

            // Собираем информацию для подписи
            const number = card.querySelector('.gallery-card__number');
            const title = card.querySelector('.gallery-card__title');
            const date = card.querySelector('.gallery-card__date');

            // Формируем подпись
            let caption = '';
            if (number) caption += number.innerText;
            if (title) caption += (caption ? ' — ' : '') + title.innerText;
            if (date) caption += (caption ? ' | ' : '') + date.innerText;
            
            openViewer(img.src, caption);
            
        });
    });

    // Закрытие по крестику
    viewerClose.addEventListener('click', closeViewer);
    
    // Закрытие по клику на оверлей
    viewerOverlay.addEventListener('click', closeViewer);
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && viewer.classList.contains('open')) {
            closeViewer();
        }
    });
};

viewImage()