// Imports
import { startClock } from './modules/clock.js';
import { initSelectionBox } from './modules/desktop.js';
import { openWindow, closeWindow, initWindowListener, minimizeWindow } from './modules/windowManager.js';
import { initDraggableWindows } from './modules/drag.js';
import { renderAbout } from './programs/about.js';
import { renderTerminal } from './programs/terminal.js';
import { renderPatchNotes } from './programs/patchnotes.js';
import { initStartMenu } from './modules/startMenu.js';
import { renderWallpaper, setWallpaper } from './programs/wallpaper.js';
import { renderMediaPlayer, setMedia } from './programs/mediaplayer.js';

// 'Setar' um wallpaper inicial
setWallpaper('eyes');

// Setar playlist do Midia Player
setMedia('https://soundcloud.com/rizzya-haese-40403621/sets/the-best-of-city-pop-o');

// Renderizar Janelas
renderAbout();
renderTerminal();
renderPatchNotes();
renderWallpaper();
renderMediaPlayer();

// Iniciar Metodos
startClock();
initSelectionBox();
initWindowListener();
initDraggableWindows();
initStartMenu();

// Configurar janelas
window.openWindow = openWindow;
window.closeWindow = closeWindow;
window.minimizeWindow = minimizeWindow;