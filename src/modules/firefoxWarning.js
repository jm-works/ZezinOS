import { createWindow } from './windowFactory.js';

export function showFirefoxWarning() {
    if (!navigator.userAgent.includes('Firefox')) return Promise.resolve();

    const winId = 'window-firefox-warning';

    return new Promise((resolve) => {
        createWindow({
            id: winId,
            title: 'ZezinOS',
            isCentered: true,
            skipTaskbar: true,
            content: `
                <div style="font-family: var(--system-font); font-size: 11px;">
                    <div style="display: flex; gap: 12px; align-items: center; padding: 8px 4px 16px 4px;">
                        <img src="https://win98icons.alexmeub.com/icons/png/msg_warning-0.png"
                             width="32" height="32"
                             style="image-rendering: pixelated; flex-shrink: 0;">
                        <div style="line-height: 1.6;">
                            <p><b>Firefox.exe</b> has performed an illegal operation.</p>
                            <p>Some visual elements — such as scrollbars, borders, and the general vibe — may not render correctly.</p>
                            <br>
                            <p style="color: var(--win-blue);">Switch to any Chromium-based browser for the full experience. Yes, even <b>Edge</b>. We're not proud either.</p>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 6px; padding: 0 4px 2px 4px;">
                        <button class="os-btn" id="ff-btn-chromium" style="min-width: 130px; cursor: pointer;">Download a real browser</button>
                        <button class="os-btn" id="ff-btn-ok" style="min-width: 60px; cursor: pointer;">OK</button>
                    </div>
                </div>
            `
        });

        const win = document.getElementById(winId);
        win.style.width = '420px';
        win.style.height = 'auto';
        win.style.resize = 'none';
        win.style.zIndex = '999999';

        const body = win.querySelector('.window-body');
        body.style.border = 'none';
        body.style.margin = '0';
        body.style.padding = '12px 15px';
        body.style.backgroundColor = 'var(--win-gray)';

        win.querySelectorAll('.title-bar-controls button').forEach(btn => {
            if (btn.getAttribute('aria-label') !== 'Close') {
                btn.style.visibility = 'hidden';
            }
        });

        win.classList.add('open');

        const close = () => { win.remove(); resolve(); };

        win.querySelector('#ff-btn-ok').addEventListener('click', close);
        win.querySelector('#ff-btn-chromium').addEventListener('click', () => {
            window.open('https://www.google.com/search?q=download+chrome', '_blank');
            close();
        });
        win.querySelector('.title-bar-controls button[aria-label="Close"]')
            .addEventListener('click', close);
    });
}