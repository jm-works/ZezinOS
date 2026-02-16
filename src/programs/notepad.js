import { createWindow } from '../modules/windowFactory.js';

export function renderNotepad() {
    const winId = 'window-notepad';
    
    if (document.getElementById(winId)) return;

    const myEmail = "jmatheus_vida@outlook.com";
    let currentFontSize = 14;

    const content = `
        <div class="notepad-toolbar">
            <button class="notepad-btn" id="btn-save" title="Salvar .txt">💾</button>
            <button class="notepad-btn" id="btn-email" title="Enviar Email">📧</button>
            
            <div class="notepad-separator"></div>
            
            <button class="notepad-btn" id="btn-bold" title="Negrito"><b>B</b></button>
            <button class="notepad-btn" id="btn-italic" title="Itálico"><i>I</i></button>
            <button class="notepad-btn" id="btn-underline" title="Sublinhado"><u>U</u></button>

            <div class="notepad-separator"></div>

            <button class="notepad-btn" id="btn-font-down" title="Diminuir">A-</button>
            <button class="notepad-btn" id="btn-font-up" title="Aumentar">A+</button>
        </div>

        <div class="notepad-editor" id="notepad-area" contenteditable="true" spellcheck="false"></div>
    `;

    createWindow({
        id: winId,
        title: 'Bloco de Notas',
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

        const subject = encodeURIComponent("Contato via ZezinOS");
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