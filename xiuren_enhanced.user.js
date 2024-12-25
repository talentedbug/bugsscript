// ==UserScript==
// @name         Xiuren Enhanced
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  View member-only images on Xiuren
// @author       Talented Bug
// @homepage     https://github.com/talentedbug/bugsscript
// @match        *://xiurenwang.top/*.html
// @match        *://www.xiurenwang.cc/*.html
// @match        *://w2.xiuren.ee/*.html
// @match        *://xiuren123.com/*.html
// @match        *://vip.xiuren111.cc/*.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let currentImage = null;

    function showImage(url) {
        let viewer = document.getElementById('image-viewer');
        if (!viewer) {
            viewer = document.createElement('div');
            viewer.id = 'image-viewer';
            viewer.style.position = 'fixed';
            viewer.style.top = '0';
            viewer.style.left = '0';
            viewer.style.width = '100%';
            viewer.style.height = '100%';
            viewer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            viewer.style.display = 'flex';
            viewer.style.justifyContent = 'center';
            viewer.style.alignItems = 'center';
            viewer.style.zIndex = '10000';
            viewer.onclick = () => viewer.remove();
            document.body.appendChild(viewer);
        }
        viewer.innerHTML = `<img src="${url}" style="max-width: 90%; max-height: 90%;">`;
        currentImage = url;
    }

    function changeImage(delta) {
        if (!currentImage) return;
        const match = currentImage.match(/(\d+)(?=\.\w+$)/);
        if (match) {
            const number = parseInt(match[0], 10) + delta;
            const newUrl = currentImage.replace(/(\d+)(?=\.\w+$)/, number);
            showImage(newUrl);
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === '=') {
            const link = document.querySelector('a[href*="//ooo111.ka123.sbs/pic/"]');
            if (link) showImage(link.href);
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        } else if (e.key === 'Escape') {
            const viewer = document.getElementById('image-viewer');
            if (viewer) viewer.remove();
        }
    });
})();
