import { openWindow } from './windowManager.js';
import { playSound } from './audioManager.js';

export function initSelectionBox() {
    const desktop = document.querySelector('.desktop-area');

    let selectionBox = document.getElementById('selection-box');
    if (!selectionBox) {
        selectionBox = document.createElement('div');
        selectionBox.id = 'selection-box';
        document.body.appendChild(selectionBox);
    }

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    desktop.addEventListener('mousedown', (e) => {
        if (e.button === 2 || e.target.closest('.desktop-icon') || e.target.closest('.taskbar')) return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        selectionBox.style.left = startX + 'px';
        selectionBox.style.top = startY + 'px';
        selectionBox.style.width = '0px';
        selectionBox.style.height = '0px';
        selectionBox.style.display = 'block';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const currentX = e.clientX;
        const currentY = e.clientY;

        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        const left = Math.min(currentX, startX);
        const top = Math.min(currentY, startY);

        selectionBox.style.width = width + 'px';
        selectionBox.style.height = height + 'px';
        selectionBox.style.left = left + 'px';
        selectionBox.style.top = top + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            selectionBox.style.display = 'none';
        }
    });

    let contextMenu = document.getElementById('context-menu');
    if (!contextMenu) {
        contextMenu = document.createElement('div');
        contextMenu.id = 'context-menu';
        
        contextMenu.innerHTML = `
            <div class="context-menu-item" id="ctx-refresh">Atualizar</div>
            <div class="context-menu-separator"></div>
            <div class="context-menu-item" id="ctx-about">Sobre Mim</div>
            <div class="context-menu-item" id="ctx-github">Meu GitHub</div>
            <div class="context-menu-separator"></div>
            <div class="context-menu-item" id="ctx-properties">Propriedades</div>
        `;
        document.body.appendChild(contextMenu);

        document.getElementById('ctx-refresh').addEventListener('click', () => {
            const icons = document.querySelectorAll('.desktop-icon');
            icons.forEach(i => i.style.visibility = 'hidden');
            setTimeout(() => icons.forEach(i => i.style.visibility = 'visible'), 100);
            hideContextMenu();
        });

        document.getElementById('ctx-about').addEventListener('click', () => {
            openWindow('window-about');
            hideContextMenu();
        });

        document.getElementById('ctx-github').addEventListener('click', () => {
            window.open('https://github.com/jm-works', '_blank'); 
            hideContextMenu();
        });

        document.getElementById('ctx-properties').addEventListener('click', () => {
            openWindow('window-wallpaper'); 
            hideContextMenu();
        });
    }

    const hideContextMenu = () => {
        if (contextMenu.style.display === 'flex') {
            contextMenu.style.display = 'none';
        }
    };

    desktop.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.desktop-icon') || e.target.closest('.window') || e.target.closest('.taskbar')) {
            return; 
        }

        e.preventDefault();

        playSound('menu');

        let x = e.clientX;
        let y = e.clientY;

        contextMenu.style.display = 'flex';
        
        if (x + contextMenu.offsetWidth > window.innerWidth) {
            x = window.innerWidth - contextMenu.offsetWidth - 2;
        }
        if (y + contextMenu.offsetHeight > window.innerHeight) {
            y = window.innerHeight - contextMenu.offsetHeight - 2;
        }

        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
    });

    document.addEventListener('mousedown', (e) => {
        if (e.button === 0 && !e.target.closest('#context-menu')) {
            hideContextMenu();
        }
    });
}