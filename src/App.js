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
            closeWindow(window.id);
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

function openWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    const taskbarArea = document.querySelector('.tasks-area');

    if(windowElement) {
        windowElement.classList.add('open');

        const existingButton = document.getElementById(`btn-${windowId}`);

        if (!existingButton) {
            createTaskbarButton(windowId, windowElement, taskbarArea);
        }
    }
}

function createTaskbarButton(windowId, windowElement, taskbarArea) {
    const titleText = windowElement.querySelector('.title-bar-text').textContent;

    const button = document.createElement('button');

    button.className = 'task-button active';
    button.id = `btn-${windowId}`;

    button.innerHTML = `
        <img src="./public/icons/sobreMim.svg" width="16" height="16" alt=""> 
        <span>${titleText}</span>
    `;

    button.onclick = () => {
        if (windowElement.classList.contains('open')) {
            if (windowElement.classList.contains('active')) {
                windowElement.classList.remove('open');
                button.classList.remove('active')
            } else {
                button.classList.add('active')
            }
        } else {
            windowElement.classList.add('open');
            button.classList.add('active');
        }
    };

    taskbarArea.appendChild(button);
}

function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.classList.remove('open');
        const taskButton = document.getElementById(`btn-${windowId}`);
        if (taskButton) {
            taskButton.remove();
        }
    }
}

window.openWindow = openWindow;
window.closeWindow = closeWindow;

startClock();
initSelectionBox();