import { playSound } from './audioManager.js';

export function initClippy() {
    setTimeout(() => {
        if (document.getElementById('clippy-container')) return;

        const clippyContainer = document.createElement('div');
        clippyContainer.id = 'clippy-container';

        clippyContainer.innerHTML = `
            <div class="clippy-bubble">
                <div class="clippy-close" id="clippy-close" title="Close">✕</div>
                <div class="clippy-text">
                    It looks like you want to explore the system!<br><br>
                    <b>Tip:</b> Press the <b>(Alt)</b> key on your keyboard to quickly open the Start Menu.
                </div>
            </div>
            <img src="https://www.spriters-resource.com/media/gifs/7/522060-6876.gif?updated=1771548693" alt="Clippy" class="clippy-img" id="clippy-img">
        `;

        document.body.appendChild(clippyContainer);
        playSound('clippy');

        const dismissClippy = () => {
            playSound('clippy')
            clippyContainer.style.opacity = '0';
            setTimeout(() => clippyContainer.remove(), 300);
        };

        document.getElementById('clippy-close').onclick = dismissClippy;
        document.getElementById('clippy-img').onclick = dismissClippy;

    }, 10000);
}