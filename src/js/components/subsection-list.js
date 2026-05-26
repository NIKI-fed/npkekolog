// Подсветка активного пункта в боковом меню раздела "О компании"

// Функция для получения чистого пути страницы
function getCurrentPage() {
    // Получаем текущий адрес
    let path = window.location.pathname;
    // console.log(window.location)
    
    // Убираем .html в конце, если есть
    path = path.replace('.html', '');
    
    // Убираем index.html, если есть
    path = path.replace('/index.html', '/');
    
    return path;
}

// Функция для выделения активного пункта меню
function highlightActiveLink() {
    // Находим все пункты меню
    const menuItems = document.querySelectorAll('.subsection__list-item');
    
    // Получаем текущую страницу
    const currentPage = getCurrentPage();
    
    // Перебираем все пункты меню
    menuItems.forEach(item => {
        // Находим ссылку внутри пункта
        const link = item.querySelector('a');
        if (!link) return;
        
        // Получаем адрес из ссылки
        let linkPath = link.getAttribute('href');
        linkPath = linkPath.replace('.html', '');
        
        // Сравниваем: совпадает ли адрес ссылки с текущей страницей?
        if (linkPath === currentPage) {
            // Добавляем класс для подсветки
            item.classList.add('subsection__list-active');
        }
    });
}

// Запускаем скрипт после загрузки страницы
document.addEventListener('DOMContentLoaded', highlightActiveLink);