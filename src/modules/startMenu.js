export function initStartMenu() {
    const startButton = document.querySelector('.start-button');
    const startMenu = document.getElementById('start-menu');

    window.toggleStartMenu = () => {
        startMenu.classList.toggle('active');
        startButton.classList.toggle('active');
    };

    startButton.addEventListener('click', (e) => {
        e.stopPropagation();
        window.toggleStartMenu();
    });

    startMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.addEventListener('click', () => {
        startMenu.classList.remove('active');
        startButton.classList.remove('active');
    });
}