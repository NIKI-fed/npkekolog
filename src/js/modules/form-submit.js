import { getPhoneDigits, isValidEmail } from './form-validation.js';

export function initFormSubmit(formId, modalBodyId, modalSuccessId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const modalBody = modalBodyId ? document.getElementById(modalBodyId) : null;
    const modalSuccess = modalSuccessId ? document.getElementById(modalSuccessId) : null;
    const modal = document.getElementById('modal');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = form.querySelector('input[name="name"]');
        const phoneInput = form.querySelector('input[type="tel"]');
        const emailInput = form.querySelector('input[type="email"]');
        const consentCheckbox = form.querySelector('input[type="checkbox"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        const name = nameInput?.value.trim() || '';
        const phone = phoneInput?.value || '';
        const digits = getPhoneDigits(phone);
        const email = emailInput?.value.trim() || '';
        const isConsentChecked = consentCheckbox?.checked || false;
        
        if (name.length < 2 || digits.length !== 11 || !isValidEmail(email) || !isConsentChecked) {
            if (phoneInput && digits.length !== 11) {
                phoneInput.classList.add('input-error');
                phoneInput.focus();
            }
            if (nameInput && name.length < 2) {
                nameInput.classList.add('input-error');
                if (!phoneInput || digits.length === 11) nameInput.focus();
            }
            if (emailInput && email && !isValidEmail(email)) {
                emailInput.classList.add('input-error');
            }
            return;
        }
        
        phoneInput?.classList.remove('input-error');
        nameInput?.classList.remove('input-error');
        emailInput?.classList.remove('input-error');

        // Получаем текущий URL страницы
        const pageUrl = window.location.href;
        
        const formData = new FormData(form);
        formData.append('form_type', formId);
        formData.append('page_url', pageUrl);

        // =========АДРЕС БЭКА=========

        const BACKEND_URL = '/send-mail.php';

        // ===========================
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
        }
        
        try {
            const response = await fetch(BACKEND_URL, { method: 'POST', body: formData });
            const result = await response.json();
            
            if (response.ok && result.success) {
                // Открываем модальное окно и показываем успех
                if (modal) modal.classList.add('active');
                if (modalBody) modalBody.style.display = 'none';
                if (modalSuccess) modalSuccess.style.display = 'flex';
                if (submitBtn) submitBtn.textContent = 'Отправить';
                
                form.reset();
                if (phoneInput) phoneInput.value = '';
                
                // Триггерим валидацию для обновления кнопки
                if (nameInput) nameInput.dispatchEvent(new Event('input'));
                if (consentCheckbox) consentCheckbox.dispatchEvent(new Event('change'));
                if (phoneInput) phoneInput.dispatchEvent(new Event('input'));

                return
            } else {
                alert(result.message || 'Ошибка отправки. Попробуйте позже.');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Отправить';
                }
            }
        } catch (error) {
            alert('Ошибка соединения. Проверьте интернет.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить';
            }
        }
    });
}