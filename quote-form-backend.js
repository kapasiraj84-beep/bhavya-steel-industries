// Backend API Configuration - Using FormSubmit.co for direct Google Sheets integration
// This sends data to Google Sheets AND emails you automatically
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/kapasiraj84@gmail.com';

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
    const formData = new FormData();
    formData.append('Name', document.getElementById('name').value.trim());
    formData.append('Email', document.getElementById('email').value.trim());
    formData.append('Phone', document.getElementById('phone').value.trim());
    formData.append('Company', document.getElementById('company').value.trim());
    formData.append('Product', document.getElementById('product').value);
    formData.append('Quantity', document.getElementById('quantity').value.trim());
    formData.append('Unit', document.getElementById('unit').value);
    formData.append('Message', document.getElementById('message').value.trim());
    formData.append('_subject', 'New Quote Request - ' + document.getElementById('product').value);
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    
    try {
        // Send to FormSubmit
        const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Success
            successMessage.querySelector('p').textContent = 'Quote request submitted successfully! We will contact you soon.';
            successMessage.classList.add('show');
            
            // Reset form
            document.getElementById('quoteForm').reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Track conversion (optional - for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'quote_submission', {
                    'event_category': 'engagement',
                    'event_label': document.getElementById('product').value
                });
            }
        } else {
            // Error from API
            throw new Error(result.message || 'Failed to submit quote request');
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