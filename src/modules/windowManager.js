import { createTaskbarButton, removeTaskbarButton } from './taskbar.js';

export function openWindow(windowId) {
    const windowElement = document.getElementById(windowId);

    if (windowElement) {
        windowElement.classList.add('open');
        createTaskbarButton(windowId, windowElement);
    }
}

export function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.classList.remove('open');
        removeTaskbarButton(windowId);
    }
}

export function initWindowListener() {
    document.addEventListener('click', (event) => {
        const clickedInsideWindow = event.target.closest('.window');
        const clickedOnIcon = event.target.closest('.desktop-icon');
        const clickedOnTaskbar = event.target.closest('.taskbar');

        if (!clickedInsideWindow && !clickedOnIcon && !clickedOnTaskbar) {
            const openWindows = document.querySelectorAll('.window.open');
            openWindows.forEach(win => closeWindow(win.id));
        }
    });
}