// ========== АНИМАЦИЯ ПРИ СКРОЛЛЕ и появлении элемента на экране ==========

// Функция для отслеживания появления элементов
const observeElements = (selector, className) => {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                observer.unobserve(entry.target); // Отключаем наблюдение после запуска
            }
        });
    }, {
        threshold: 0.5 // Элемент считается видимым, когда 50% его площади на экране
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Запускаем анимацию для карточек
document.addEventListener('DOMContentLoaded', () => {
    observeElements('.activity__card', 'activity__card--animated');
});