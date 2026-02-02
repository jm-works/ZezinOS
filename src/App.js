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

window.openWindow = openWindow;
window.closeWindow = closeWindow;

startClock()