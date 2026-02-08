import { createWindow } from '../modules/windowFactory.js';

const wallpapers = [
    { 
        id: 'win98', 
        name: 'Clássico (Zezin OS)', 
        style: 'background-color: #008080; background-image: none;' 
    },
    { 
        id: 'clouds', 
        name: 'Nuvens - Microsoft', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp2807966.jpg"); background-size: cover;' 
    },
    { 
        id: 'megera', 
        name: 'Solidão de Megera', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp4307675.jpg"); background-size: cover;' 
    },
    { 
        id: 'neko', 
        name: 'Neko Neko', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp5078797.jpg"); background-size: cover;' 
    },
    { 
        id: 'night', 
        name: 'Night City', 
        style: 'background-image: url("https://raw.githubusercontent.com/this-fifo/vaporwave-theme-vscode/refs/heads/master/vaporwaveisnotdead.png"); background-size: cover;' 
    },
    { 
        id: 'eva', 
        name: 'Evangelion', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp4307544.png"); background-size: cover;' 
    },
    { 
        id: 'gameBoy', 
        name: 'Game Boy Arcano', 
        style: 'background-image: url("https://i.postimg.cc/VvWgCJ93/08-(1).png"); background-size: cover;' 
    }, 
    {
        id: 'mei', 
        name: 'Mei - Overwatch', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp5078793.jpg"); background-size: cover;' 
    },
    {
        id: '64', 
        name: 'N64', 
        style: 'background-image: url("https://i.postimg.cc/HWcyKcf9/17.jpg"); background-size: cover;' 
    },
    {
        id: 'water', 
        name: 'Waterwave', 
        style: 'background-image: url("https://i.postimg.cc/858SzYzB/32.jpg"); background-size: cover;' 
    },
    {
        id: 'megumin', 
        name: 'Megumin', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp1895678.jpg"); background-size: cover;' 
    },
    {
        id: 'win95', 
        name: 'Windows 95 CRT - Microsoft', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp1895686.jpg"); background-size: cover;' 
    },
    {
        id: 'eyes', 
        name: 'Look at my eyes', 
        style: 'background-image: url("https://wallpapercave.com/wp/wp6274450.jpg"); background-size: cover;' 
    }
];

let selectedWallpaperStyle = wallpapers[0].style;
let currentEffect = 'none';

export function setWallpaper(id) {
    const wp = wallpapers.find(w => w.id === id);
    if (wp) {
        selectedWallpaperStyle = wp.style;
        const desktop = document.querySelector('.desktop-area');
        if (desktop) {
            desktop.style = ''; 
            desktop.style.cssText = wp.style + ' background-position: center center;';
        }
    }
}

export function renderWallpaper() {
    createWindow({
        id: 'window-wallpaper',
        title: 'Propriedades de Vídeo',
        isCentered: true,
        content: `
            <div class="monitor-container">
                <div class="monitor-bezel">
                    <div class="monitor-screen">
                        <div id="wallpaper-preview-screen" class="preview-content" style="position: relative;"></div>
                    </div>
                    <div class="monitor-logo">JM-WORKS</div>
                    <div class="monitor-controls">
                        <span></span><span></span><span></span>
                    </div>
                </div>
                <div class="monitor-stand"></div>
                <div class="monitor-base"></div>
            </div>

            <div class="wallpaper-controls-area">
                <fieldset>
                    <legend>Papel de Parede</legend>
                    <div class="wp-selection-row">
                        <ul class="wp-list" id="wallpaper-list"></ul>
                    </div>
                </fieldset>

                <fieldset style="margin-top: 6px;">
                    <legend>Filtro de Monitor</legend>
                    <div style="display: flex; align-items: center; gap: 6px; padding: 2px;">
                        <img src="./public/icons/logo.svg" style="width:16px; opacity:0.5;">
                        
                        <select id="monitor-effect-select" onchange="updatePreviewEffect(this.value)" style="width: 100%;">
                            <option value="none">Monitor Padrão (LCD)</option>
                            <option value="vga">Monitor VGA (Estático)</option>
                            <option value="trinitron">Monitor Trinitron (Aperture Grille)</option>
                            <option value="tv">TV de Tubo (Composto)</option>
                            <option value="green">Terminal Fósforo Verde</option>
                            <option value="amber">Terminal Fósforo Âmbar</option>
                        </select>

                    </div>
                </fieldset>
            </div>

            <div class="window-actions" style="justify-content: flex-end; margin-top: 10px; display: flex; gap: 5px;">
                <button class="win-btn" onclick="applyWallpaper()">Aplicar</button>
                <button class="win-btn" onclick="closeWindow('window-wallpaper')">OK</button>
                <button class="win-btn" onclick="closeWindow('window-wallpaper')">Cancelar</button>
            </div>
        `
    });

    const win = document.getElementById('window-wallpaper');
    if (win) win.style.width = '380px';

    const listElement = document.getElementById('wallpaper-list');
    const previewScreen = document.getElementById('wallpaper-preview-screen');
    const effectSelect = document.getElementById('monitor-effect-select');

    const globalOverlay = document.querySelector('.crt-overlay');
    let activeEffect = 'none';
    if (globalOverlay && globalOverlay.classList.contains('active')) {
        if (globalOverlay.classList.contains('effect-vga')) activeEffect = 'vga';
        else if (globalOverlay.classList.contains('effect-trinitron')) activeEffect = 'trinitron';
        else if (globalOverlay.classList.contains('effect-green')) activeEffect = 'green';
        else if (globalOverlay.classList.contains('effect-amber')) activeEffect = 'amber';
        else if (globalOverlay.classList.contains('effect-tv')) activeEffect = 'tv';
    }
    
    if (effectSelect) {
        effectSelect.value = activeEffect;
        currentEffect = activeEffect; 
    }

    if (previewScreen) {
        updatePreview(previewScreen, selectedWallpaperStyle);
        applyEffectToPreview(previewScreen, activeEffect);
    }

    listElement.innerHTML = '';
    wallpapers.forEach((wp) => {
        const li = document.createElement('li');
        li.innerText = wp.name;
        li.dataset.style = wp.style;
        if (wp.style === selectedWallpaperStyle) li.classList.add('selected');

        li.onclick = () => {
            document.querySelectorAll('.wp-list li').forEach(item => item.classList.remove('selected'));
            li.classList.add('selected');
            selectedWallpaperStyle = wp.style;
            updatePreview(previewScreen, wp.style);
        };
        listElement.appendChild(li);
    });

    window.updatePreviewEffect = (effectValue) => {
        currentEffect = effectValue;
        const preview = document.getElementById('wallpaper-preview-screen');
        if (preview) {
            applyEffectToPreview(preview, effectValue);
        }
    };

    window.applyWallpaper = () => {
        const desktop = document.querySelector('.desktop-area');
        if (desktop) {
            desktop.style = ''; 
            desktop.style.cssText = selectedWallpaperStyle + ' background-position: center center;';
        }

        const overlay = document.querySelector('.crt-overlay');
        if (overlay) {
            overlay.className = 'crt-overlay'; 
            if (currentEffect !== 'none') {
                overlay.classList.add('active');
                overlay.classList.add(`effect-${currentEffect}`);
            }
        }
    };
}

function updatePreview(element, styleString) {
    if(!element) return;
    element.style = '';
    element.style.cssText = styleString + ' background-position: center center; position: relative;';
}

function applyEffectToPreview(element, effect) {
    element.classList.remove('crt-active', 'effect-vga', 'effect-trinitron', 'effect-green', 'effect-amber', 'effect-tv');
    
    if (effect !== 'none') {
        element.classList.add('crt-active');
        element.classList.add(`effect-${effect}`);
    }
}