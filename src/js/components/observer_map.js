// ============ АНИМАЦИЯ МАРКЕРОВ НА КАРТЕ ============

function initMarkersAnimation() {
    // Находим контейнер с картой
    const mapContainer = document.querySelector('.objects__map');
    if (!mapContainer) return;

    // Находим все маркеры
    const markers = document.querySelectorAll('.object_marker');
    if (markers.length === 0) return;

    let isAnimated = false; // Флаг, чтобы анимация не повторялась

    // Временно отключаем анимацию у всех маркеров
    markers.forEach(marker => {
        marker.style.animation = 'none';
        marker.style.opacity = '0';
    });

    // Создаём наблюдатель
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isAnimated) {
                isAnimated = true;
                // Возвращаем анимацию маркерам
                markers.forEach(marker => {
                    marker.style.animation = '';
                    marker.style.opacity = '';
                });
                // Отключаем наблюдение после первого срабатывания
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 1 // Когда 30% блока видно на экране
    });

    // Начинаем наблюдение за контейнером с картой
    observer.observe(mapContainer);
}

// Запускаем после загрузки страницы
document.addEventListener('DOMContentLoaded', initMarkersAnimation);