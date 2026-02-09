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
    MEDIA  - Abrir 'Media Player'
    VIDEO  - Abrir 'Propriedades de Video'
    WAIFU  - Abrir 'Waifu Viewer'
    CALC   - Abrir 'Calculadora'
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
    'media': () => {
        openWindow('window-mediaplayer');
        return "Abrindo janela 'Media Player'...";
    },
    'video': () => {
        openWindow('window-wallpaper');
        return "Abrindo janela 'Propriedades de Video'...";
    },
    'waifu': () => {
        openWindow('window-waifuviewer');
        return "Abrindo janela 'Waifu Viewer'...";
    },
    'calc': () => {
        openWindow('window-calculator');
        return "Abrindo janela 'Calculadora'...";
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
        return `
    Vamos todos cantar de coração
    A Cruz de Malta é o meu pendão
    Tu tens o nome do heroico português
    Vasco da Gama, a tua fama assim se fez

    Tua imensa torcida é bem feliz
    Norte-Sul, Norte-Sul deste Brasil
    Tua estrela, na terra a brilhar
    Ilumina o mar

    No atletismo és um braço
    No remo és imortal
    No futebol és o traço
    De união Brasil-Portugal
        `;
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
    'sudo': () => {
        const user = "Zezin";
        return `
    ${user} is not in the sudoers file. This incident will be reported.
        `;
    },
    'crash': () => {
        const bsod = document.createElement('div');
        Object.assign(bsod.style, {
            position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
            backgroundColor: '#0000AA', color: 'white', fontFamily: '"Courier New", monospace',
            zIndex: '99999', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontWeight: 'bold'
        });

        bsod.innerHTML = `
            <div style="text-align: center; max-width: 800px;">
                <p style="background: white; color: #0000AA; display: inline-block; padding: 2px; margin-bottom: 20px;">ZezinOS</p>
                <p>Ocorreu um erro fatal 0E em 0028:C0011E36 no VXD VMM(01) + 00010E36.</p>
                <p>O aplicativo atual será encerrado.</p>
                <br>
                <p>* Pressione qualquer tecla para retornar ao ZezinOS.</p>
                <p>* Pressione ALT+F4 para reiniciar o computador.</p>
            </div>
        `;
        document.body.appendChild(bsod);

        const removeBsod = () => {
            bsod.remove();
            document.removeEventListener('keydown', removeBsod);
            document.removeEventListener('click', removeBsod);
        };
        
        setTimeout(() => {
            document.addEventListener('keydown', removeBsod);
            document.addEventListener('click', removeBsod);
        }, 500);

        return "SYSTEM HALTED";
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