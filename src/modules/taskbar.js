import { bringToFront, closeWindow, minimizeWindow } from './windowManager.js';
import { playSound } from './audioManager.js';

let activeContextWindowId = null;

function initTaskbarContextMenu() {
    if (document.getElementById('taskbar-context-menu')) return;

    const menu = document.createElement('div');
    menu.id = 'taskbar-context-menu';
    
    menu.innerHTML = `
        <div class="context-menu-item" id="tb-ctx-minimize">Minimizar</div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-item" id="tb-ctx-close">Fechar</div>
    `;
    document.body.appendChild(menu);

    document.getElementById('tb-ctx-minimize').addEventListener('click', () => {
        if (activeContextWindowId) {
            minimizeWindow(activeContextWindowId);
        }
        menu.style.display = 'none';
    });

    document.getElementById('tb-ctx-close').addEventListener('click', () => {
        if (activeContextWindowId) {
            closeWindow(activeContextWindowId);
        }
        menu.style.display = 'none';
    });

    document.addEventListener('mousedown', (e) => {
        if (e.button === 0 && !e.target.closest('#taskbar-context-menu')) {
            menu.style.display = 'none';
        }
    });
}

export function createTaskbarButton(windowId, windowElement) {
    initTaskbarContextMenu();

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
        'window-internet': './public/icons/internet.png',
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
            minimizeWindow(windowId);
        } else {
            playSound('window');
            windowElement.classList.add('minimizing');
            windowElement.classList.add('open'); 
            button.classList.add('active');
            bringToFront(windowElement);

            void windowElement.offsetWidth;
            windowElement.classList.remove('minimizing');
        }
    };

    button.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        playSound('menu');

        activeContextWindowId = windowId;
        const menu = document.getElementById('taskbar-context-menu');
        menu.style.display = 'flex';

        let x = e.clientX;
        let y = e.clientY;

        if (x + menu.offsetWidth > window.innerWidth) {
            x = window.innerWidth - menu.offsetWidth - 2;
        }
        
        y = y - menu.offsetHeight;

        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
    });

    taskbarArea.appendChild(button);
}

export function removeTaskbarButton(windowId) {
    const taskButton = document.getElementById(`btn-${windowId}`);
    if (taskButton) {
        taskButton.remove();
    }
}