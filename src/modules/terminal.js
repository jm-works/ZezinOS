import { openWindow, closeWindow } from './windowManager.js';

const commands = {
    // Atalhos
    'help': () => {
        return `
    Comandos disponíveis:
    ---------------------
    PROGRAMS  - Abre a lista de programas
    CLS       - Limpa a tela
    DATE      - Mostra a data atual
    GITHUB    - Abre meu GitHub
    SURPRISE  - Digite e descubra
    EXIT      - Fecha o terminal
    HELP      - Mostra essa lista
        `;
    },
    'programs': () => {
        return `
    Comandos disponíveis:
    ---------------------
    ABOUT  - Abrir 'Sobre Mim'
    NOTES  - Abrir 'Patch Notes'
        `;
    },

    // Programas
    'about': () => {
        openWindow('window-about');
        return "Abrindo janela 'Sobre Mim'...";
    },
    'notes': () => {
        openWindow('window-patchnotes');
        return "Abrindo janela 'Patch Notes'...";
    },

    // Comandos Gerais
    'cls': () => {
        document.getElementById('terminal-output').innerHTML = '';
        return null;
    },
    'clear': () => {
        document.getElementById('terminal-output').innerHTML = '';
        return null; 
    },
    'date': () => {
        return new Date().toString();
    },
    'github': () => {
        window.open('https://github.com/jm-works', '_blank');
        return "Abrindo GitHub no navegador...";
    },
    'exit': () => {
        closeWindow('window-terminal');
        return null;
    },

    // Segredos
    'vasco': () => {
        return "GIGANTE DA COLINA!";
    },
    'surprise': () => {
        window.open('https://shattereddisk.github.io/rickroll/rickroll.mp4', '_blank');
        return "Abrindo a sua surpresa no navegador...";
    },
    'neofetch': () => {
        const width = window.screen.width;
        const height = window.screen.height;
        const uptime = Math.floor(performance.now() / 60000);
        const browser = navigator.userAgent.includes("Chrome") ? "Chrome" : "Web Browser";
        return `
 ⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕   ZEZIN@ZezinOS
 ⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕   -------------
 ⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱   OS: ZezinOS (Web Edition)
 ⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀   Host: ${browser}
 ⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗   Uptime: ${uptime} mins
 ⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕   Resolution: ${width}x${height}
 ⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵   Shell: ZEZIN-DOS
 ⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿   Theme: ZezinOS 98 SE
 ⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿   CPU: Intel Celeron 266
 ⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁   GPU: ASCII Graphics Adapter
        `;
    },
};

export function initTerminal() {
    const input = document.getElementById('cmd-input');
    const output = document.getElementById('terminal-output');

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const fullCommand = input.value.trim();
            
            if (fullCommand) {
                addLine(`C:\\Users\\Zezin> ${fullCommand}`);
                processCommand(fullCommand);
            } else {
                addLine(`C:\\Users\\Zezin>`);
            }
            input.value = '';
            scrollToBottom();
        }
    });

    function processCommand(cmdString) {
        const args = cmdString.split(' ');
        const cmd = args[0].toLowerCase();
        
        if (commands[cmd]) {
            const response = commands[cmd](args.slice(1).join(' '));
            if (response) addLine(response);
        } else {
            addLine(`'${cmd}' não é reconhecido como um comando interno ou externo.`);
        }
    }

    function addLine(text) {
        const div = document.createElement('div');
        div.style.whiteSpace = 'pre-wrap'; 
        div.textContent = text;
        output.appendChild(div);
    }

    function scrollToBottom() {
        const windowBody = document.querySelector('#window-terminal .window-body');
        windowBody.scrollTop = windowBody.scrollHeight;
    }
}