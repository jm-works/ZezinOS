import { startClock } from './modules/clock.js';
import { initSelectionBox } from './modules/desktop.js';
import { openWindow, closeWindow, initWindowListener, minimizeWindow } from './modules/windowManager.js';
import { initDraggableWindows } from './modules/drag.js';
import { renderAbout } from './programs/about.js';
import { renderTerminal } from './programs/terminal.js';
import { renderPatchNotes } from './programs/patchnotes.js';
import { initStartMenu } from './modules/startMenu.js';

renderAbout();
renderTerminal();
renderPatchNotes();

startClock();
initSelectionBox();
initWindowListener();
initDraggableWindows();
initStartMenu();

window.openWindow = openWindow;
window.closeWindow = closeWindow;
window.minimizeWindow = minimizeWindow;