// Bhavya Steel Industries - Simple Visitor Tracker
// Tracks: Who visits, what they view, how long they stay

(function() {
    'use strict';
    
    // STEP 1: Deploy google-apps-script.js as Web App
    // STEP 2: Paste deployment URL below
    const SHEET_URL = 'YOUR_DEPLOYMENT_URL_HERE';
    
    let startTime = Date.now();
    let visitorData = {
        type: 'visitor',
        pageUrl: window.location.href,
        pagePath: window.location.pathname,
        pageTitle: document.title,
        referrer: document.referrer || 'Direct',
        userAgent: navigator.userAgent,
        deviceType: getDeviceType(),
        browser: getBrowser(),
        timeOnPage: 0
    };
    
    // Detect device type
    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad)/i.test(ua)) return 'Tablet';
        if (/Mobile|Android|iPhone/i.test(ua)) return 'Mobile';
        return 'Desktop';
    }
    
    // Detect browser
    function getBrowser() {
        const ua = navigator.userAgent;
        if (ua.indexOf('Firefox') > -1) return 'Firefox';
        if (ua.indexOf('Chrome') > -1) return 'Chrome';
        if (ua.indexOf('Safari') > -1) return 'Safari';
        if (ua.indexOf('Edge') > -1) return 'Edge';
        return 'Other';
    }
    
    // Send data to Google Sheets
    function sendToSheet(data) {
        if (SHEET_URL === 'YOUR_DEPLOYMENT_URL_HERE') {
            console.log('📊 Visitor tracked (local):', data);
            return;
        }
        
        fetch(SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).catch(err => console.log('Analytics error:', err));
    }
    
    // Track page view on load
    sendToSheet(visitorData);
    
    // Track time on page when leaving
    window.addEventListener('beforeunload', function() {
        visitorData.timeOnPage = Math.round((Date.now() - startTime) / 1000);
        sendToSheet(visitorData);
    });
    
    // Track button clicks
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a, button');
        if (!target) return;
        
        const text = target.textContent.trim();
        if (text.includes('Enquiry') || text.includes('WhatsApp') || text.includes('Call')) {
            const clickData = {...visitorData, buttonClicked: text};
            sendToSheet(clickData);
        }
    });
    
})();
