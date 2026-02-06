import { createTaskbarButton, removeTaskbarButton } from './taskbar.js';

let zIndexCounter = 100;

export function bringToFront(windowElement) {
    zIndexCounter++;
    windowElement.style.zIndex = zIndexCounter;

    if (windowElement.id === 'window-mediaplayer') {
        const dialog = document.getElementById('window-url-dialog');
        
        if (dialog && dialog.classList.contains('open')) {
            zIndexCounter++;
            dialog.style.zIndex = zIndexCounter;
        }
    }
}

export function openWindow(windowId) {
    const windowElement = document.getElementById(windowId);

    if (windowElement) {
        windowElement.classList.add('open');
        if (windowElement.dataset.skipTaskbar !== "true") {
            createTaskbarButton(windowId, windowElement);
        }

        bringToFront(windowElement);
    }
}

export function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.classList.remove('open');
    
        if (windowElement.dataset.skipTaskbar !== "true") {
            removeTaskbarButton(windowId);
        }
    }
}

export function minimizeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    const taskButton = document.getElementById(`btn-${windowId}`);

    if (windowElement) {
        windowElement.classList.remove('open');
    }

    if (taskButton) {
        taskButton.classList.remove('active');
    }
}

export function initWindowListener() {
    document.addEventListener('click', (event) => {
        const clickedInsideWindow = event.target.closest('.window');
        const clickedOnIcon = event.target.closest('.desktop-icon');
        const clickedOnTaskbar = event.target.closest('.taskbar');

        if (!clickedInsideWindow && !clickedOnIcon && !clickedOnTaskbar) {
            const openWindows = document.querySelectorAll('.window.open');
            
            openWindows.forEach(win => {
                if (win.dataset.skipTaskbar !== "true") {
                    win.classList.remove('open');
                    const taskButton = document.getElementById(`btn-${win.id}`);
                    if (taskButton) {
                        taskButton.classList.remove('active');
                    }
                }
            });
        }
    });

    document.addEventListener('mousedown', (e) => {
        const clickedWindow = e.target.closest('.window');
        if (clickedWindow) {
            bringToFront(clickedWindow);
        }
    });
}