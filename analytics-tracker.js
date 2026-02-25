// Bhavya Steel Industries - Website Analytics Tracker
// Tracks visitor data and sends to Google Sheets

(function() {
    'use strict';
    
    // Configuration
    const SHEET_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
    const TRACK_ENABLED = true;
    
    // Get visitor information
    function getVisitorData() {
        const data = {
            timestamp: new Date().toISOString(),
            pageUrl: window.location.href,
            pagePath: window.location.pathname,
            pageTitle: document.title,
            referrer: document.referrer || 'Direct',
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            language: navigator.language,
            platform: navigator.platform
        };
        
        // Detect device type
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            data.deviceType = 'Tablet';
        } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            data.deviceType = 'Mobile';
        } else {
            data.deviceType = 'Desktop';
        }
        
        // Detect browser
        if (ua.indexOf('Firefox') > -1) {
            data.browser = 'Firefox';
        } else if (ua.indexOf('Chrome') > -1) {
            data.browser = 'Chrome';
        } else if (ua.indexOf('Safari') > -1) {
            data.browser = 'Safari';
        } else if (ua.indexOf('Edge') > -1) {
            data.browser = 'Edge';
        } else {
            data.browser = 'Other';
        }
        
        return data;
    }
    
    // Track page view
    function trackPageView() {
        if (!TRACK_ENABLED) return;
        
        const data = getVisitorData();
        
        // Send to Google Sheets (when Apps Script is deployed)
        // fetch(SHEET_URL, {
        //     method: 'POST',
        //     mode: 'no-cors',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // }).catch(err => console.log('Analytics tracking error:', err));
        
        // Log to console for now
        console.log('📊 Page View Tracked:', data);
    }
    
    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        console.log('⏱️ Time on page:', timeOnPage, 'seconds');
    });
    
    // Track button clicks
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a, button');
        if (target) {
            const action = target.textContent.trim();
            const href = target.href || '';
            
            if (action.includes('Enquiry') || action.includes('WhatsApp') || action.includes('Call')) {
                console.log('🎯 CTA Click:', action, href);
            }
        }
    });
    
    // Initialize tracking
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trackPageView);
    } else {
        trackPageView();
    }
    
})();
