// Google Sheets Integration
// This runs AFTER the email is sent successfully

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzUIBBfgI2LcSjscTxxJj4FXO_sZU4COfYYkW10XjIW6fPCXdofTjF5M-ccCLiaFy4v/exec';

async function sendToGoogleSheets(formData) {
    try {
        const data = {
            name: formData.get('Name'),
            email: formData.get('Email'),
            phone: formData.get('Phone'),
            company: formData.get('Company'),
            product: formData.get('Product'),
            quantity: formData.get('Quantity'),
            unit: formData.get('Unit'),
            message: formData.get('Message')
        };
        
        const response = await fetch(SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        console.log('Data sent to Google Sheets');
        return true;
    } catch (error) {
        console.error('Google Sheets error:', error);
        // Don't fail the form submission if sheets fails
        return false;
    }
}

// Export for use in main form
window.sendToGoogleSheets = sendToGoogleSheets;