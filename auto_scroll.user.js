// ==UserScript==
// @name         Auto Scroll
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Scroll down the page automatically
// @author       Talented Bug
// @match        *://linux.do/*
// @grant        none
// ==/UserScript==

// Remember to set site match to what you need, or you may start scrolling once hitting "s" :)

(function() {
    'use strict';

    let isScrolling = false;
    let scrollInterval = null;
    // Modify these constants to have a different rate
    const SCROLL_SPEED = 5; // Pixels per interval
    const SCROLL_INTERVAL = 20; // Milliseconds between each scroll

    // Function to handle scrolling
    function autoScroll() {
        if (isScrolling) {
            // Simply continue scrolling regardless of the current position
            window.scrollBy(0, SCROLL_SPEED);

            // Optional: Add a small delay if we're at the current bottom
            // This can help prevent excessive CPU usage while waiting for new content
            if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
                // Still scroll, just a bit slower when at the current bottom
                setTimeout(() => window.scrollBy(0, SCROLL_SPEED), 100);
            }
        }
    }

    // Function to start scrolling
    function startScrolling() {
        if (!isScrolling) {
            isScrolling = true;
            scrollInterval = setInterval(autoScroll, SCROLL_INTERVAL);
            console.log('Auto-scrolling started');
        }
    }

    // Function to stop scrolling
    function stopScrolling() {
        if (isScrolling) {
            isScrolling = false;
            clearInterval(scrollInterval);
            scrollInterval = null;
            console.log('Auto-scrolling stopped');
        }
    }

    // Add keyboard event listener
    document.addEventListener('keydown', function(event) {
        if (event.key.toLowerCase() === 's') {
            // Toggle scrolling state
            if (isScrolling) {
                stopScrolling();
            } else {
                startScrolling();
            }
        }
    });

    // Add visual indicator for scroll state (optional)
    const style = document.createElement('style');
    style.textContent = `
    .scroll-indicator {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        z-index: 9999;
        display: none;
    }
    `;
    document.head.appendChild(style);

    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.textContent = 'Auto-scrolling';
    document.body.appendChild(indicator);

    // Update indicator visibility
    function updateIndicator() {
        indicator.style.display = isScrolling ? 'block' : 'none';
    }

    // Add indicator update to our existing functions
    const originalStart = startScrolling;
    const originalStop = stopScrolling;

    startScrolling = function() {
        originalStart();
        updateIndicator();
    };

    stopScrolling = function() {
        originalStop();
        updateIndicator();
    };
})();
