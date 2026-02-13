import { createWindow } from '../../modules/windowFactory.js';

export function renderDosGames() {
    const winId = 'window-dosgames';
    const gameUrl = 'https://dosdeck.com/';

    const content = `
        <div class="dosgames-container">
            <div class="dosgames-viewport">
                <div id="dosgames-cover" class="dosgames-cover">
                    <div class="dosgames-logo">MS-DOS GAMES</div>
                    <div class="dosgames-subtitle">System Version 6.22 - ZezinOS 98 SE Edition</div>
                    
                    <div class="dosgames-loading-box" style="margin-top: 20px;">
                        <span style="color:#0f0; font-family:'Courier New', monospace; font-weight:bold;">C:\\GAMES&gt;</span>
                        
                        <button class="dosgames-btn-start" id="btn-start-dosgames">RUN.EXE</button>
                        
                        <span style="color:#0f0; animation: blink 1s infinite;">_</span>
                    </div>

                    <div class="dosgames-credits">Memory: 16384K OK</div>
                </div>
                
                <iframe id="dosgames-frame" class="dosgames-iframe" src="" allowfullscreen tabindex="0"></iframe>
            </div>
        </div>
    `;

    createWindow({
        id: winId,
        title: 'MS-DOS GAMES',
        content: content,
        isCentered: true
    });

    const win = document.getElementById(winId);
    if (!win) return;

    const btnStart = win.querySelector('#btn-start-dosgames');
    const iframe = win.querySelector('#dosgames-frame');
    const cover = win.querySelector('#dosgames-cover');

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
                    console.log("DOS Games restaurado...");
                    setTimeout(focusGame, 300); 
                } else {
                    const taskbarBtn = document.getElementById(`btn-${winId}`);
                    if (!taskbarBtn) {
                        console.log("DOS Games encerrado.");
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