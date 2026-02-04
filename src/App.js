import { startClock } from './modules/clock.js';
import { initSelectionBox } from './modules/desktop.js';
import { openWindow, closeWindow, initWindowListener, minimizeWindow } from './modules/windowManager.js';
import { initTerminal } from './modules/terminal.js'
import { initDraggableWindows } from './modules/drag.js';
import { renderAbout } from './programs/about.js';
import { renderTerminal } from './programs/terminal.js';

renderAbout();
renderTerminal();

startClock();
initSelectionBox();
initWindowListener();
initTerminal();
initDraggableWindows();

window.openWindow = openWindow;
window.closeWindow = closeWindow;
window.minimizeWindow = minimizeWindow;