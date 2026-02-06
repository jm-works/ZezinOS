export function createWindow({ id, title, content, menuBar = '', toolBar = '', isCentered = false, skipTaskbar = false }) {
    if (document.getElementById(id)) return;

    const windowDiv = document.createElement('div');
    windowDiv.id = id;
    
    if (skipTaskbar) {
        windowDiv.dataset.skipTaskbar = "true";
    }
    
    windowDiv.className = `window ${isCentered ? 'centered' : ''}`;
    
    windowDiv.innerHTML = `
        <div class="title-bar">
            <div class="title-bar-text">${title}</div>
            <div class="title-bar-controls">
                <button aria-label="Minimize" onclick="minimizeWindow('${id}')">_</button>
                <button aria-label="Maximize">□</button>
                <button aria-label="Close" onclick="closeWindow('${id}')">X</button>
            </div>
        </div>

        ${menuBar ? `<div class="menu-bar">${menuBar}</div>` : ''}
        ${toolBar ? `<div class="window-toolbar">${toolBar}</div>` : ''}

        <div class="window-body">
            ${content}
        </div>
    `;
    document.body.appendChild(windowDiv);
}