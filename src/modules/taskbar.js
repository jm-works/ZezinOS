export function createTaskbarButton(windowId, windowElement) {
    const taskbarArea = document.querySelector('.tasks-area');
    const titleText = windowElement.querySelector('.title-bar-text').textContent;
    
    const existingButton = document.getElementById(`btn-${windowId}`);
    
    if (existingButton) {
        existingButton.classList.add('active'); 
        return;
    }

    const button = document.createElement('button');
    button.className = 'task-button active';
    button.id = `btn-${windowId}`;

    button.innerHTML = `
        <img src="./public/icons/sobreMim.svg" width="16" height="16" alt=""> 
        <span>${titleText}</span>
    `;

    button.onclick = () => {
        const isWindowOpen = windowElement.classList.contains('open');
        const isButtonActive = button.classList.contains('active');

        if (isWindowOpen && isButtonActive) {
            windowElement.classList.remove('open');
            button.classList.remove('active');
        } else {
            windowElement.classList.add('open');
            button.classList.add('active');
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