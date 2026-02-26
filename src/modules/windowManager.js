import { createTaskbarButton, removeTaskbarButton } from './taskbar.js';
import { playSound } from './audioManager.js';

// Importação dos programas
import { renderAbout } from '../programs/about.js';
import { renderTerminal } from '../programs/terminal.js';
import { renderPatchNotes } from '../programs/patchnotes.js';
import { renderWallpaper } from '../programs/wallpaper.js';
import { renderMediaPlayer } from '../programs/mediaplayer.js';
import { renderWaifuViewer } from '../programs/waifuviewer.js';
import { renderCalculator } from '../programs/calculator.js';
import { renderNotepad } from '../programs/notepad.js';
import { renderZezinPaint } from '../programs/zezinpaint.js';
import { renderInternet } from '../programs/internet.js';
import { renderDosGames } from '../programs/games/dosgames.js';
import { renderAracaju } from '../programs/games/aracaju.js';
import { renderMinesweeper } from '../programs/games/minesweeper.js';

let zIndexCounter = 100;

const windowRegistry = {
    'window-about': renderAbout,
    'window-terminal': renderTerminal,
    'window-patchnotes': renderPatchNotes,
    'window-wallpaper': renderWallpaper,
    'window-mediaplayer': renderMediaPlayer,
    'window-waifuviewer': renderWaifuViewer,
    'window-calculator': renderCalculator,
    'window-notepad': renderNotepad,
    'window-zezinpaint': renderZezinPaint,
    'window-internet': renderInternet,
    'window-dosgames': renderDosGames,
    'window-aracaju': renderAracaju,
    'window-minesweeper': renderMinesweeper
};

const hibernationVault = new Map();

function hibernateWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;

    const hasIframe = win.querySelector('iframe');
    if (hasIframe) return; 

    const body = win.querySelector('.window-body');
    if (body && body.childNodes.length > 0) {
        const fragment = document.createDocumentFragment();
        while (body.firstChild) {
            fragment.appendChild(body.firstChild);
        }
        hibernationVault.set(windowId, fragment);
        console.log(`[ZezinOS Memory] Janela ${windowId} fechada e hibernada.`);
    }
}

function wakeUpWindow(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;

    const body = win.querySelector('.window-body');
    if (body && hibernationVault.has(windowId)) {
        body.appendChild(hibernationVault.get(windowId));
        hibernationVault.delete(windowId);
        console.log(`[ZezinOS Memory] Janela ${windowId} reaberta e acordada.`);
    }
}

export function bringToFront(windowElement) {
    zIndexCounter++;
    windowElement.style.zIndex = zIndexCounter;
    if (windowElement.id === 'window-mediaplayer') {
        const dialog = document.getElementById('window-url-dialog');
        if (dialog && dialog.classList.contains('open')) {
            zIndexCounter++;
            dialog.style.zIndex = zIndexCounter;
        }
    }
}

export function preRenderWindow(windowId) {
    let windowElement = document.getElementById(windowId);

    if (!windowElement && windowRegistry[windowId]) {
        windowRegistry[windowId]();
        console.log(`[ZezinOS System] ${windowId} pré-renderizado em background.`);
    }
}

export function openWindow(windowId, playAudio = true) {
    let windowElement = document.getElementById(windowId);

    if (!windowElement && windowRegistry[windowId]) {
        windowRegistry[windowId]();
        windowElement = document.getElementById(windowId);
    }

    if (windowElement) {
        wakeUpWindow(windowId);

        if (playAudio) playSound('window');
        windowElement.classList.add('open');
        windowElement.classList.remove('minimizing');
        
        if (windowElement.dataset.skipTaskbar !== "true") {
            createTaskbarButton(windowId, windowElement);
            const taskButton = document.getElementById(`btn-${windowId}`);
            if (taskButton) taskButton.classList.add('active');
        }
        bringToFront(windowElement);
    }
}

export function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        playSound('window');
        windowElement.style.transition = 'none';
        windowElement.style.visibility = 'hidden';
        windowElement.style.opacity = '0';
        windowElement.style.pointerEvents = 'none';

        let closeDelay = 50; 
        if (windowId === 'window-internet') {
            closeDelay = 400;
            const addressInput = windowElement.querySelector('#ie-address');
            const btnGo = windowElement.querySelector('#ie-go');
            if (addressInput && btnGo) {
                addressInput.value = 'http://zezin.web/home.htm';
                btnGo.click(); 
            }
        }

        if (windowId === 'window-terminal') {
            const output = windowElement.querySelector('#terminal-output');
            const input = windowElement.querySelector('#cmd-input');
            if (output && input) {
                output.innerHTML = `
                    <div>JM-WORKS(R) ZezinOS</div>
                    <div>(C) Copyright JM-WORKS Inc 1981-1998.</div>
                    <br>
                `;
                input.value = '';
            }
        }

        setTimeout(() => {
            windowElement.classList.remove('open');
            windowElement.classList.remove('minimizing');
            windowElement.style.transition = '';
            windowElement.style.visibility = '';
            windowElement.style.opacity = '';
            windowElement.style.pointerEvents = '';
            windowElement.style.top = '';
            windowElement.style.left = '';
            windowElement.style.margin = '';
            windowElement.style.transform = '';

            if (windowElement.dataset.skipTaskbar !== "true") {
                removeTaskbarButton(windowId);
            }
            
            hibernateWindow(windowId); 

        }, closeDelay);
    }
}

export function minimizeWindow(windowId, playAudio = true) {
    const windowElement = document.getElementById(windowId);
    const taskButton = document.getElementById(`btn-${windowId}`);
    
    if (windowElement) {
        if (playAudio) playSound('minimize');
        windowElement.classList.add('minimizing');
        
        setTimeout(() => {
            windowElement.classList.remove('open');
            windowElement.classList.remove('minimizing');
        }, 150);
    }
    if (taskButton) taskButton.classList.remove('active');
}

export function initWindowListener() {
    document.addEventListener('click', (event) => {
        const clickedInsideWindow = event.target.closest('.window');
        const clickedOnIcon = event.target.closest('.desktop-icon');
        const clickedOnTaskbar = event.target.closest('.taskbar');
        const clickedOnStart = event.target.closest('#start-menu') || event.target.closest('.start-button');
        const clickedOnContext = event.target.closest('#context-menu') || event.target.closest('#taskbar-context-menu');
        const clickedOnClippy = event.target.closest('#clippy-container');

    if (!clickedInsideWindow && !clickedOnIcon && !clickedOnTaskbar && !clickedOnStart && !clickedOnContext && !clickedOnClippy) {
            const openWindows = document.querySelectorAll('.window.open');
            let playedSound = false;
            
            openWindows.forEach(win => {
                if (win.dataset.skipTaskbar !== "true") {
                    minimizeWindow(win.id, !playedSound);
                    playedSound = true;
                }
            });
        }
    });

    document.addEventListener('mousedown', (e) => {
        const clickedWindow = e.target.closest('.window');
        if (clickedWindow) bringToFront(clickedWindow);
    });
}