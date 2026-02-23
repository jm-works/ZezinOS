import { bringToFront } from './windowManager.js';

export function initDraggableWindows() {
    let isDragging = false;
    let currentWindow = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let windowStartX = 0;
    let windowStartY = 0;
    let currentDx = 0;
    let currentDy = 0;
    let ticking = false;
    let hasDragged = false;

    document.addEventListener('mousedown', (e) => {
        const titleBar = e.target.closest('.title-bar');
        
        if (!titleBar || e.target.closest('.title-bar-controls')) return;

        const windowEl = titleBar.closest('.window');
        
        if (windowEl) {
            isDragging = true;
            hasDragged = false; 
            currentWindow = windowEl;

            bringToFront(windowEl);
            
            windowEl.style.transition = 'none';

            document.body.classList.add('is-dragging');

            const rect = windowEl.getBoundingClientRect();
            
            windowStartX = rect.left;
            windowStartY = rect.top;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            currentDx = 0;
            currentDy = 0;
            
            windowEl.style.left = windowStartX + 'px';
            windowEl.style.top = windowStartY + 'px';
            windowEl.style.margin = '0';
            windowEl.style.willChange = 'transform';
            windowEl.style.transform = 'translate3d(0px, 0px, 0px)';
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging || !currentWindow) return;

        e.preventDefault();

        const currentX = e.clientX;
        const currentY = e.clientY;
        if (Math.abs(currentX - dragStartX) > 2 || Math.abs(currentY - dragStartY) > 2) {
            hasDragged = true;
        }

        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (isDragging && currentWindow) {
                    currentDx = currentX - dragStartX;
                    currentDy = currentY - dragStartY;
                    
                    currentWindow.style.transform = `translate3d(${currentDx}px, ${currentDy}px, 0)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    document.addEventListener('mouseup', () => {
        if (currentWindow && isDragging) {
            const win = currentWindow; 
            
            win.style.left = (windowStartX + currentDx) + 'px';
            win.style.top = (windowStartY + currentDy) + 'px';
            
            win.style.transform = 'none';
            win.style.willChange = 'auto';
            
            void win.offsetWidth; 
            
            win.style.transition = '';

            document.body.classList.remove('is-dragging');
        }
        
        isDragging = false;
        currentWindow = null;

        setTimeout(() => {
            hasDragged = false;
        }, 50);
    });

    window.addEventListener('click', (e) => {
        if (hasDragged) {
            e.stopPropagation(); 
            e.preventDefault();
        }
    }, true);
}