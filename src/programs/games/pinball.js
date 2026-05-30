import { createWindow } from '../../modules/windowFactory.js';

export function renderPinball() {
    const winId = 'window-pinball';
    const gameUrl = 'https://mastercodewolf.github.io/3DPinballSpaceCadet/';

    const content = `
        <div class="pinball-container">
            <div class="pinball-viewport">
                <div id="pinball-cover" class="pinball-cover">
                    <div class="pinball-logo">3D PINBALL</div>
                    <div class="pinball-subtitle">Space Cadet Edition - ZezinOS 98 SE</div>

                    <div class="pinball-loading-box" style="margin-top: 20px;">
                        <span style="color:#0f0; font-family:'Courier New', monospace; font-weight:bold;">C:\\GAMES\\PINBALL&gt;</span>
                        <button class="pinball-btn-launch" id="btn-start-pinball">LAUNCH.EXE</button>
                        <span style="color:#0f0; animation: blink 1s infinite;">_</span>
                    </div>

                    <div class="pinball-credits">Memory: 16384K OK</div>
                </div>

                <iframe
                    id="pinball-frame"
                    class="pinball-iframe"
                    src=""
                    allowfullscreen
                    tabindex="0"
                    sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-presentation"
                ></iframe>
            </div>
        </div>
    `;

    createWindow({
        id: winId,
        title: '3D Pinball',
        content: content,
        isCentered: true
    });

    const win = document.getElementById(winId);
    if (!win) return;

    const btnStart = win.querySelector('#btn-start-pinball');
    const iframe = win.querySelector('#pinball-frame');
    const cover = win.querySelector('#pinball-cover');
    const desktopArea = document.querySelector('.desktop-area');

    const focusGame = () => {
        if (iframe.style.display === 'block') {
            iframe.focus();
            if (iframe.contentWindow) iframe.contentWindow.focus();
        }
    };

    const onDesktopMousedown = () => {
        if (iframe.style.display === 'block') {
            iframe.style.pointerEvents = 'none';
        }
    };
    const onDocumentMouseup = () => {
        iframe.style.pointerEvents = '';
    };

    if (desktopArea) {
        desktopArea.addEventListener('mousedown', onDesktopMousedown);
        document.addEventListener('mouseup', onDocumentMouseup);
    }

    const globalFocusGuard = (e) => {
        if (iframe.style.display !== 'block') return;
        if (win.contains(e.target)) return;
        setTimeout(focusGame, 50);
    };
    document.addEventListener('mousedown', globalFocusGuard, true);

    win.addEventListener('mousedown', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            setTimeout(focusGame, 50);
        }
    });

    btnStart.addEventListener('click', () => {
        cover.style.display = 'none';
        iframe.src = gameUrl;
        iframe.style.display = 'block';
        setTimeout(focusGame, 100);
    });

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName !== 'class') return;

            const isOpen = win.classList.contains('open');
            if (isOpen) {
                setTimeout(focusGame, 300);
            } else {
                const taskbarBtn = document.getElementById(`btn-${winId}`);
                if (!taskbarBtn) {
                    document.removeEventListener('mousedown', globalFocusGuard, true);
                    if (desktopArea) {
                        desktopArea.removeEventListener('mousedown', onDesktopMousedown);
                        document.removeEventListener('mouseup', onDocumentMouseup);
                    }
                    iframe.src = '';
                    iframe.style.display = 'none';
                    iframe.style.pointerEvents = '';
                    cover.style.display = 'flex';
                }
            }
        });
    });

    observer.observe(win, { attributes: true });
}