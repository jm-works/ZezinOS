// Iniciar Relogio da Taskbar

function startClock() {
    const clock = document.querySelector(".clock");

    function updateTime() {
        const now = new Date();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        clock.textContent = `${hours}:${minutes}`;
    }

    updateTime();

    setInterval(updateTime, 1000)
}

// Sobre Mim

function openWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.classList.add('open');
    }
}

function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.classList.remove('open');
    }
}

document.addEventListener('click', (event) => {
    const clickedInsideWindow = event.target.closest('.window');
    const clickedOnIcon = event.target.closest('.desktop-icon');
    const clickedOnTaskbar = event.target.closest('.taskbar');

    if (!clickedInsideWindow && !clickedOnIcon && !clickedOnTaskbar) {
        
        const openWindows = document.querySelectorAll('.window.open');
        
        openWindows.forEach(window => {
            window.classList.remove('open');
        });
    }
});

// Caixa de Selecao
function initSelectionBox() {
    const desktop = document.querySelector('.desktop-area')

    const selectionBox = document.createElement('div')
    selectionBox.id = 'selection-box';
    document.body.appendChild(selectionBox);

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    desktop.addEventListener('mousedown', (e) => {
        if (e.target.closest('.desktop-icon') || e.target.closest('.taskbar')) return;

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
    })

}

window.openWindow = openWindow;
window.closeWindow = closeWindow;

startClock();
initSelectionBox();