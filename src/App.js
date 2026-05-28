// System
import { startClock } from './modules/clock.js';
import { initSelectionBox, setupDesktopIcons } from './modules/desktop.js';
import { openWindow, closeWindow, initWindowListener, minimizeWindow, preRenderWindow } from './modules/windowManager.js';
import { initDraggableWindows } from './modules/drag.js';
import { initStartMenu } from './modules/startMenu.js';
import { runBootSequence } from './modules/boot.js';
import { initLogin } from './modules/login.js';
import { initClippy } from './modules/clippy.js';
import { showFirefoxWarning } from './modules/firefoxWarning.js';

// Wallpaper
import { setWallpaper } from './programs/wallpaper.js';
import { setMedia } from './programs/mediaplayer.js';

// Configurar janelas globais
window.openWindow = openWindow;
window.closeWindow = closeWindow;
window.minimizeWindow = minimizeWindow;

async function initSystem() {

    // Clock
    startClock();

    // BIOS
    await runBootSequence();

    // Initial Config
    setWallpaper('eyes');
    setMedia('https://soundcloud.com/cosmicfmoff/sets/nffonptya0ii');

    // Login Screen
    await initLogin();

    // Clippy
    initClippy();

    // Interface
    initSelectionBox();
    setupDesktopIcons();
    initWindowListener();
    initDraggableWindows();
    initStartMenu();

    // Render
    preRenderWindow('window-mediaplayer');
    preRenderWindow('window-minesweeper');

    // Firefox warning
    await showFirefoxWarning();

    openWindow('window-about', false);
}

document.addEventListener('DOMContentLoaded', initSystem);

document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.desktop-icon') || !e.target.closest('.desktop-area')) {
        e.preventDefault();
    }
});