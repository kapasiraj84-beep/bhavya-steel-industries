/**
 * BHAVYA STEEL INDUSTRIES - VISITOR TRACKING
 * Tracks who visits, what they view, how long they stay
 * Sends data to Google Sheets automatically
 */

(function() {
    'use strict';
    
    // PASTE YOUR WEB APP URL HERE (from Apps Script deployment)
    const SHEET_URL = 'YOUR_DEPLOYMENT_URL_HERE';
    
    // Track session start time
    const sessionStart = Date.now();
    let pageStartTime = Date.now();
    
    // Generate session ID
    const sessionId = 'S' + Date.now().toString(36).toUpperCase();
    
    // Collect visitor data
    function getVisitorData() {
        return {
            type: 'visitor',
            pageUrl: window.location.href,
            pageTitle: document.title,
            referrer: document.referrer || 'Direct',
            userAgent: navigator.userAgent,
            deviceType: getDeviceType(),
            browser: getBrowser(),
            screenSize: screen.width + 'x' + screen.height,
            location: 'India', // Can be enhanced with IP geolocation
            timeOnPage: Math.round((Date.now() - pageStartTime) / 1000),
            buttonClicked: '',
            sessionId: sessionId
        };
    }
    
    // Detect device type
    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'Tablet';
        }
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'Mobile';
        }
        return 'Desktop';
    }
    
    // Detect browser
    function getBrowser() {
        const ua = navigator.userAgent;
        if (ua.indexOf('Firefox') > -1) return 'Firefox';
        if (ua.indexOf('SamsungBrowser') > -1) return 'Samsung Browser';
        if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) return 'Opera';
        if (ua.indexOf('Trident') > -1) return 'Internet Explorer';
        if (ua.indexOf('Edge') > -1) return 'Edge';
        if (ua.indexOf('Chrome') > -1) return 'Chrome';
        if (ua.indexOf('Safari') > -1) return 'Safari';
        return 'Other';
    }
    
    // Send data to Google Sheets
    function sendToSheet(data) {
        // Check if URL is configured
        if (SHEET_URL === 'YOUR_DEPLOYMENT_URL_HERE') {
            console.log('📊 Analytics (Local Mode):', data);
            console.log('⚠️ Configure SHEET_URL in analytics-tracker.js to enable tracking');
            return;
        }
        
        // Send to Google Apps Script
        fetch(SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            console.log('✅ Visitor tracked');
        }).catch(err => {
            console.log('❌ Analytics error:', err);
        });
    }
    
    // Track page view on load
    function trackPageView() {
        const data = getVisitorData();
        sendToSheet(data);
        console.log('📊 Page view tracked:', data.pageTitle);
    }
    
    // Track time on page when user leaves
    window.addEventListener('beforeunload', function() {
        const data = getVisitorData();
        data.timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
        
        // Use sendBeacon for reliable tracking on page unload
        if (navigator.sendBeacon && SHEET_URL !== 'YOUR_DEPLOYMENT_URL_HERE') {
            navigator.sendBeacon(SHEET_URL, JSON.stringify(data));
        } else {
            sendToSheet(data);
        }
        
        console.log('⏱️ Time on page:', data.timeOnPage, 'seconds');
    });
    
    // Track button/link clicks
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a, button');
        if (!target) return;
        
        const text = target.textContent.trim();
        const href = target.href || '';
        
        // Track important CTA clicks
        if (text.includes('Enquiry') || 
            text.includes('WhatsApp') || 
            text.includes('Call') ||
            text.includes('Quote') ||
            href.includes('wa.me') ||
            href.includes('tel:')) {
            
            const data = getVisitorData();
            data.buttonClicked = text || 'Link Click';
            sendToSheet(data);
            
            console.log('🎯 CTA Click:', text);
        }
    });
    
    // Track scroll depth (optional - tracks if user scrolled to bottom)
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
        maxScroll = Math.max(maxScroll, scrollPercent);
        
        // Track if user reached bottom
        if (scrollPercent > 90 && maxScroll < 91) {
            console.log('📜 User scrolled to bottom');
        }
    });
    
    // Initialize tracking when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trackPageView);
    } else {
        trackPageView();
    }
    
    // Expose analytics object for debugging
    window.BhavyaAnalytics = {
        getSessionId: () => sessionId,
        getVisitorData: getVisitorData,
        trackEvent: (eventName) => {
            const data = getVisitorData();
            data.buttonClicked = eventName;
            sendToSheet(data);
        }
    };
    
})();
