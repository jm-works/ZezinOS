import { createWindow } from '../modules/windowFactory.js';

export function renderNotepad() {
    const winId = 'window-notepad';

    if (document.getElementById(winId)) return;

    const myEmail = "jmatheus_vida@outlook.com";
    let currentFontSize = 14;

    const content = `
        <div class="notepad-toolbar">
            <button class="notepad-btn" id="btn-save" title="Save .txt">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="shape-rendering: crispEdges;">
                    <path d="M2 1v14h12V4l-3-3H2zm1 1h7v3H3V2zm0 12V9h10v5H3zM5 3h1v1H5V3zm1 7h4v1H6v-1zm0 2h4v1H6v-1z"/>
                </svg>
            </button>
            <button class="notepad-btn" id="btn-email" title="Send Email">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="shape-rendering: crispEdges;">
                    <path d="M1 3h14v10H1V3zm1 1v1l6 4 6-4V4H2zm0 2.5V12h12V6.5l-6 4-6-4z"/>
                </svg>
            </button>
            
            <div class="notepad-separator"></div>
            
            <button class="notepad-btn" id="btn-bold" title="Bold"><b>B</b></button>
            <button class="notepad-btn" id="btn-italic" title="Italic"><i>I</i></button>
            <button class="notepad-btn" id="btn-underline" title="Underline"><u>U</u></button>

            <div class="notepad-separator"></div>

            <button class="notepad-btn" id="btn-font-down" title="Decrease">A-</button>
            <button class="notepad-btn" id="btn-font-up" title="Increase">A+</button>
        </div>

        <div class="notepad-editor" id="notepad-area" contenteditable="true" spellcheck="false"></div>
    `;

    createWindow({
        id: winId,
        title: 'Notepad',
        icon: './public/icons/programs.svg',
        content: content,
        width: 600,
        height: 450,
        isCentered: true,
        resizable: false
    });

    const win = document.getElementById(winId);
    const editor = win.querySelector('#notepad-area');

    setTimeout(() => editor.focus(), 100);

    const execCmd = (command) => {
        document.execCommand(command, false, null);
        editor.focus();
    };

    win.querySelector('#btn-bold').onclick = () => execCmd('bold');
    win.querySelector('#btn-italic').onclick = () => execCmd('italic');
    win.querySelector('#btn-underline').onclick = () => execCmd('underline');

    const updateFontSize = () => {
        editor.style.fontSize = `${currentFontSize}px`;
    };

    win.querySelector('#btn-font-up').onclick = () => {
        if (currentFontSize < 36) {
            currentFontSize += 2;
            updateFontSize();
        }
    };

    win.querySelector('#btn-font-down').onclick = () => {
        if (currentFontSize > 10) {
            currentFontSize -= 2;
            updateFontSize();
        }
    };

    win.querySelector('#btn-save').onclick = () => {
        const text = editor.innerText;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Nota_ZezinOS.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    win.querySelector('#btn-email').onclick = () => {
        const textContent = editor.innerText;
        if (!textContent.trim()) return;

        const subject = encodeURIComponent("Contact via ZezinOS");
        const body = encodeURIComponent(textContent);

        window.open(`mailto:${myEmail}?subject=${subject}&body=${body}`, '_self');
    };

    const closeBtn = win.querySelector('.title-bar-controls button[aria-label="Close"]');

    if (closeBtn) {
        closeBtn.addEventListener('mousedown', () => {
            editor.innerHTML = '';
            editor.innerText = '';
        });
    }
}