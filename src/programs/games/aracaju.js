import { createWindow } from '../../modules/windowFactory.js';

export function renderAracaju() {
    const winId = 'window-aracaju';
    const gameUrl = 'https://gtavc.armdev.cn/';
 
    const content = `
        <div class="aracaju-container">
            <div class="aracaju-viewport">
                <div id="aracaju-cover" class="aracaju-cover">
                    
                    <div class="aracaju-top-title">Grand Theft Auto</div>
                    
                    <div class="aracaju-logo">Vice City</div>
                    
                    <div class="aracaju-loading-box">
                        <button class="aracaju-btn-start" id="btn-start-aracaju">START GAME</button>
                        <div style="color: #888; font-family: 'Impact'; font-size: 18px; opacity: 0.5;">OPTIONS</div>
                        <div style="color: #888; font-family: 'Impact'; font-size: 18px; opacity: 0.5;">QUIT GAME</div>
                    </div>

                    <div class="aracaju-credits">© 1998-2002 Rockstar North & JM-WORKS Inc</div>
                </div>
                
                <iframe 
                    id="aracaju-frame" 
                    class="aracaju-iframe" 
                    src="" 
                    allowfullscreen 
                    tabindex="0" 
                    scrolling="no"
                    sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-presentation"
                ></iframe>
            </div>
        </div>
    `;

    createWindow({
        id: winId,
        title: 'GTA Vice City',
        content: content,
        isCentered: true
    });

    const win = document.getElementById(winId);
    if (!win) return;

    const btnStart = win.querySelector('#btn-start-aracaju');
    const iframe = win.querySelector('#aracaju-frame');
    const cover = win.querySelector('#aracaju-cover');

    const focusGame = () => {
        if (iframe.style.display === 'block') {
            iframe.focus();
            if (iframe.contentWindow) {
                iframe.contentWindow.focus();
            }
        }
    };

    btnStart.addEventListener('click', () => {
        cover.style.display = 'none';
        iframe.src = gameUrl;
        iframe.style.display = 'block';
        setTimeout(focusGame, 100);
    });

    win.addEventListener('mousedown', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            setTimeout(focusGame, 50);
        }
    });

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const isOpen = win.classList.contains('open');

                if (isOpen) {
                    console.log("Aracaju restaurado...");
                    setTimeout(focusGame, 300); 
                } else {
                    const taskbarBtn = document.getElementById(`btn-${winId}`);
                    if (!taskbarBtn) {
                        console.log("Aracaju encerrado.");
                        iframe.src = ""; 
                        iframe.style.display = 'none';
                        cover.style.display = 'flex';
                    }
                }
            }
        });
    });
    
    observer.observe(win, { attributes: true });
}