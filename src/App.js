// Sistema

import { startClock } from './modules/clock.js';
import { initSelectionBox } from './modules/desktop.js';
import { openWindow, closeWindow, initWindowListener, minimizeWindow } from './modules/windowManager.js';
import { initDraggableWindows } from './modules/drag.js';
import { initStartMenu } from './modules/startMenu.js';
import { runBootSequence } from './modules/boot.js';

// Programas

import { renderAbout } from './programs/about.js';
import { renderTerminal } from './programs/terminal.js';
import { renderPatchNotes } from './programs/patchnotes.js';
import { renderWallpaper, setWallpaper } from './programs/wallpaper.js';
import { renderMediaPlayer, setMedia } from './programs/mediaplayer.js';
import { renderWaifuViewer } from './programs/waifuviewer.js';
import { renderCalculator } from './programs/calculator.js';
import { renderNotepad } from './programs/notepad.js';

// Jogos

import { renderDosGames } from './programs/games/dosgames.js';
import { renderAracaju } from './programs/games/aracaju.js';
import { renderMinesweeper } from './programs/games/minesweeper.js';

// 'Setar' um wallpaper inicial
setWallpaper('eyes');

// Setar playlist do Midia Player
setMedia('https://soundcloud.com/cosmicfmoff/sets/nffonptya0ii');

// Renderizar Janelas
renderAbout();
renderTerminal();
renderPatchNotes();
renderWallpaper();
renderMediaPlayer();
renderWaifuViewer();
renderCalculator();
renderDosGames();
renderAracaju();
renderMinesweeper();
renderNotepad();

// Iniciar Metodos
runBootSequence(() => {
        openWindow('window-about');
    });

startClock();
initSelectionBox();
initWindowListener();
initDraggableWindows();
initStartMenu();

// Configurar janelas
window.openWindow = openWindow;
window.closeWindow = closeWindow;
window.minimizeWindow = minimizeWindow;