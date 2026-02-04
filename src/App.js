import { startClock } from './modules/clock.js';
import { initSelectionBox } from './modules/desktop.js';
import { openWindow, closeWindow, initWindowListener } from './modules/windowManager.js';
import { initTerminal } from './modules/terminal.js'
import { initDraggableWindows } from './modules/drag.js';

startClock();
initSelectionBox();
initWindowListener();
initTerminal();
initDraggableWindows();

window.openWindow = openWindow;
window.closeWindow = closeWindow;