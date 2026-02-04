import { createTaskbarButton, removeTaskbarButton } from './taskbar.js';

export function openWindow(windowId) {
    const windowElement = document.getElementById(windowId);

    if (windowElement) {
        windowElement.classList.add('open');
        createTaskbarButton(windowId, windowElement);

        bringToFront(windowElement);
    }
}

export function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.classList.remove('open');
        removeTaskbarButton(windowId);
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
                win.classList.remove('open');
                const taskButton = document.getElementById(`btn-${win.id}`);
                if (taskButton) {
                    taskButton.classList.remove('active')
                }
            })
        }
    });

    document.addEventListener('mousedown', (e) => {
    const clickedWindow = e.target.closest('.window');
    if (clickedWindow) {
        document.querySelectorAll('.window').forEach(w => w.style.zIndex = '100');
        clickedWindow.style.zIndex = '200';
    }
});
}