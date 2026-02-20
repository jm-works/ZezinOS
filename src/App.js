// Sistema
import { startClock } from './modules/clock.js';
import { initSelectionBox } from './modules/desktop.js';
import { openWindow, closeWindow, initWindowListener, minimizeWindow } from './modules/windowManager.js';
import { initDraggableWindows } from './modules/drag.js';
import { initStartMenu } from './modules/startMenu.js';
import { runBootSequence } from './modules/boot.js';
import { initLogin } from './modules/login.js'; // <- Import do Login

// Programas
import { renderAbout } from './programs/about.js';
import { renderTerminal } from './programs/terminal.js';
import { renderPatchNotes } from './programs/patchnotes.js';
import { renderWallpaper, setWallpaper } from './programs/wallpaper.js';
import { renderMediaPlayer, setMedia } from './programs/mediaplayer.js';
import { renderWaifuViewer } from './programs/waifuviewer.js';
import { renderCalculator } from './programs/calculator.js';
import { renderNotepad } from './programs/notepad.js';
import { renderZezinPaint } from './programs/zezinpaint.js';

// Jogos
import { renderDosGames } from './programs/games/dosgames.js';
import { renderAracaju } from './programs/games/aracaju.js';
import { renderMinesweeper } from './programs/games/minesweeper.js';

// Configurar janelas globais
window.openWindow = openWindow;
window.closeWindow = closeWindow;
window.minimizeWindow = minimizeWindow;

async function initSystem() {
    // Boot (BIOS)
    await runBootSequence();

    // setts
    setWallpaper('eyes');
    setMedia('https://soundcloud.com/cosmicfmoff/sets/nffonptya0ii');
    renderWallpaper(); 

    // Tela de Login
    await initLogin();

    // programas
    renderAbout();
    renderTerminal();
    renderPatchNotes();
    renderMediaPlayer();
    renderWaifuViewer();
    renderCalculator();
    renderDosGames();
    renderAracaju();
    renderMinesweeper();
    renderNotepad();
    renderZezinPaint();

    // Interface
    startClock();
    initSelectionBox();
    initWindowListener();
    initDraggableWindows();
    initStartMenu();

    // Sobre Mim
    openWindow('window-about');
}

document.addEventListener('DOMContentLoaded', initSystem);