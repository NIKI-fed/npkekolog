export function initCopyButtons() {
    const copyElements = document.querySelectorAll('.copyable');
    
    copyElements.forEach(element => {
        // Убираем старый обработчик, если есть
        const oldHandler = element._clickHandler;

        if (oldHandler) {
            element.removeEventListener('click', oldHandler);
        }
        
        // Создаём новый обработчик
        const clickHandler = async (e) => {
            e.stopPropagation();
            
            const textToCopy = element.dataset.copy;

            if (!textToCopy) return;
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Добавляем класс копирования
                element.classList.add('copied');
                
                setTimeout(() => {
                    element.classList.add('copying-fade');
                }, 500);
                
                setTimeout(() => {
                    element.classList.remove('copied');
                    element.classList.remove('copying-fade');
                }, 1200);
                
            } catch (err) {
                console.error('Ошибка копирования: ', err);
                // Быстрая обратная связь при ошибке
                element.style.backgroundColor = 'rgba(255, 107, 107, 0.3)';
                setTimeout(() => {
                    element.style.backgroundColor = '';
                }, 500);
            }
        };
        
        element._clickHandler = clickHandler;
        element.addEventListener('click', clickHandler);
    });
}

// Запускаем после загрузки DOM
document.addEventListener('DOMContentLoaded', initCopyButtons);