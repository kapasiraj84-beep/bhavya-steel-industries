// Backend API Configuration - DUAL SYSTEM
// 1. FormSubmit sends email to kapasiraj84@gmail.com
// 2. Apps Script sends data to Google Sheets
const EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/kapasiraj84@gmail.com';
const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzUIBBfgI2LcSjscTxxJj4FXO_sZU4COfYYkW10XjIW6fPCXdofTjF5M-ccCLiaFy4v/exec';

// Form submission handler
document.getElementById('quoteForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    
    // Hide previous messages
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        company: document.getElementById('company').value.trim(),
        product: document.getElementById('product').value,
        quantity: document.getElementById('quantity').value.trim(),
        unit: document.getElementById('unit').value,
        message: document.getElementById('message').value.trim()
    };
    
    try {
        // Send to Google Sheets (PRIMARY)
        const sheetResponse = await fetch(SHEET_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            redirect: 'follow'
        });
        
        const sheetResult = await sheetResponse.json();
        
        if (!sheetResponse.ok || !sheetResult.success) {
            throw new Error(sheetResult.message || 'Failed to save to Google Sheets');
        }
        
        // Also send email notification (SECONDARY - don't fail if this fails)
        try {
            const emailFormData = new FormData();
            emailFormData.append('Name', formData.name);
            emailFormData.append('Email', formData.email);
            emailFormData.append('Phone', formData.phone);
            emailFormData.append('Company', formData.company);
            emailFormData.append('Product', formData.product);
            emailFormData.append('Quantity', formData.quantity);
            emailFormData.append('Unit', formData.unit);
            emailFormData.append('Message', formData.message);
            emailFormData.append('_subject', 'New Quote Request - ' + formData.product);
            emailFormData.append('_template', 'table');
            emailFormData.append('_captcha', 'false');
            
            await fetch(EMAIL_ENDPOINT, {
                method: 'POST',
                body: emailFormData,
                headers: {
                    'Accept': 'application/json'
                }
            });
        } catch (emailError) {
            console.log('Email notification failed (non-critical):', emailError);
        }
        
        // Success
        successMessage.querySelector('p').textContent = sheetResult.message || 'Quote request submitted successfully! We will contact you soon.';
        successMessage.classList.add('show');
        
        // Reset form
        document.getElementById('quoteForm').reset();
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Track conversion (optional - for analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'quote_submission', {
                'event_category': 'engagement',
                'event_label': formData.product
            });
        }
        
    } catch (error) {
        console.error('Quote submission error:', error);
        errorMessage.querySelector('p').textContent = error.message || 'Failed to submit quote request. Please try again or contact us directly.';
        errorMessage.classList.add('show');
        
        // Scroll to error message
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Quote Request';
    }
});

// Phone number formatting (Indian format)
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// Real-time validation
const validateField = (field, validator, errorMsg) => {
    const value = field.value.trim();
    const errorElement = field.parentElement.querySelector('.field-error');
    
    if (!validator(value)) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMsg;
            errorElement.classList.add('show');
        }
        return false;
    } else {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        return true;
    }
};

// Email validation
document.getElementById('email').addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validateField(this, (val) => emailRegex.test(val), 'Please enter a valid email address');
});

// Phone validation
document.getElementById('phone').addEventListener('blur', function() {
    const phoneRegex = /^[6-9]\d{9}$/;
    validateField(this, (val) => phoneRegex.test(val), 'Please enter a valid 10-digit phone number');
});

// Name validation
document.getElementById('name').addEventListener('blur', function() {
    validateField(this, (val) => val.length >= 2, 'Name must be at least 2 characters');
});

// Product validation
document.getElementById('product').addEventListener('change', function() {
    validateField(this, (val) => val !== '', 'Please select a product');
});