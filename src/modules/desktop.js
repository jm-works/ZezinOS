import { openWindow } from './windowManager.js';
import { playSound } from './audioManager.js';

export function setupDesktopIcons() {
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.style.visibility = 'visible';
    });
}

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

        document.querySelectorAll('.desktop-icon.selection').forEach(i => i.classList.remove('selection'));

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        selectionBox.style.left = startX + 'px';
        selectionBox.style.top = startY + 'px';
        selectionBox.style.width = '0px';
        selectionBox.style.height = '0px';
        selectionBox.style.display = 'block';
    });

    let clickTimer = null;
    let lastClickedIcon = null;
    let justFinishedDragging = false;

    desktop.addEventListener('click', (e) => {
        if (justFinishedDragging) {
            justFinishedDragging = false;
            return;
        }

        const icon = e.target.closest('.desktop-icon');

        if (!icon) {
            document.querySelectorAll('.desktop-icon.selection').forEach(i => i.classList.remove('selection'));
            return;
        }

        if (lastClickedIcon === icon && clickTimer !== null) {
            clearTimeout(clickTimer);
            clickTimer = null;
            lastClickedIcon = null;

            icon.classList.remove('selection');
            icon.blur();

            if (icon.dataset.window) {
                openWindow(icon.dataset.window);
            }
        } else {
            document.querySelectorAll('.desktop-icon.selection').forEach(i => i.classList.remove('selection'));
            icon.classList.add('selection');

            lastClickedIcon = icon;
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickTimer = null;
                lastClickedIcon = null;
            }, 250);
        }
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

        const selRect = selectionBox.getBoundingClientRect();
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            const iconRect = icon.getBoundingClientRect();
            const hits =
                iconRect.left < selRect.right &&
                iconRect.right > selRect.left &&
                iconRect.top < selRect.bottom &&
                iconRect.bottom > selRect.top;
            icon.classList.toggle('selection', hits);
        });
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            justFinishedDragging = true;
            selectionBox.style.display = 'none';
        }
    });

    let contextMenu = document.getElementById('context-menu');
    if (!contextMenu) {
        contextMenu = document.createElement('div');
        contextMenu.id = 'context-menu';

        contextMenu.innerHTML = `
            <div class="context-menu-item" id="ctx-refresh">Refresh</div>
            <div class="context-menu-separator"></div>
            <div class="context-menu-item" id="ctx-about">About Me</div>
            <div class="context-menu-item" id="ctx-github">My GitHub</div>
            <div class="context-menu-separator"></div>
            <div class="context-menu-item" id="ctx-properties">Properties</div>
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
        if (e.target.closest('.desktop-icon') || e.target.closest('.window') || e.target.closest('.taskbar')) return;

        e.preventDefault();
        playSound('menu');

        let x = e.clientX;
        let y = e.clientY;

        const tbMenu = document.getElementById('taskbar-context-menu');
        if (tbMenu) tbMenu.style.display = 'none';
        contextMenu.style.display = 'flex';

        if (x + contextMenu.offsetWidth > window.innerWidth) x = window.innerWidth - contextMenu.offsetWidth - 2;
        if (y + contextMenu.offsetHeight > window.innerHeight) y = window.innerHeight - contextMenu.offsetHeight - 2;

        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
    });

    document.addEventListener('mousedown', (e) => {
        if (e.button === 0 && !e.target.closest('#context-menu')) {
            hideContextMenu();
        }
    });
}