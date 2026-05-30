// Функция проверки email (если заполнен)
export function isValidEmail(email) {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция получения цифр из телефона
export function getPhoneDigits(phone) {
    return phone.replace(/\D/g, '');
}

// Функция валидации конкретной формы
export function initFormValidation(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[type="tel"]');
    const emailInput = form.querySelector('input[type="email"]');
    const consentCheckbox = form.querySelector('input[type="checkbox"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    function validateForm() {
        const name = nameInput?.value.trim() || '';
        const phone = phoneInput?.value || '';
        const digits = getPhoneDigits(phone);
        const email = emailInput?.value.trim() || '';
        const isConsentChecked = consentCheckbox?.checked || false;
        
        const isValidName = name.length >= 2;
        const isValidPhone = digits.length === 11;
        const isValidEmailField = isValidEmail(email);
        const isFormValid = isValidName && isValidPhone && isValidEmailField && isConsentChecked;
        
        if (submitBtn) {
            submitBtn.disabled = !isFormValid;
        }
    }
    
    // Валидация имени
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            nameInput.classList.remove('input-error');
            validateForm();
        });
        nameInput.addEventListener('blur', () => {
            const name = nameInput.value.trim();
            if (name.length < 2 && name.length > 0) {
                nameInput.classList.add('input-error');
            } else {
                nameInput.classList.remove('input-error');
            }
            validateForm();
        });
    }
    
    // Валидация email
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            emailInput.classList.remove('input-error');
            validateForm();
        });
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            if (email && !isValidEmail(email)) {
                emailInput.classList.add('input-error');
            } else {
                emailInput.classList.remove('input-error');
            }
            validateForm();
        });
    }
    
    // Валидация чекбокса
    if (consentCheckbox) {
        consentCheckbox.addEventListener('change', validateForm);
    }
    
    // Валидация телефона
    if (phoneInput) {
        phoneInput.addEventListener('blur', validateForm);
        phoneInput.addEventListener('input', validateForm);
    }
    
    validateForm();
}