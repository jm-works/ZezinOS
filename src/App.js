import { startClock } from './modules/clock.js';
import { initSelectionBox } from './modules/desktop.js';
import { openWindow, closeWindow, initWindowListener } from './modules/windowManager.js';

startClock();
initSelectionBox();
initWindowListener();

window.openWindow = openWindow;
window.closeWindow = closeWindow;