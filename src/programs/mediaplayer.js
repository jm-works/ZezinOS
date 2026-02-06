import { createWindow } from '../modules/windowFactory.js';
import { closeWindow, openWindow } from '../modules/windowManager.js';

let scWidget;
let isDragging = false;
let startupUrl = '';
let closeObserver = null; 

export function setMedia(url) {
    startupUrl = url;
}

export function renderMediaPlayer() {
    createWindow({
        id: 'window-mediaplayer',
        title: 'Media Player',
        
        menuBar: `
            <span class="wmp-menu-item" onclick="wmpOpenDialog()">Arquivo...</span>
            <span class="wmp-menu-item">Exibir</span>
            <span class="wmp-menu-item">Reproduzir</span>
            <span class="wmp-menu-item">Ajuda</span>
        `,

        content: `
            <div class="wmp-content">
                <div class="wmp-screen-container" id="wmp-screen-content" style="background:#000; position: relative;">
                    <img id="wmp-artwork" src="./public/icons/logo.svg" 
                         style="width:100%; height:100%; object-fit:cover; opacity:0.3; filter:grayscale(100%); transition: opacity 0.5s;">
                    
                    <iframe id="sc-widget-iframe" 
                            src="about:blank"
                            style="position:absolute; top:0; left:0; width:1px; height:1px; opacity:0; pointer-events:none;" 
                            allow="autoplay">
                    </iframe>
                </div>

                <div class="wmp-seek-container">
                    <input type="range" id="wmp-seek" class="wmp-slider" min="0" max="100" value="0"
                        onmousedown="wmpStartSeek()" onmouseup="wmpEndSeek(this.value)">
                </div>

                <div class="wmp-controls-row">
                    <div class="wmp-btn-group">
                        <button class="wmp-btn" title="Reproduzir" onclick="wmpPlay()"><svg class="wmp-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
                        <button class="wmp-btn" title="Pausar" onclick="wmpPause()"><svg class="wmp-icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg></button>
                        <button class="wmp-btn" title="Parar" onclick="wmpStop()"><svg class="wmp-icon" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg></button>
                    </div>

                    <div class="wmp-btn-group">
                        <button class="wmp-btn" title="Anterior" onclick="wmpPrev()"><svg class="wmp-icon" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg></button>
                        <button class="wmp-btn" title="Próximo" onclick="wmpNext()"><svg class="wmp-icon" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg></button>
                    </div>
                    
                    <div style="flex:1"></div>

                    <div class="wmp-vol-icon"></div>
                    <input type="range" class="wmp-slider" style="width: 60px;" min="0" max="100" value="50" oninput="wmpSetVolume(this.value)">
                </div>

                <div class="wmp-statusbar">
                    <div id="wmp-status-text" class="wmp-status-panel wmp-status-main">Pronto.</div>
                    <div id="wmp-time-text" class="wmp-status-panel wmp-status-time">00:00</div>
                </div>
            </div>
        `
    });

    const win = document.getElementById('window-mediaplayer');
    if (win) {
        win.style.width = '320px'; 
        win.style.height = '360px';
    }

    initSoundCloudAPI();
    startCloseObserver(); 
}

function startCloseObserver() {
    const win = document.getElementById('window-mediaplayer');
    if (!win) return;

    if (closeObserver) closeObserver.disconnect();

    closeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const isOpen = win.classList.contains('open');
                const dialog = document.getElementById('window-url-dialog');

                if (!isOpen) {
                    const taskbarBtn = document.getElementById(`btn-window-mediaplayer`);
                    
                    if (!taskbarBtn) {
                        if (scWidget) scWidget.pause();
                        updateStatus("Fechado.");
                        if (dialog) {
                            closeWindow('window-url-dialog');
                            dialog.dataset.wasOpen = "false"; 
                        }
                    } else {
                        if (dialog) {
                            if (dialog.classList.contains('open')) {
                                dialog.dataset.wasOpen = "true"; 
                                dialog.classList.remove('open'); 
                            } else {
                                dialog.dataset.wasOpen = "false"; 
                            }
                        }
                    }
                } else {
                    if (dialog && dialog.dataset.wasOpen === "true") {
                        if (window.openWindow) window.openWindow('window-url-dialog');
                    }
                }
            }
        });
    });

    closeObserver.observe(win, { attributes: true });
}

window.wmpOpenDialog = () => {
    const dialogId = 'window-url-dialog';
    
    createWindow({
        id: dialogId,
        title: 'Abrir URL',
        isCentered: true,
        skipTaskbar: true,
        content: `
            <div class="url-dialog-content">
                <div>
                    <div class="url-input-label">Digitar URL do SoundCloud:</div>
                    <input type="text" id="wmp-url-input" class="url-input" value="https://soundcloud.com/..." onfocus="this.select()">
                </div>
                <div class="dialog-buttons">
                    <button class="dialog-btn" onclick="wmpConfirmUrl()">OK</button>
                    <button class="dialog-btn" onclick="closeWindow('${dialogId}')">Cancelar</button>
                </div>
            </div>
        `
    });
    
    const dialogWin = document.getElementById(dialogId);
    if(dialogWin) {
        dialogWin.style.width = '300px';
        dialogWin.style.height = '140px';
    }

    if (window.openWindow) {
        window.openWindow(dialogId);
    }

    setTimeout(() => {
        const input = document.getElementById('wmp-url-input');
        if(input) input.focus();
    }, 100);
};

window.wmpConfirmUrl = () => {
    const input = document.getElementById('wmp-url-input');
    if (input && input.value && input.value !== "https://soundcloud.com/...") {
        loadSoundCloudUrl(input.value, true);
        closeWindow('window-url-dialog');
    } else {
        closeWindow('window-url-dialog');
    }
};

function initSoundCloudAPI() {
    if (!window.SC) {
        const script = document.createElement('script');
        script.src = "https://w.soundcloud.com/player/api.js";
        script.onload = () => setupWidget();
        document.body.appendChild(script);
    } else {
        setupWidget();
    }
}

function setupWidget() {
    const iframe = document.getElementById('sc-widget-iframe');
    if (!iframe) return;

    iframe.onload = () => {
        scWidget = window.SC.Widget(iframe);

        scWidget.bind(window.SC.Widget.Events.READY, () => {
            updateStatus("Pronto.");
            if (startupUrl) {
                loadSoundCloudUrl(startupUrl, false);
            }
        });

        scWidget.bind(window.SC.Widget.Events.PLAY, () => {
            updateStatus("Reproduzindo...");
            updateMetadata(0);
        });

        scWidget.bind(window.SC.Widget.Events.PAUSE, () => updateStatus("Pausado"));
        scWidget.bind(window.SC.Widget.Events.FINISH, () => updateStatus("Fim da faixa."));

        scWidget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (data) => {
            if (isDragging) return;
            const seek = document.getElementById('wmp-seek');
            const timeText = document.getElementById('wmp-time-text');
            
            if (seek) seek.value = data.relativePosition * 100;
            if (timeText) timeText.innerText = fmtTime(data.currentPosition / 1000);
        });
    };

    iframe.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&auto_play=false&show_artwork=false";
}

function loadSoundCloudUrl(url, autoPlay = true) {
    if (!scWidget) return;
    updateStatus("Carregando...");
    
    scWidget.load(url, {
        auto_play: autoPlay, 
        show_artwork: true,
        callback: () => {
            updateStatus("Carregado.");
            scWidget.setVolume(50); 
            updateMetadata(0);
        }
    });
}

function updateMetadata(retryCount = 0) {
    if (!scWidget) return;

    scWidget.getCurrentSound((sound) => {
        if (sound && sound.title) {
            updateStatus(sound.title);
            
            const img = document.getElementById('wmp-artwork');
            if (img && sound.artwork_url) {
                const bigArt = sound.artwork_url.replace('large', 't500x500');
                img.src = bigArt;
                img.style.opacity = '1';
                img.style.filter = 'none'; 
                return;
            }
        }

        if (retryCount < 20) {
            setTimeout(() => {
                updateMetadata(retryCount + 1);
            }, 500); 
        }
    });
}

window.wmpPlay = () => scWidget?.play();
window.wmpPause = () => scWidget?.pause();
window.wmpStop = () => { 
    scWidget?.pause(); 
    scWidget?.seekTo(0); 
    updateStatus("Parado"); 
};
window.wmpPrev = () => scWidget?.prev(); 
window.wmpNext = () => scWidget?.next(); 
window.wmpSetVolume = (val) => scWidget?.setVolume(val);

window.wmpStartSeek = () => { isDragging = true; };
window.wmpEndSeek = (percent) => {
    isDragging = false;
    scWidget?.getDuration((duration) => {
        const ms = duration * (percent / 100);
        scWidget.seekTo(ms);
    });
};

function updateStatus(text) {
    const el = document.getElementById('wmp-status-text');
    if (el) el.innerText = text;
}

function fmtTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
}