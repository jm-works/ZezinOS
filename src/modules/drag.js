import { bringToFront } from './windowManager.js';

export function initDraggableWindows() {
    let isDragging = false;
    let currentWindow = null;
    let offset = { x: 0, y: 0 };

    document.addEventListener('mousedown', (e) => {
        const titleBar = e.target.closest('.title-bar');
        
        if (!titleBar || e.target.closest('.title-bar-controls')) return;

        const windowEl = titleBar.closest('.window');
        
        if (windowEl) {
            isDragging = true;
            currentWindow = windowEl;

            bringToFront(windowEl);
            windowEl.style.transition = 'none';

            const rect = windowEl.getBoundingClientRect();
            
            windowEl.style.left = rect.left + 'px';
            windowEl.style.top = rect.top + 'px';
            windowEl.style.transform = 'none';
            windowEl.style.margin = '0';

            offset.x = e.clientX - rect.left;
            offset.y = e.clientY - rect.top;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging || !currentWindow) return;

        e.preventDefault();
        const newX = e.clientX - offset.x;
        const newY = e.clientY - offset.y;

        currentWindow.style.left = newX + 'px';
        currentWindow.style.top = newY + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (currentWindow) {
            currentWindow.style.transition = '';
        }
        isDragging = false;
        currentWindow = null;
    });
}