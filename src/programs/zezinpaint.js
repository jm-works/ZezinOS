import { createWindow } from '../modules/windowFactory.js';

export function renderZezinPaint() {
    const winId = 'window-zezinpaint';
    if (document.getElementById(winId)) return;

    const tools = [
        {id:'select',icon:'public/icons/paint/select.png', emoji:'⬚', t:'Selecionar'}, 
        {id:'eraser',icon:'public/icons/paint/eraser.png', emoji:'🧼', t:'Borracha'}, 
        {id:'bucket',icon:'public/icons/paint/bucket.png', emoji:'🪣', t:'Balde de Tinta'}, 
        {id:'picker',icon:'public/icons/paint/picker.png', emoji:'💉', t:'Conta-gotas'},
        {id:'pencil',icon:'public/icons/paint/pencil.png', emoji:'✏️', t:'Lápis (Textura)'}, 
        {id:'brush',icon:'public/icons/paint/brush.png', emoji:'🖌️', t:'Pincel'},
        {id:'spray',icon:'public/icons/paint/spray.png', emoji:'🚿', t:'Spray'}, 
        {id:'text',icon:'public/icons/paint/text.png', emoji:'A', t:'Texto'},
        {id:'line',icon:'public/icons/paint/line.png', emoji:'📏', t:'Linha'}, 
        {id:'rect',icon:'public/icons/paint/rect.png', emoji:'▭', t:'Retângulo'},
        {id:'circle',icon:'public/icons/paint/circle.png', emoji:'◯', t:'Círculo'}, 
        {id:'clean',icon:'public/icons/paint/clean.png', emoji:'🗑️', t:'Limpar Tela'}
    ];

    const colors = [
        '#000000', '#404040', '#808080', '#800000', '#804000', '#808000',
        '#004000', '#008000', '#008080', '#004080', '#000080', '#400080',
        '#800080', '#800040', '#804040', '#408080', '#FFFFFF', '#C0C0C0',
        '#FF0000', '#FF8040', '#FFFF00', '#80FF00', '#00FF00', '#00FFFF',
        '#0080FF', '#0000FF', '#8000FF', '#FF00FF', '#FF0080', '#FF8080', 
        '#FFC0A0', '#FFFF80' 
    ];

    const content = `
        <div class="zp-menubar">
            <span id="zp-menu-open" style="cursor:pointer;" title="Abrir imagem"><u>A</u>brir</span>
            <span id="zp-menu-save" style="cursor:pointer;" title="Salvar (Baixar .png)"><u>S</u>alvar</span>
        </div>
        <div class="zp-main">
            <div class="zp-left-panel">
                <div class="zp-toolbar">
                    ${tools.map(t=>`<div class="zp-tool" title="${t.t}" data-tool="${t.id}">
                        <img src="${t.icon}" style="width:16px; height:16px; display:block; image-rendering:pixelated;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                        <span style="display:none; font-size:16px;">${t.emoji}</span>
                    </div>`).join('')}
                </div>
                <div class="zp-tool-options" style="
                    display:flex; 
                    flex-direction:column; 
                    align-items:center; 
                    justify-content: flex-start;
                    gap:2px; 
                    padding:4px; 
                    background: #c0c0c0; 
                    border: 1px inset white; 
                    min-height: 60px;
                    margin-top: 5px;
                " id="zp-opts-container">
                </div>
            </div>
            <div class="zp-canvas-container" id="zp-container" style="position:relative; background-color:#808080; overflow:auto;">
                <div id="zp-scroll-content" style="width: 800px; height: 600px; position: relative;">
                    <div id="zp-canvas-wrapper" style="transform-origin: 0 0; position: absolute; top:0; left:0;">
                        <canvas id="zp-canvas" width="800" height="600" style="background:#fff; box-shadow:2px 2px 0 #000; position:absolute; top:0; left:0;"></canvas>
                        <canvas id="zp-temp-canvas" width="800" height="600" style="position:absolute; top:0; left:0; pointer-events:none;"></canvas>
                        <div id="zp-cursor" style="position:absolute; pointer-events:none; border:1px solid #000; z-index:999; display:none;"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="zp-footer">
            <div class="zp-active-colors">
                <div class="zp-ac-box" id="zp-fg" style="background:black;left:3px;top:3px;z-index:2;" title="Frente"></div>
                <div class="zp-ac-box" id="zp-bg" style="background:white;right:2px;bottom:2px;z-index:1;" title="Fundo"></div>
            </div>
            <div class="zp-palette" style="display: grid; grid-template-columns: repeat(16, 15px); gap: 2px; width: auto; padding-left: 5px;">
                ${colors.map(c=>`<div class="zp-swatch" style="background:${c}; width:15px; height:15px; border:1px solid #808080; box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #000;" data-color="${c}"></div>`).join('')}
            </div>
        </div>
        <div class="zp-statusbar"><span id="zp-status">Pronto. (Ctrl+V para colar imagem)</span></div>
        <input type="file" id="zp-file-input" accept="image/*" style="display:none;">
    `;

    createWindow({
        id: winId,
        title: 'ZezinPaint',
        content: content,
        width: 860, height: 650, isCentered: true, resizable: true 
    });

    initNativeEngine(winId);
}

function initNativeEngine(winId) {
    const win = document.getElementById(winId);
    const container = win.querySelector('#zp-container');
    const scrollContent = win.querySelector('#zp-scroll-content');
    const wrapper = win.querySelector('#zp-canvas-wrapper');
    const canvas = win.querySelector('#zp-canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    const tempCanvas = win.querySelector('#zp-temp-canvas');
    const tempCtx = tempCanvas.getContext('2d');
    const cursor = win.querySelector('#zp-cursor');
    const optsContainer = win.querySelector('#zp-opts-container');
    const fileInput = win.querySelector('#zp-file-input');
    
    ctx.imageSmoothingEnabled = true;
    tempCtx.imageSmoothingEnabled = true;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const state = {
        tool: 'brush',
        fg: '#000000', bg: '#ffffff',
        size: 5,
        textSize: 16, 
        zoom: 1, 
        isSpaceDown: false, 
        isPanning: false,
        panStartX: 0, panStartY: 0,
        panScrollX: 0, panScrollY: 0,
        isDrawing: false,
        startX: 0, startY: 0,
        selection: null, 
        dragAction: null,
        dragOffsetX: 0, dragOffsetY: 0,
        isSelecting: false,
        pencilPattern: null
    };

    let lastPointerEvent = null; 

    const menuOpen = win.querySelector('#zp-menu-open');
    const menuSave = win.querySelector('#zp-menu-save');

    [menuOpen, menuSave].forEach(el => {
        el.addEventListener('pointerdown', (e) => e.stopPropagation());
        el.addEventListener('mousedown', (e) => e.stopPropagation());
    });

    menuOpen.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    menuSave.addEventListener('click', (e) => {
        e.stopPropagation(); 
        commitSelection(); 
        if(activeTextInput) commitText(activeTextInput);

        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'Sem_título.png';
        link.href = dataURL;
        
        win.appendChild(link);
        link.click();
        win.removeChild(link);
        
        win.querySelector('#zp-status').innerText = 'Imagem salva com sucesso!';
        setTimeout(() => { win.querySelector('#zp-status').innerText = 'Pronto. (Ctrl+V para colar imagem)'; }, 3000);
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            loadImageAsSelection(url);
        }
        e.target.value = ''; 
    });

    function loadImageAsSelection(url) {
        const img = new Image();
        img.onload = () => {
            let drawWidth = img.width;
            let drawHeight = img.height;

            if (drawWidth > canvas.width || drawHeight > canvas.height) {
                const ratioX = canvas.width / drawWidth;
                const ratioY = canvas.height / drawHeight;
                const ratio = Math.min(ratioX, ratioY);
                drawWidth = drawWidth * ratio;
                drawHeight = drawHeight * ratio;
            }

            commitSelection();
            
            win.querySelectorAll('.zp-tool').forEach(x => x.classList.remove('active'));
            win.querySelector('[data-tool="select"]').classList.add('active');
            state.tool = 'select';

            const imgCanvas = document.createElement('canvas');
            imgCanvas.width = drawWidth;
            imgCanvas.height = drawHeight;
            const imgCtx = imgCanvas.getContext('2d');
            imgCtx.imageSmoothingEnabled = true;
            imgCtx.drawImage(img, 0, 0, drawWidth, drawHeight);

            state.selection = { 
                x: 0, 
                y: 0, 
                w: drawWidth, 
                h: drawHeight, 
                angle: 0, 
                canvas: imgCanvas 
            };
            
            drawSelectionUI();
            renderToolOptions();

            URL.revokeObjectURL(url); 
            win.querySelector('#zp-status').innerText = 'Imagem pronta para posicionar.';
            setTimeout(() => { win.querySelector('#zp-status').innerText = 'Pronto. (Ctrl+V para colar imagem)'; }, 3000);
        };
        img.src = url;
    }

    win.addEventListener('paste', (e) => {
        if (e.clipboardData && e.clipboardData.items) {
            const items = e.clipboardData.items;
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    const blob = items[i].getAsFile();
                    const url = URL.createObjectURL(blob);
                    loadImageAsSelection(url);
                    break; 
                }
            }
        }
    });
    if(win.querySelector('.zp-canvas-container')) win.querySelector('.zp-canvas-container').tabIndex = 0;

    function updatePencilPattern(color) {
        const pCanvas = document.createElement('canvas');
        pCanvas.width = 4; 
        pCanvas.height = 4;
        const pCtx = pCanvas.getContext('2d');
        
        pCtx.fillStyle = color;
        pCtx.globalAlpha = 0.6; 
        pCtx.fillRect(0, 0, 4, 4);
        
        pCtx.globalAlpha = 1.0; 
        pCtx.fillRect(0, 0, 1, 1);
        pCtx.fillRect(2, 2, 1, 1);
        pCtx.fillRect(3, 0, 1, 1);
        pCtx.fillRect(1, 3, 1, 1);

        state.pencilPattern = ctx.createPattern(pCanvas, 'repeat');
    }
    updatePencilPattern('#000000');

    function renderToolOptions() {
        optsContainer.innerHTML = ''; 
        let sizes = [];
        let type = 'line';

        if (['brush'].includes(state.tool)) {
            sizes = [3, 5, 8, 12];
            type = 'circle';
        } else if (['eraser'].includes(state.tool)) {
            sizes = [4, 6, 8, 10];
            type = 'square';
        } else if (['line', 'rect', 'circle', 'spray', 'pencil'].includes(state.tool)) {
            sizes = [1, 2, 3, 4, 5];
            type = 'line';
        } else if (state.tool === 'text') {
            sizes = [12, 16, 24, 32];
            type = 'text';
        } else {
            return;
        }

        sizes.forEach(sz => {
            const el = document.createElement('div');
            el.style.width = '30px';
            el.style.height = type === 'line' ? '12px' : '20px';
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';
            el.style.marginBottom = '2px';
            
            const isActive = (type === 'text') ? (state.textSize === sz) : (state.size === sz);
            el.style.background = isActive ? '#000080' : 'transparent'; 
            el.style.cursor = 'pointer';
            
            if (type === 'text') {
                el.innerText = sz;
                el.style.color = isActive ? '#ffffff' : '#000000';
                el.style.fontSize = '10px';
                el.style.fontWeight = 'bold';
            } else {
                const shape = document.createElement('div');
                shape.style.background = isActive ? '#ffffff' : '#000000'; 
                
                if (type === 'line') {
                    shape.style.width = '26px';
                    shape.style.height = sz + 'px';
                } else {
                    shape.style.width = sz + 'px';
                    shape.style.height = sz + 'px';
                    if (type === 'circle') shape.style.borderRadius = '50%';
                }
                el.appendChild(shape);
            }

            el.onclick = (e) => {
                e.stopPropagation(); 
                if (type === 'text') {
                    state.textSize = sz;
                } else {
                    state.size = sz;
                }
                renderToolOptions();
                updateCursorDisplay(lastPointerEvent);
            };
            optsContainer.appendChild(el);
        });
    }

    const history = [];
    let historyStep = -1;
    let activeTextInput = null;

    function saveState() {
        if(historyStep < history.length - 1) history.length = historyStep + 1;
        if(history.length > 15) { history.shift(); historyStep--; }
        history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        historyStep++;
    }
    saveState();

    function undo() {
        if (historyStep > 0) { historyStep--; ctx.putImageData(history[historyStep], 0, 0); }
    }

    function rotatePoint(x, y, cx, cy, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const nx = (cos * (x - cx)) - (sin * (y - cy)) + cx;
        const ny = (sin * (x - cx)) + (cos * (y - cy)) + cy;
        return { x: nx, y: ny };
    }

    function getPos(e) {
        if (!e) return { x: 0, y: 0, pressure: 0.5 };
        const rect = canvas.getBoundingClientRect();
        return { 
            x: Math.floor((e.clientX - rect.left) / state.zoom), 
            y: Math.floor((e.clientY - rect.top) / state.zoom), 
            pressure: e.pressure || 0.5 
        };
    }

    function createOffscreenCanvasFromImageData(imgData) {
        const c = document.createElement('canvas');
        c.width = imgData.width;
        c.height = imgData.height;
        const cCtx = c.getContext('2d');
        cCtx.imageSmoothingEnabled = true;
        cCtx.putImageData(imgData, 0, 0);
        return c;
    }

    function drawSelectionUI() {
        if (!state.selection) return;
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.save();
        const cx = Math.floor(state.selection.x + state.selection.w / 2);
        const cy = Math.floor(state.selection.y + state.selection.h / 2);
        tempCtx.translate(cx, cy);
        tempCtx.rotate(state.selection.angle);
        const halfW = state.selection.w / 2;
        const halfH = state.selection.h / 2;
        tempCtx.drawImage(state.selection.canvas, -halfW, -halfH, state.selection.w, state.selection.h);
        tempCtx.strokeStyle = 'black';
        tempCtx.setLineDash([4, 4]);
        tempCtx.lineWidth = 1;
        tempCtx.strokeRect(Math.floor(-halfW) + 0.5, Math.floor(-halfH) + 0.5, state.selection.w, state.selection.h);
        tempCtx.setLineDash([]);
        tempCtx.fillStyle = 'white';
        const hSize = 8;
        const drawHandle = (x, y) => {
            x = Math.floor(x); y = Math.floor(y);
            tempCtx.strokeRect(x - hSize/2 + 0.5, y - hSize/2 + 0.5, hSize, hSize);
            tempCtx.fillRect(x - hSize/2, y - hSize/2, hSize, hSize);
        };
        drawHandle(-halfW, -halfH); drawHandle(halfW, -halfH);
        drawHandle(halfW, halfH); drawHandle(-halfW, halfH);
        tempCtx.beginPath(); tempCtx.moveTo(0, -halfH); tempCtx.lineTo(0, -halfH - 25);
        tempCtx.stroke(); tempCtx.beginPath(); tempCtx.arc(0, -halfH - 25, 5, 0, Math.PI*2);
        tempCtx.fillStyle = '#00ff00'; tempCtx.fill(); tempCtx.stroke();
        tempCtx.restore();
    }

    function getSelectionHandle(mx, my) {
        if (!state.selection) return null;
        const cx = state.selection.x + state.selection.w / 2;
        const cy = state.selection.y + state.selection.h / 2;
        const local = rotatePoint(mx, my, cx, cy, -state.selection.angle);
        const lx = local.x - cx;
        const ly = local.y - cy;
        const hw = state.selection.w / 2;
        const hh = state.selection.h / 2;
        const margin = 15 / state.zoom; 
        if (lx >= -10 && lx <= 10 && ly >= -hh - 35 && ly <= -hh - 15) return 'rotate';
        if (Math.abs(lx - (-hw)) < margin && Math.abs(ly - (-hh)) < margin) return 'nw-resize';
        if (Math.abs(lx - (hw)) < margin && Math.abs(ly - (-hh)) < margin) return 'ne-resize';
        if (Math.abs(lx - (hw)) < margin && Math.abs(ly - (hh)) < margin) return 'se-resize';
        if (Math.abs(lx - (-hw)) < margin && Math.abs(ly - (hh)) < margin) return 'sw-resize';
        if (lx >= -hw && lx <= hw && ly >= -hh && ly <= hh) return 'move';
        return null;
    }

    function commitSelection() {
        if (state.selection) {
            ctx.save();
            const cx = Math.floor(state.selection.x + state.selection.w / 2);
            const cy = Math.floor(state.selection.y + state.selection.h / 2);
            ctx.translate(cx, cy); ctx.rotate(state.selection.angle);
            ctx.drawImage(state.selection.canvas, -state.selection.w/2, -state.selection.h/2, state.selection.w, state.selection.h);
            ctx.restore(); state.selection = null;
            tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
            saveState();
        }
    }

    function createTextInput(x, y) {
        if (activeTextInput) { commitText(activeTextInput); return; }
        const input = document.createElement('textarea');
        input.style.position = 'absolute';
        input.style.left = x + 'px'; input.style.top = y + 'px';
        input.style.fontFamily = 'Arial, sans-serif';
        input.style.fontSize = state.textSize + 'px';
        input.style.lineHeight = '1.2'; 
        input.style.color = state.fg;
        input.style.background = 'transparent'; 
        input.style.border = '1px dashed black';
        input.style.overflow = 'hidden'; 
        input.style.resize = 'both';
        input.style.minWidth = Math.max(100, 100 / state.zoom) + 'px'; 
        input.style.minHeight = (state.textSize * 1.5) + 'px';
        input.style.outline = 'none'; 
        input.style.zIndex = 1000;
        input.style.webkitFontSmoothing = 'antialiased';
        
        input.addEventListener('blur', () => commitText(input));
        wrapper.appendChild(input);
        setTimeout(() => input.focus(), 10);
        activeTextInput = input;
    }

    function commitText(input) {
        if (!input || !input.parentNode) return;
        const text = input.value;
        if (text.trim() !== "") {
            ctx.textBaseline = 'top';
            ctx.font = `${state.textSize}px Arial, sans-serif`; 
            ctx.fillStyle = state.fg; 
            
            const lines = text.split('\n');
            const x = parseInt(input.style.left); 
            const y = parseInt(input.style.top);
            const lh = state.textSize * 1.2;
            
            lines.forEach((l, i) => ctx.fillText(l, x, y + (i*lh)));
            saveState();
        }
        input.remove(); activeTextInput = null;
    }

    function updateCursorDisplay(e) {
        if (!e) return;
        const pos = getPos(e);
        let showGhost = true;
        let cW = state.size, cH = state.size;
        
        let cRad = '50%';
        let cBorder = '1px solid rgba(60, 60, 60, 0.7)'; 
        let sysCursor = 'none';

        if (state.isSpaceDown) {
            showGhost = false;
            sysCursor = state.isPanning ? 'grabbing' : 'grab';
        } else if (state.tool === 'select') {
            showGhost = false;
            const handle = getSelectionHandle(pos.x, pos.y);
            if (handle) sysCursor = handle === 'rotate' ? 'alias' : (handle === 'move' ? 'move' : handle);
            else sysCursor = 'crosshair';
        }
        else if (state.tool === 'text') { 
            cRad = '0'; 
            cBorder = '1px dotted rgba(0, 255, 204, 0.7)'; 
            cH = state.textSize; 
            cW = 2; 
            sysCursor = 'text'; 
        }
        else if (state.tool === 'bucket') { 
            cRad = '0';
            cW = 15; cH = 15;
            cBorder = 'none';
            cursor.style.background = `linear-gradient(to right, transparent 45%, rgba(0,255,204,0.7) 45%, rgba(0,255,204,0.7) 55%, transparent 55%),
                                       linear-gradient(to bottom, transparent 45%, rgba(0,255,204,0.7) 45%, rgba(0,255,204,0.7) 55%, transparent 55%)`;
            sysCursor = 'none'; 
        }
        else if (['picker', 'clean'].includes(state.tool)) { 
            showGhost = false; 
            sysCursor = 'default'; 
        }
        else {
            if (state.tool === 'spray') { cW*=3; cH*=3; }
            else if (state.tool === 'eraser') { cW*=2; cH*=2; }
            else if (state.tool === 'pencil') { cW = state.size; cH = state.size; cRad = '0'; }
            sysCursor = 'none';
            cursor.style.background = 'transparent'; 
        }

        container.style.cursor = sysCursor;
        if (showGhost) {
            cursor.style.display = 'block'; 
            cursor.style.width = cW+'px'; 
            cursor.style.height = cH+'px';
            cursor.style.borderWidth = (1 / state.zoom) + 'px'; 
            
            if(state.tool === 'text') { 
                cursor.style.left = pos.x+'px'; cursor.style.top = pos.y+'px'; 
            } else { 
                cursor.style.left = (pos.x - cW/2)+'px'; cursor.style.top = (pos.y - cH/2)+'px'; 
            }
            cursor.style.borderRadius = cRad; 
            cursor.style.border = cBorder; 
        } else {
            cursor.style.display = 'none';
        }
    }

    container.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        if (e.target.tagName === 'TEXTAREA') return;

        if(e.target.id !== 'zp-canvas' && e.target.id !== 'zp-temp-canvas' && e.target.id !== 'zp-canvas-wrapper') {
             return;
        }

        if (state.isSpaceDown) {
            state.isPanning = true;
            state.panStartX = e.clientX;
            state.panStartY = e.clientY;
            state.panScrollX = container.scrollLeft;
            state.panScrollY = container.scrollTop;
            updateCursorDisplay(e);
            return;
        }

        if (activeTextInput) { commitText(activeTextInput); return; }

        canvas.setPointerCapture(e.pointerId);
        const pos = getPos(e);
        state.isDrawing = true;
        state.startX = pos.x;
        state.startY = pos.y;

        if (state.tool === 'select') {
            const handle = getSelectionHandle(pos.x, pos.y);
            if (state.selection && handle) {
                state.dragAction = handle;
                if (handle === 'move') { state.dragOffsetX = pos.x - state.selection.x; state.dragOffsetY = pos.y - state.selection.y; }
                state.selection.startX = pos.x; state.selection.startY = pos.y;
                state.selection.startW = state.selection.w; state.selection.startH = state.selection.h;
                state.selection.startAngle = state.selection.angle;
                state.selection.centerX = state.selection.x + state.selection.w/2;
                state.selection.centerY = state.selection.y + state.selection.h/2;
            } else { commitSelection(); state.isSelecting = true; }
            return;
        }

        commitSelection();
        if (state.tool === 'text') { createTextInput(pos.x, pos.y); state.isDrawing = false; return; }

        const isOdd = state.size % 2 !== 0;
        const offset = isOdd ? 0.5 : 0;
        let drawX = Math.floor(pos.x) + offset;
        let drawY = Math.floor(pos.y) + offset;

        ctx.beginPath();
        ctx.moveTo(drawX, drawY);
        
        ctx.setLineDash([]);
        
        if (['line', 'rect'].includes(state.tool)) {
             ctx.lineCap = 'butt';
             ctx.lineJoin = 'miter';
        } else {
             ctx.lineCap = 'round';
             ctx.lineJoin = 'round';
        }
        
        if (state.tool === 'pencil') {
            ctx.strokeStyle = state.pencilPattern;
        } else {
            ctx.strokeStyle = state.tool === 'eraser' ? state.bg : state.fg;
        }
        
        ctx.fillStyle = state.tool === 'eraser' ? state.bg : state.fg;
        
        if (state.tool === 'brush') ctx.lineWidth = Math.max(1, state.size * (pos.pressure*2));
        else if (state.tool === 'pencil') ctx.lineWidth = state.size;
        else if (state.tool === 'eraser') ctx.lineWidth = state.size * 2;
        else ctx.lineWidth = state.size;

        if(state.tool==='bucket') { floodFill(Math.floor(pos.x), Math.floor(pos.y), state.fg); state.isDrawing=false; saveState(); }
        if(state.tool==='picker') { pickColor(pos.x, pos.y); state.isDrawing=false; }
        
        if(['pencil', 'brush', 'eraser'].includes(state.tool)) {
            ctx.lineTo(drawX, drawY);
            ctx.stroke();
        }
    });

    container.addEventListener('pointermove', (e) => {
        lastPointerEvent = e;
        updateCursorDisplay(e);

        if (state.isPanning) {
            container.scrollLeft = state.panScrollX - (e.clientX - state.panStartX);
            container.scrollTop = state.panScrollY - (e.clientY - state.panStartY);
            return;
        }

        if (!state.isDrawing) return;

        const pos = getPos(e);

        if (state.tool === 'select') {
            if (state.dragAction) {
                const sel = state.selection;
                if (state.dragAction === 'move') { sel.x = pos.x - state.dragOffsetX; sel.y = pos.y - state.dragOffsetY; }
                else if (state.dragAction === 'rotate') { sel.angle = Math.atan2(pos.y - sel.centerY, pos.x - sel.centerX) + Math.PI / 2; }
                else if (state.dragAction.includes('resize')) {
                    const distStart = Math.hypot(state.startX - sel.centerX, state.startY - sel.centerY);
                    const distCurr = Math.hypot(pos.x - sel.centerX, pos.y - sel.centerY);
                    const scale = distCurr / (distStart || 1);
                    sel.w = sel.startW * scale; sel.h = sel.startH * scale;
                    sel.x = sel.centerX - sel.w/2; sel.y = sel.centerY - sel.h/2;
                }
                drawSelectionUI();
            } else if (state.isSelecting) {
                tempCtx.clearRect(0,0,tempCanvas.width,tempCanvas.height);
                const w = pos.x - state.startX; const h = pos.y - state.startY;
                tempCtx.strokeStyle='black'; tempCtx.setLineDash([4,4]);
                tempCtx.strokeRect(state.startX, state.startY, w, h);
            }
            return;
        }

        const isOdd = state.size % 2 !== 0;
        const offset = isOdd ? 0.5 : 0;
        let drawX = Math.floor(pos.x) + offset;
        let drawY = Math.floor(pos.y) + offset;

        if (['pencil', 'brush', 'eraser'].includes(state.tool)) {
            if(state.tool==='brush') ctx.lineWidth = Math.max(1, state.size*(pos.pressure*2));
            ctx.lineTo(drawX, drawY); 
            ctx.stroke();
            ctx.beginPath(); 
            ctx.moveTo(drawX, drawY);
        } 
        else if (['line','rect','circle'].includes(state.tool)) {
            tempCtx.clearRect(0,0,tempCanvas.width,tempCanvas.height);
            ctx.lineWidth = state.size; 
            tempCtx.lineWidth = state.size;
            
            tempCtx.setLineDash([]);
            
            if (state.tool === 'line' || state.tool === 'rect') {
                tempCtx.lineCap = 'butt';
                tempCtx.lineJoin = 'miter';
            } else {
                tempCtx.lineCap = 'round';
                tempCtx.lineJoin = 'round';
            }
            
            tempCtx.strokeStyle=state.fg; 
            tempCtx.fillStyle=state.fg;
            tempCtx.beginPath();
            
            const sx = Math.floor(state.startX) + offset; 
            const sy = Math.floor(state.startY) + offset;
            const cx = Math.floor(pos.x) + offset; 
            const cy = Math.floor(pos.y) + offset;
            const w = cx - sx; 
            const h = cy - sy;

            if(state.tool==='line'){ tempCtx.moveTo(sx,sy); tempCtx.lineTo(cx,cy); }
            else if(state.tool==='rect') {
                tempCtx.strokeRect(sx, sy, w, h);
            }
            else if(state.tool==='circle') { 
                tempCtx.beginPath(); 
                tempCtx.ellipse(sx+w/2, sy+h/2, Math.abs(w/2), Math.abs(h/2), 0, 0, Math.PI*2); 
            }
            tempCtx.stroke();
        } 
        else if (state.tool==='spray') {
            ctx.fillStyle = state.fg;
            for(let i=0; i<state.size; i++) {
                const a=Math.random()*Math.PI*2; const r=Math.random()*state.size*1.5;
                ctx.fillRect(pos.x+Math.cos(a)*r, pos.y+Math.sin(a)*r, 1, 1);
            }
        }
    });

    container.addEventListener('pointerup', (e) => {
        if (state.isPanning) {
            state.isPanning = false;
            updateCursorDisplay(e);
            return;
        }

        if (!state.isDrawing) return;
        state.isDrawing = false;
        if(canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);

        if (state.tool === 'select') {
            state.dragAction = null;
            if (state.isSelecting) {
                const pos = getPos(e);
                let x = Math.min(state.startX, pos.x), y = Math.min(state.startY, pos.y);
                let w = Math.abs(pos.x - state.startX), h = Math.abs(pos.y - state.startY);
                if (w > 1 && h > 1) {
                    const imgData = ctx.getImageData(x, y, w, h);
                    ctx.fillStyle = state.bg; ctx.fillRect(x, y, w, h);
                    state.selection = { x, y, w, h, angle: 0, canvas: createOffscreenCanvasFromImageData(imgData) };
                    drawSelectionUI();
                }
                state.isSelecting = false;
            }
            return;
        }
        if (['line','rect','circle'].includes(state.tool)) { 
            ctx.drawImage(tempCanvas, 0, 0); 
            tempCtx.clearRect(0,0,tempCanvas.width,tempCanvas.height); 
        }
        ctx.beginPath(); saveState();
    });

    container.addEventListener('wheel', (e) => {
        e.preventDefault(); 
        const oldZoom = state.zoom;
        
        if (e.deltaY < 0) state.zoom *= 1.15; 
        else state.zoom /= 1.15; 
        
        state.zoom = Math.max(0.2, Math.min(state.zoom, 10)); 
        
        if (state.zoom === oldZoom) return;

        const rect = wrapper.getBoundingClientRect();
        const mouseX = e.clientX - rect.left; 
        const mouseY = e.clientY - rect.top;

        const ratio = state.zoom / oldZoom;
        
        scrollContent.style.width = (canvas.width * state.zoom) + 'px';
        scrollContent.style.height = (canvas.height * state.zoom) + 'px';
        wrapper.style.transform = `scale(${state.zoom})`;

        container.scrollLeft += (mouseX * ratio) - mouseX;
        container.scrollTop += (mouseY * ratio) - mouseY;

        updateCursorDisplay(lastPointerEvent);
    }, { passive: false });

    const handleKeyDown = (e) => {
        if (!document.getElementById(winId)) {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            return;
        }
        if (e.code === 'Space' && !state.isDrawing && document.activeElement.tagName !== 'TEXTAREA') {
            if (win.contains(document.activeElement) || win.matches(':hover')) {
                e.preventDefault(); 
                if (!state.isSpaceDown) {
                    state.isSpaceDown = true;
                    updateCursorDisplay(lastPointerEvent);
                }
            }
        }
    };

    const handleKeyUp = (e) => {
        if (e.code === 'Space') {
            state.isSpaceDown = false;
            state.isPanning = false;
            updateCursorDisplay(lastPointerEvent);
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    function floodFill(startX, startY, hexColor) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const width = canvas.width;
        const height = canvas.height;

        const startPos = (startY * width + startX) * 4;
        const startR = data[startPos];
        const startG = data[startPos + 1];
        const startB = data[startPos + 2];
        const startA = data[startPos + 3];

        const fillColor = parseInt(hexColor.slice(1), 16);
        const fillR = (fillColor >> 16) & 255;
        const fillG = (fillColor >> 8) & 255;
        const fillB = fillColor & 255;
        const fillA = 255;

        if (startR === fillR && startG === fillG && startB === fillB && startA === fillA) return;

        const tolerance = 50; 

        function match(pos) {
            const r = data[pos]; const g = data[pos + 1]; const b = data[pos + 2]; const a = data[pos + 3];
            if (a === 0 && startA === 0) return true;
            return Math.abs(r - startR) <= tolerance && Math.abs(g - startG) <= tolerance && Math.abs(b - startB) <= tolerance;
        }

        function colorPixel(pos) {
            data[pos] = fillR; data[pos + 1] = fillG; data[pos + 2] = fillB; data[pos + 3] = fillA;
        }

        const stack = [[startX, startY]];

        while (stack.length) {
            let [x, y] = stack.pop();
            let pos = (y * width + x) * 4;

            while (y >= 0 && match(pos)) { y--; pos -= width * 4; }
            y++; pos += width * 4;

            let spanLeft = false, spanRight = false;

            while (y < height && match(pos)) {
                colorPixel(pos);
                if (x > 0) {
                    if (match(pos - 4)) { if (!spanLeft) { stack.push([x - 1, y]); spanLeft = true; } } 
                    else if (spanLeft) spanLeft = false;
                }
                if (x < width - 1) {
                    if (match(pos + 4)) { if (!spanRight) { stack.push([x + 1, y]); spanRight = true; } } 
                    else if (spanRight) spanRight = false;
                }
                y++; pos += width * 4;
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function pickColor(x,y){ const d=ctx.getImageData(x,y,1,1).data; state.fg="#"+((1<<24)+(d[0]<<16)+(d[1]<<8)+d[2]).toString(16).slice(1); win.querySelector('#zp-fg').style.backgroundColor=state.fg; updatePencilPattern(state.fg); }

    win.querySelectorAll('.zp-swatch').forEach(s=>{
        s.onclick=()=> { 
            state.fg=s.dataset.color; 
            win.querySelector('#zp-fg').style.backgroundColor=state.fg;
            updatePencilPattern(state.fg);
        };
        s.oncontextmenu=(e)=>{ e.preventDefault(); state.bg=s.dataset.color; win.querySelector('#zp-bg').style.backgroundColor=state.bg; }
    });

    win.querySelectorAll('.zp-tool').forEach(b=>{
        b.onclick=()=>{
            if(activeTextInput) commitText(activeTextInput);
            commitSelection();
            win.querySelectorAll('.zp-tool').forEach(x=>x.classList.remove('active'));
            b.classList.add('active');
            state.tool=b.dataset.tool;
            if (state.tool === 'pencil' && state.size > 5) state.size = 2;
            else if (state.tool === 'pencil') state.size = 2;
            renderToolOptions(); 
            updateCursorDisplay(lastPointerEvent);
            if(state.tool==='clean'){ ctx.fillStyle=state.bg; ctx.fillRect(0,0,canvas.width,canvas.height); saveState(); }
        }
    });

    win.tabIndex=-1;
    win.addEventListener('keydown', e=>{
        if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();undo();}
        if(e.key==='Delete'&&state.selection){state.selection=null;tempCtx.clearRect(0,0,tempCanvas.width,tempCanvas.height);saveState();}
    });

    win.querySelector('[data-tool="brush"]').classList.add('active');
    renderToolOptions(); 
}