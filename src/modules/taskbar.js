import { bringToFront } from './windowManager.js';

export function createTaskbarButton(windowId, windowElement) {
    const taskbarArea = document.querySelector('.tasks-area');
    const titleText = windowElement.querySelector('.title-bar-text').textContent;
    const appIcons = {
        'window-about': './public/icons/sobreMim.svg',
        'window-terminal': './public/icons/zenzinDOS.svg',
        'window-patchnotes': './public/icons/patchnotes.svg',
        'window-wallpaper': './public/icons/wallpaper.ico',
        'window-mediaplayer': './public/icons/mediaplayer.svg',
        'window-waifuviewer': './public/icons/waifuviewer.svg',
        'window-calculator': './public/icons/calculator.ico',
        'window-dosgames': './public/icons/dosgames.svg',
        'window-aracaju': './public/icons/aracaju.ico',
        'window-minesweeper': './public/icons/minewsweeper.png',
        'window-notepad': './public/icons/notepad.ico',
        'window-zezinpaint': './public/icons/zezinpaint.webp',
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
            windowElement.classList.add('minimizing'); 
            button.classList.remove('active');
            
            setTimeout(() => {
                windowElement.classList.remove('open');
                windowElement.classList.remove('minimizing');
            }, 150); 
            
        } else {
            windowElement.classList.add('minimizing');
            windowElement.classList.add('open');
            button.classList.add('active');
            bringToFront(windowElement);

            void windowElement.offsetWidth;

            windowElement.classList.remove('minimizing');
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