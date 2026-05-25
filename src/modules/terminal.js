import { openWindow, closeWindow } from './windowManager.js';

const commands = {
    // Atalhos
    'help': () => {
        return `
    Available commands:
    ---------------------
    PROGRAMS  - Open programs list
    CLS       - Clear the screen
    DATE      - Show current date
    GITHUB    - Open my GitHub
    SURPRISE  - Type and discover
    EXIT      - Close the terminal
    HELP      - Show this list
        `;
    },
    'programs': () => {
        return `
    Available commands:
    ---------------------
    ABOUT  - Open 'About Me'
    NOTES  - Open 'Patch Notes'
    MEDIA  - Open 'Media Player'
    VIDEO  - Open 'Display Properties'
    WAIFU  - Open 'Waifu Viewer'
    CALC   - Open 'Calculator'
    NOTEP  - Open 'Notepad'
    PAINT  - Open 'ZezinPaint'
    INTER  - Open 'My Projects'
    ---------------------
    GAMES  - Show game shortcuts
        `;
    },
    'games': () => {
        return `
    Available commands:
    ---------------------
    MSDOS  - Open 'MS-DOS GAMES'
    GTA    - Open 'GTA Vice City'
    MINE   - Open 'Minesweeper'
        `;
    },

    // Programas
    'about': () => {
        openWindow('window-about');
        return "Opening 'About Me' window...";
    },
    'notes': () => {
        openWindow('window-patchnotes');
        return "Opening 'Patch Notes' window...";
    },
    'media': () => {
        openWindow('window-mediaplayer');
        return "Opening 'Media Player' window...";
    },
    'video': () => {
        openWindow('window-wallpaper');
        return "Opening 'Display Properties' window...";
    },
    'waifu': () => {
        openWindow('window-waifuviewer');
        return "Opening 'Waifu Viewer' window...";
    },
    'calc': () => {
        openWindow('window-calculator');
        return "Opening 'Calculator' window...";
    },
    'paint': () => {
        openWindow('window-zezinpaint');
        return "Opening 'ZezinPaint' window...";
    },
    'notep': () => {
        openWindow('window-notepad');
        return "Opening 'Notepad' window...";
    },
    'inter': () => {
        openWindow('window-internet');
        return "Opening 'My Projects' window...";
    },

    // Jogos
    'msdos': () => {
        openWindow('window-dosgames');
        return "Opening 'MS-DOS GAMES' window...";
    },
    'gta': () => {
        openWindow('window-aracaju');
        return "Opening 'GTA Vice City' window...";
    },
    'mine': () => {
        openWindow('window-minesweeper');
        return "Opening 'Minesweeper' window...";
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
        return "Opening GitHub in browser...";
    },
    'sudo': () => {
        const user = "Zezin";
        return `
    ${user} is not in the sudoers file. This incident will be reported.
        `;
    },
    'whoami': () => {
        return "zezin-os\\zezin";
    },
    'ver': () => {
        return `
    ZezinOS 98 SE Edition [Version 1.0.0]
        `;
    },
    'ipconfig': async () => {
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            const data = await res.json();
            const ip = data.ip;

            return `
    ZezinOS IP Configuration

    Ethernet adapter Local Area Connection:

       Connection-specific DNS Suffix  . : localdomain
       IPv4 Address. . . . . . . . . . . : ${ip}
       Subnet Mask . . . . . . . . . . . : 255.255.255.0
       Default Gateway . . . . . . . . . : 192.168.1.1
            `;
        } catch (error) {
            return "Error: Could not determine IP address (Check your connection).";
        }
    },
    'exit': () => {
        closeWindow('window-terminal');
        return null;
    },

    // Brincadeiras
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
        window.open('https://taromati2.github.io/rickroll/', '_blank');
        return "Opening your surprise in the browser...";
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
 ⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿   CPU: 486DX2-66
 ⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁   GPU: ASCII Graphics Adapter
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
                <p>A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36.</p>
                <p>The current application will be terminated.</p>
                <br>
                <p>* Press any key to return to ZezinOS.</p>
                <p>* Press ALT+F4 to restart your computer.</p>
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

    input.addEventListener('keydown', function (event) {
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

    async function processCommand(cmdString) {
        const args = cmdString.split(' ');
        const cmd = args[0].toLowerCase();

        if (commands[cmd]) {
            const response = await commands[cmd](args.slice(1).join(' '));

            if (response) {
                addLine(response);
                scrollToBottom();
            }
        } else {
            addLine(`'${cmd}' is not recognized as an internal or external command.`);
            scrollToBottom();
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