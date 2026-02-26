import { playSound } from './audioManager.js';

export function initClippy() {
    setTimeout(() => {
        if (document.getElementById('clippy-container')) return;

        const clippyContainer = document.createElement('div');
        clippyContainer.id = 'clippy-container';
        
        clippyContainer.innerHTML = `
            <div class="clippy-bubble">
                <div class="clippy-close" id="clippy-close" title="Fechar">✕</div>
                <div class="clippy-text">
                    Parece que você quer explorar o sistema!<br><br>
                    <b>Dica:</b> Pressione a tecla <b>Control (Ctrl)</b> no seu teclado para abrir o Menu Iniciar rapidamente.
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