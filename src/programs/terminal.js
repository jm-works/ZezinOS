import { createWindow } from '../modules/windowFactory.js';
import { initTerminal as startTerminalLogic } from '../modules/terminal.js';

export function renderTerminal() {
    const toolbarHTML = `
        <select class="toolbar-select"><option>Auto</option><option>4 x 6</option></select>
        <div class="toolbar-separator"></div>
        <button class="toolbar-btn">⬚</button> 
        <button class="toolbar-btn">❐</button> 
        <button class="toolbar-btn">📋</button>
        <div class="toolbar-separator"></div>
        <button class="toolbar-btn">A</button>
    `;

    const bodyHTML = `
        <div class="terminal-output" id="terminal-output">
            <div>JM-WORKS(R) ZezinOS</div>
            <div>(C) Copyright JM-WORKS Inc 1981-1998.</div>
            <br>
        </div>
        <div class="input-line">
            <span class="prompt-label">C:\\Users\\Zezin&gt;</span>
            <input type="text" id="cmd-input" class="cmd-input" autocomplete="off" spellcheck="false">
        </div>
    `;

    createWindow({
        id: 'window-terminal',
        title: 'ZEZIN-DOS Prompt',
        toolBar: toolbarHTML,
        content: bodyHTML,
        isCentered: true
    });

    const terminalBody = document.querySelector('#window-terminal .window-body');
    if(terminalBody) {
        terminalBody.onclick = () => document.getElementById('cmd-input').focus();
    }

    startTerminalLogic(); 
}