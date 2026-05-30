export function initPhoneMask(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const phoneInput = form.querySelector('input[type="tel"]');
    if (!phoneInput) return;
    
    phoneInput.addEventListener('focus', () => {
        if (!phoneInput.value) {
            phoneInput.value = '+7 (';
        }
    });
    
    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value === '+7 (') {
            phoneInput.value = '';
        }
        const digits = phoneInput.value.replace(/\D/g, '');
        if (digits.length !== 11 && digits.length > 0) {
            phoneInput.classList.add('input-error');
        } else {
            phoneInput.classList.remove('input-error');
        }
    });
    
    phoneInput.addEventListener('input', () => {
        phoneInput.classList.remove('input-error');
    });
    
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value;
        
        if (!value.startsWith('+7')) {
            value = '+7' + value.replace(/[^\d]/g, '');
        }
        
        let digits = value.slice(2).replace(/\D/g, '');
        if (digits.length > 10) digits = digits.slice(0, 10);
        
        let formatted = '+7 (';
        if (digits.length > 0) formatted += digits.slice(0, 3);
        if (digits.length >= 4) formatted += ') ' + digits.slice(3, 6);
        if (digits.length >= 7) formatted += '-' + digits.slice(6, 8);
        if (digits.length >= 9) formatted += '-' + digits.slice(8, 10);
        
        e.target.value = formatted.trim();
    });
    
    phoneInput.addEventListener('keydown', (e) => {
        const key = e.key;
        const cursorPos = e.target.selectionStart;
        
        if (key === 'Delete' || key === 'Backspace') return;
        if (!/^\d$/.test(key)) {
            e.preventDefault();
            return;
        }
        if (key === '7' && cursorPos === 4) {
            e.preventDefault();
            return;
        }
    });
}