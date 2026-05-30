// ========== КОМПОНЕНТЫ (сами навешивают обработчики) ==========
import './components/site-map.js';
import './components/hero-slider.js';
import './components/observer-animation.js';
import './components/subsection-list.js';
import './components/viewer.js';
import './components/copy-to-clipboard.js';

// Рендеры (сами запускаются при импорте)
import './components/projects-render.js';
import './components/patents-render.js';
import './components/gallery-render.js';
import './components/partners-render.js';

// ========== МОДУЛИ (требуют вызова) ==========
import './modules/modal.js';
import './modules/cookies.js';

// Формы (экспортируют функции, нужно вызывать)
import { initPhoneMask } from './modules/phone-mask.js';
import { initFormValidation } from './modules/form-validation.js';
import { initFormSubmit } from './modules/form-submit.js';

// ========== ИНИЦИАЛИЗАЦИЯ ФОРМ ==========
// Модальная форма (в модальном окне)
initPhoneMask('callback-form');
initFormValidation('callback-form');
initFormSubmit('callback-form', 'modal-body', 'modal-success');

// Форма в подвале (на каждой странице)
initPhoneMask('footer-custom-form');
initFormValidation('footer-custom-form');
initFormSubmit('footer-custom-form', 'modal-body', 'modal-success');