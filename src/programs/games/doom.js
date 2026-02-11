import { createWindow } from '../../modules/windowFactory.js';

export function renderDoom() {
    const winId = 'window-doom';
    const gameUrl = 'https://archive.org/embed/doom-play';

    const menuHTML = `
        <div class="menu-item">Jogo</div>
        <div class="menu-item">Som</div>
        <div class="menu-item">Tela</div>
        <div class="menu-item">Ajuda</div>
    `;

    const content = `
        <div class="doom-container">
            <div class="doom-viewport">
                <div id="doom-cover" class="doom-cover">
                    <div class="doom-logo">DOOM</div>
                    <div class="doom-subtitle">Shareware Version (1993)</div>
                    <div class="doom-loading-box">
                        <button class="os-btn doom-btn-start" id="btn-start-doom">INITIALIZE SYSTEM</button>
                    </div>
                    <div class="doom-credits">id Software Inc.</div>
                </div>
                
                <iframe id="doom-frame" class="doom-iframe" src="" allowfullscreen tabindex="0"></iframe>
            </div>
            
            <div class="doom-statusbar">
                <div class="status-segment">CTRL: ATIRAR</div>
                <div class="status-segment">ESPAÇO: ABRIR/USAR</div>
                <div class="status-segment">SETA: ANDAR</div>
                <div class="status-segment">CPU: 486DX2-66</div> 
                <div class="status-segment">MEM: 16MB OK</div> 
                <div class="status-segment">MODE: SVGA 800x600</div>
            </div>
        </div>
    `;

    createWindow({
        id: winId,
        title: 'DOOM',
        menuBar: menuHTML,
        content: content,
        isCentered: true
    });

    const win = document.getElementById(winId);
    if (!win) return;

    const btnStart = win.querySelector('#btn-start-doom');
    const iframe = win.querySelector('#doom-frame');
    const cover = win.querySelector('#doom-cover');

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
        if (e.target.tagName !== 'BUTTON' && !e.target.classList.contains('menu-item')) {
            setTimeout(focusGame, 50);
        }
    });

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const isOpen = win.classList.contains('open');

                if (isOpen) {
                    console.log("DOOM restaurado. Retomando foco...");
                    setTimeout(focusGame, 300); 
                
                } else {
                    const taskbarBtn = document.getElementById(`btn-${winId}`);

                    if (!taskbarBtn) {
                        console.log("DOOM encerrado.");
                        iframe.src = ""; 
                        iframe.style.display = 'none';
                        cover.style.display = 'flex';
                    } else {
                        console.log("DOOM minimizado.");
                    }
                }
            }
        });
    });
    
    observer.observe(win, { attributes: true });
}