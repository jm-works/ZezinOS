// Sistema
import { startClock } from './modules/clock.js';
import { initSelectionBox } from './modules/desktop.js';
import { openWindow, closeWindow, initWindowListener, minimizeWindow, preRenderWindow } from './modules/windowManager.js';
import { initDraggableWindows } from './modules/drag.js';
import { initStartMenu } from './modules/startMenu.js';
import { runBootSequence } from './modules/boot.js';
import { initLogin } from './modules/login.js';

// Wallpaper e Media
import { setWallpaper } from './programs/wallpaper.js';
import { setMedia } from './programs/mediaplayer.js';

// Configurar janelas globais
window.openWindow = openWindow;
window.closeWindow = closeWindow;
window.minimizeWindow = minimizeWindow;

async function initSystem() {

    // Iniciar relógio
    startClock();

    // Sequência de Boot (BIOS)
    await runBootSequence();

    // Configurações de Estado Inicial
    setWallpaper('eyes');
    setMedia('https://soundcloud.com/cosmicfmoff/sets/nffonptya0ii');

    // Tela de Login
    await initLogin();

    // Inicialização de Módulos da Interface
    initSelectionBox();
    initWindowListener();
    initDraggableWindows();
    initStartMenu();

    // Pré-renderização
    preRenderWindow('window-mediaplayer');
    preRenderWindow('window-minesweeper');

    openWindow('window-about', false);
}

document.addEventListener('DOMContentLoaded', initSystem);