import { createTaskbarButton, removeTaskbarButton } from './taskbar.js';
import { playSound } from './audioManager.js';

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
        playSound('window');
        
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
        playSound('window');

        windowElement.classList.remove('open');
        windowElement.classList.remove('minimizing');
    
        windowElement.style.top = '';
        windowElement.style.left = '';
        windowElement.style.margin = '';
        windowElement.style.transform = '';

        if (windowId === 'window-terminal') {
            const output = windowElement.querySelector('#terminal-output');
            const input = windowElement.querySelector('#cmd-input');

            if (output) {
                output.innerHTML = `
            <div>JM-WORKS(R) ZezinOS</div>
            <div>(C) Copyright JM-WORKS Corp 1981-1998.</div>
            <br>
                `;
            }
            
            if (input) {
                input.value = '';
            }
        }

        if (windowId === 'window-calculator') {
            const clearBtn = windowElement.querySelector('[data-action="clear"]');
            
            if (clearBtn) {
                clearBtn.click();
            }
        }        

        if (windowElement.dataset.skipTaskbar !== "true") {
            removeTaskbarButton(windowId);
        }
    }
}

export function minimizeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    const taskButton = document.getElementById(`btn-${windowId}`);

    if (windowElement) {
        playSound('window');
        
        windowElement.classList.add('minimizing');
        
        setTimeout(() => {
            windowElement.classList.remove('open');
            windowElement.classList.remove('minimizing');
        }, 150);
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
            
            let playedSound = false;

            openWindows.forEach(win => {
                if (win.dataset.skipTaskbar !== "true") {
                    
                    if (!playedSound) {
                        playSound('window'); 
                        playedSound = true;
                    }

                    win.classList.add('minimizing');
                    setTimeout(() => {
                        win.classList.remove('open');
                        win.classList.remove('minimizing');
                    }, 150);

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