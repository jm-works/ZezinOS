import { bringToFront } from './windowManager.js';

export function createTaskbarButton(windowId, windowElement) {
    const taskbarArea = document.querySelector('.tasks-area');
    const titleText = windowElement.querySelector('.title-bar-text').textContent;
    const appIcons = {
        'window-about': './public/icons/sobreMim.svg',
        'window-terminal': './public/icons/zenzinDOS.svg',
        'window-patchnotes': './public/icons/patchnotes.svg',
        'window-wallpaper': './public/icons/wallpaper.ico'
    };
    const iconPath = appIcons[windowId] || './public/icons/logo.svg';
    const existingButton = document.getElementById(`btn-${windowId}`);
    
    if (existingButton) {
        existingButton.classList.add('active'); 
        return;
    }

    const button = document.createElement('button');
    button.className = 'task-button active';
    button.id = `btn-${windowId}`;

    button.innerHTML = `
        <img src="${iconPath}" width="16" height="16" alt=""> 
        <span>${titleText}</span>
    `;

    button.onclick = () => {
        const isWindowOpen = windowElement.classList.contains('open');
        const isButtonActive = button.classList.contains('active');

        if (isWindowOpen && isButtonActive) {
            windowElement.classList.remove('open');
            button.classList.remove('active');
        } else {
            windowElement.classList.add('open');
            button.classList.add('active');
            bringToFront(windowElement);
        }
    };

    taskbarArea.appendChild(button);
}

export function removeTaskbarButton(windowId) {
    const taskButton = document.getElementById(`btn-${windowId}`);
    if (taskButton) {
        taskButton.remove();
    }
}