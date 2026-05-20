// ---------- СЛАЙДЕР ХЕДЕРА ----------
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('heroTrack');
    const slides = document.querySelectorAll('.hero__slide');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');

    // если слайдера нет, выходим из функции
    if (!track) return; 
    
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let autoInterval = null;
    let isTransitioning = false;
    const slideCount = slides.length;
    
    // Показать слайд
    function showSlide(index, instant = false) {
        if (isTransitioning && !instant) return;
        
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;
        
        currentIndex = index;
        isTransitioning = !instant;
        
        if (instant) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    function nextSlide() {
        if (isTransitioning) return;
        showSlide(currentIndex + 1);
        resetAutoPlay();
    }
    
    function prevSlide() {
        if (isTransitioning) return;
        showSlide(currentIndex - 1);
        resetAutoPlay();
    }
    
    // Drag
    function handleDragStart(e) {
        if (isTransitioning) return;
        isDragging = true;
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        track.style.transition = 'none';
        stopAutoPlay();
    }
    
    function handleDragMove(e) {
        if (!isDragging) return;
        const moveX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const diff = moveX - startX;
        const percent = -currentIndex * 100 + (diff / track.offsetWidth) * 100;
        track.style.transform = `translateX(${percent}%)`;
    }
    
    function handleDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.type === 'mouseup' ? e.clientX : (e.changedTouches ? e.changedTouches[0].clientX : 0);
        const diff = endX - startX;
        const threshold = track.offsetWidth * 0.15;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        } else {
            showSlide(currentIndex);
        }
        
        resetAutoPlay();
    }
    
    // Автопрокрутка
    function startAutoPlay() {
        if (autoInterval) clearInterval(autoInterval);
        autoInterval = setInterval(() => {
            if (!isDragging && !isTransitioning) {
                nextSlide();
            }
        }, 10000);
    }
    
    function stopAutoPlay() {
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
    }
    
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // Обработчики
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    if (track) {
        track.addEventListener('mousedown', handleDragStart);
        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);
        
        track.addEventListener('touchstart', handleDragStart);
        window.addEventListener('touchmove', handleDragMove);
        window.addEventListener('touchend', handleDragEnd);
    }
    
    // Пауза при наведении
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', stopAutoPlay);
        hero.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Показываем первый слайд сразу
    showSlide(0, true);
    
    // Запускаем автопрокрутку
    startAutoPlay();
});