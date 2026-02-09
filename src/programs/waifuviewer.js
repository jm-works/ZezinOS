import { createWindow } from '../modules/windowFactory.js';

export function renderWaifuViewer() {
    const winId = 'window-waifuviewer';
    
    let scale = 1;
    let panning = false;
    let pointX = 0;
    let pointY = 0;
    let startX = 0;
    let startY = 0;

    createWindow({
        id: winId,
        title: 'Waifu Viewer',
        isCentered: true,
        content: `
            <div class="wf-toolbar">
                <div class="wf-toolbar-group">
                    <button class="wf-tool-btn" onclick="wmGenerate('neko')" title="Gerar Neko">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right:4px; shape-rendering: crispEdges;">
                            <path d="M2 2h2v2H2zM12 2h2v2h-2zM1 4h1v2H1zM14 4h1v2h-1zM1 6h2v2H1zM13 6h2v2h-2zM1 8h1v3h1v2h2v1h6v-1h2v-2h1V8h-1V6h-2v2h-2V6H4v2H2V6H1zm3 2h2v2H4zm6 0h2v2h-2z"/>
                        </svg>
                        Neko
                    </button>
                    <button class="wf-tool-btn" onclick="wmGenerate('waifu')" title="Gerar Waifu">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right:4px; shape-rendering: crispEdges;">
                            <path d="M4 1h8v2H4zM2 3h2v2H2zM12 3h2v2h-2zM1 5h1v3H1zM14 5h1v3h-1zM1 8h2v2H1zM13 8h2v2h-2zM1 10h1v2H1zM14 10h1v2h-1zM2 12h2v2h2v1h4v-1h2v-2h2v-2h-1v2h-2v2h-1v1H6v-1H5v-2H3v-2H2zM5 6h2v2H5zm4 0h2v2H9z"/>
                        </svg>
                        Waifu
                    </button>
                </div>
                <div class="wf-toolbar-separator"></div>
                <div class="wf-toolbar-group">
                    <button class="wf-tool-btn" onclick="wmResetView()" title="Resetar Zoom (1:1)">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right:4px; shape-rendering: crispEdges;">
                            <path d="M6 1a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 3.535-1.465l3.758 3.758 1.414-1.414-3.758-3.758A5 5 0 0 0 6 1zm0 2a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3zm-1 2h2v1H7v2H5V6H3V5h2Z"/>
                        </svg>
                        1:1
                    </button>
                </div>
                <div class="wf-toolbar-separator"></div>
                <div class="wf-toolbar-group">
                    <button class="wf-tool-btn" onclick="wmSaveImage()" title="Salvar imagem">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right:4px; shape-rendering: crispEdges;">
                            <path d="M2 1v14h12V4l-3-3H2zm1 1h7v3H3V2zm0 12V9h10v5H3zM5 3h1v1H5V3zm1 7h4v1H6v-1zm0 2h4v1H6v-1z"/>
                        </svg>
                        Salvar
                    </button>
                    <button class="wf-tool-btn" onclick="wmClear()" title="Limpar">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right:4px; shape-rendering: crispEdges;">
                            <path d="M5 1h6v1H5zM2 3h12v2H2zM3 6h10v8H3zM5 7h2v6H5zm4 0h2v6H9z"/>
                        </svg>
                        Limpar
                    </button>
                </div>
            </div>

            <div class="wf-view-area" id="wf-view-container">
                <div id="wf-loading-overlay" class="wf-loading" style="display: none;">
                    <span style="font-style: italic;">Carregando imagem...</span>
                </div>
                
                <div id="wf-transform-layer" style="transform-origin: center center; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                    <img id="wf-current-image" src="" style="display: none;">
                </div>
                
                <div id="wf-placeholder">
                    <div>Nenhuma imagem carregada.</div>
                </div>
            </div>

            <div class="wf-statusbar">
                <div class="wf-status-panel" id="wf-status-main" style="flex: 2;">Pronto</div>
                <div class="wf-status-panel" id="wf-status-dim" style="width: 100px;"></div>
                <div class="wf-status-panel" id="wf-status-zoom" style="width: 60px;">100%</div>
            </div>
        `
    });

    const win = document.getElementById(winId);
    if (win) {
        win.style.width = '800px';
        win.style.height = '600px';
        
        const container = win.querySelector('#wf-view-container');
        const layer = win.querySelector('#wf-transform-layer');
        const img = win.querySelector('#wf-current-image');
        const statusZoom = win.querySelector('#wf-status-zoom');

        const updateTransform = () => {
            layer.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
            statusZoom.innerText = `${Math.round(scale * 100)}%`;
        };

        container.addEventListener('wheel', (e) => {
            if (img.style.display === 'none') return;
            e.preventDefault();
            const delta = -Math.sign(e.deltaY);
            const nextScale = (delta > 0) ? (scale * 1.1) : (scale / 1.1);
            if (nextScale > 5 || nextScale < 0.1) return;
            scale = nextScale;
            updateTransform();
        });

        container.addEventListener('mousedown', (e) => {
            if (img.style.display === 'none') return;
            e.preventDefault();
            panning = true;
            startX = e.clientX - pointX;
            startY = e.clientY - pointY;
            container.style.cursor = 'move';
        });

        window.addEventListener('mousemove', (e) => {
            if (!panning) return;
            e.preventDefault();
            pointX = e.clientX - startX;
            pointY = e.clientY - startY;
            updateTransform();
        });

        window.addEventListener('mouseup', () => {
            panning = false;
            if(container) container.style.cursor = 'default';
        });

        window.wmResetView = () => {
            scale = 1; pointX = 0; pointY = 0;
            updateTransform();
        };
    }

    const showStatusError = (msg) => {
        const status = document.getElementById('wf-status-main');
        if (status) {
            status.innerText = msg;
            status.style.color = 'red'; 
            setTimeout(() => { status.style.color = 'black'; }, 3000);
        }
        console.error(msg);
    };

    window.wmGenerate = async (type) => {
        const img = document.getElementById('wf-current-image');
        const placeholder = document.getElementById('wf-placeholder');
        const loader = document.getElementById('wf-loading-overlay');
        const status = document.getElementById('wf-status-main');
        const dimStatus = document.getElementById('wf-status-dim');

        if (!img || !loader) return;

        loader.style.display = 'flex';
        img.style.display = 'none';
        placeholder.style.display = 'none';
        
        status.innerText = "Conectando ao servidor...";
        status.style.color = 'black';
        dimStatus.innerText = "";

        if (window.wmResetView) window.wmResetView();

        try {
            let url = '';
            if (type === 'neko') {
                status.innerText = "Solicitando (Nekosia)...";
                const res = await fetch('https://api.nekosia.cat/api/v1/images/catgirl');
                const data = await res.json();
                if (data.image?.original) url = data.image.original.url;
                else throw new Error("Dados inválidos.");
            } else {
                status.innerText = "Solicitando (Waifu.pics)...";
                const res = await fetch('https://api.waifu.pics/sfw/waifu');
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (data.url) url = data.url;
                else throw new Error("Sem imagem.");
            }

            img.onload = () => {
                loader.style.display = 'none';
                img.style.display = 'block';
                status.innerText = "Concluído";
                dimStatus.innerText = `${img.naturalWidth} x ${img.naturalHeight} px`;
            };

            img.onerror = () => {
                loader.style.display = 'none';
                placeholder.style.display = 'flex';
                showStatusError("Erro ao baixar imagem.");
            };

            status.innerText = "Baixando imagem...";
            img.src = url; 
            
        } catch (error) {
            loader.style.display = 'none';
            placeholder.style.display = 'flex';
            showStatusError(`Erro: ${error.message}`);
        }
    };

    window.wmClear = () => {
        const img = document.getElementById('wf-current-image');
        const placeholder = document.getElementById('wf-placeholder');
        if(img) { img.src = ""; img.style.display = 'none'; }
        if(placeholder) placeholder.style.display = 'flex';
        
        const status = document.getElementById('wf-status-main');
        if(status) {
            status.innerText = "Pronto";
            status.style.color = 'black';
        }
        
        document.getElementById('wf-status-dim').innerText = "";
        if(window.wmResetView) window.wmResetView();
    };

    window.wmSaveImage = () => {
        const img = document.getElementById('wf-current-image');
        if (img && img.src && img.style.display !== 'none') {
            window.open(img.src, '_blank');
        } else {
            showStatusError("Nenhuma imagem para salvar.");
        }
    };
}