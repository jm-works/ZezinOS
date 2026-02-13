import { createWindow } from '../../modules/windowFactory.js';

export function renderMinesweeper() {
    const winId = 'window-minesweeper';

    const CELL_SIZE = 26;
    const DIFFICULTIES = {
        beginner: { rows: 9, cols: 9, mines: 10 },
        intermediate: { rows: 16, cols: 16, mines: 40 },
        expert: { rows: 16, cols: 30, mines: 99 }
    };

    let currentLevel = 'beginner'; 
    let ROWS = DIFFICULTIES[currentLevel].rows;
    let COLS = DIFFICULTIES[currentLevel].cols;
    let MINES_COUNT = DIFFICULTIES[currentLevel].mines;

    let grid = [];
    let flagsLeft = MINES_COUNT;
    let gameOver = false;
    let timer = 0;
    let timerInterval = null;
    let isFirstClick = true;

    const content = `
        <div class="mine-menu-bar">
            <div class="mine-menu-item" id="mine-menu-game">
                <u>J</u>ogo
                <div class="mine-dropdown" id="mine-dropdown-game">
                    <div class="mine-dropdown-item" id="diff-beginner">
                        <span class="mine-check" id="check-beginner">✓</span> Iniciante
                    </div>
                    <div class="mine-dropdown-item" id="diff-intermediate">
                        <span class="mine-check" id="check-intermediate"></span> Intermediário
                    </div>
                    <div class="mine-dropdown-item" id="diff-expert">
                        <span class="mine-check" id="check-expert"></span> Avançado
                    </div>
                    <div style="border-top: 1px solid #888; margin: 2px 0;"></div>
                    <div class="mine-dropdown-item" id="mine-exit"><u>S</u>air</div>
                </div>
            </div>
            <div class="mine-menu-item"><u>A</u>juda</div>
        </div>

        <div class="mine-game-area">
            <div class="mine-header">
                <div class="mine-counter-box" id="mines-left">010</div>
                <button id="mine-smiley-btn">😊</button>
                <div class="mine-counter-box" id="mine-timer">000</div>
            </div>
            
            <div class="mine-field-container">
                <div class="mine-grid" id="mine-grid"></div>
            </div>
        </div>
    `;

    createWindow({
        id: winId,
        title: 'Campo Minado',
        content: content,
        isCentered: true,
    });

    const win = document.getElementById(winId);
    if (!win) return;

    const gridElement = win.querySelector('#mine-grid');
    const minesLeftDisplay = win.querySelector('#mines-left');
    const timerDisplay = win.querySelector('#mine-timer');
    const smileyBtn = win.querySelector('#mine-smiley-btn');
    
    const menuGame = win.querySelector('#mine-menu-game');
    const dropdownGame = win.querySelector('#mine-dropdown-game');
    const btnBeginner = win.querySelector('#diff-beginner');
    const btnIntermediate = win.querySelector('#diff-intermediate');
    const btnExpert = win.querySelector('#diff-expert');
    const btnExit = win.querySelector('#mine-exit');
    
    function resizeAndCenterWindow() {
        const contentWidth = (COLS * CELL_SIZE) + 24; 
        
        const contentHeight = (ROWS * CELL_SIZE) + 130; 

        win.style.width = `${contentWidth}px`;
        win.style.height = `${contentHeight}px`;

        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const left = (screenW / 2) - (contentWidth / 2);
        const top = (screenH / 2) - (contentHeight / 2);

        win.style.left = `${Math.max(0, left)}px`;
        win.style.top = `${Math.max(0, top)}px`;
        win.style.transform = 'none'; 
    }

    function setDifficulty(level) {
        currentLevel = level;
        const config = DIFFICULTIES[level];
        ROWS = config.rows;
        COLS = config.cols;
        MINES_COUNT = config.mines;

        win.querySelector('#check-beginner').innerText = level === 'beginner' ? '✓' : '';
        win.querySelector('#check-intermediate').innerText = level === 'intermediate' ? '✓' : '';
        win.querySelector('#check-expert').innerText = level === 'expert' ? '✓' : '';

        dropdownGame.classList.remove('show');
        initGame();
        setTimeout(resizeAndCenterWindow, 10);
    }

    menuGame.addEventListener('click', (e) => {
        if (e.target.closest('.mine-dropdown-item')) return;
        dropdownGame.classList.toggle('show');
    });

    window.addEventListener('click', (e) => {
        if (!menuGame.contains(e.target)) {
            dropdownGame.classList.remove('show');
        }
    });

    btnBeginner.addEventListener('click', () => setDifficulty('beginner'));
    btnIntermediate.addEventListener('click', () => setDifficulty('intermediate'));
    btnExpert.addEventListener('click', () => setDifficulty('expert'));
    
    btnExit.addEventListener('click', () => {
        const closeBtn = win.querySelector('.title-bar-controls button[aria-label="Close"]');
        if(closeBtn) closeBtn.click();
        else win.remove();
    });

    function initGame() {
        gameOver = false;
        flagsLeft = MINES_COUNT;
        timer = 0;
        isFirstClick = true;
        grid = [];
        
        clearInterval(timerInterval);
        updateCounters();
        smileyBtn.innerText = "😊";
        
        createGridUI();
    }

    function createGridUI() {
        gridElement.innerHTML = '';
        gridElement.style.gridTemplateColumns = `repeat(${COLS}, ${CELL_SIZE}px)`;

        for (let r = 0; r < ROWS; r++) {
            let row = [];
            for (let c = 0; c < COLS; c++) {
                const cell = document.createElement('div');
                cell.classList.add('mine-cell');
                cell.dataset.row = r;
                cell.dataset.col = c;
                
                cell.addEventListener('mousedown', handleMouseDown);
                cell.addEventListener('mouseup', handleMouseUp);
                cell.addEventListener('contextmenu', e => e.preventDefault());

                gridElement.appendChild(cell);
                row.push({ element: cell, isMine: false, isRevealed: false, isFlagged: false, neighborCount: 0 });
            }
            grid.push(row);
        }
    }

    function placeMines(safeRow, safeCol) {
        let minesPlaced = 0;
        while (minesPlaced < MINES_COUNT) {
            const r = Math.floor(Math.random() * ROWS);
            const c = Math.floor(Math.random() * COLS);
            if (!grid[r][c].isMine && (r !== safeRow || c !== safeCol)) {
                grid[r][c].isMine = true;
                minesPlaced++;
            }
        }
        calculateNeighbors();
    }

    function calculateNeighbors() {
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c].isMine) continue;
                let count = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const nr = r + i;
                        const nc = c + j;
                        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc].isMine) count++;
                    }
                }
                grid[r][c].neighborCount = count;
            }
        }
    }

    function handleMouseDown(e) {
        if (gameOver || e.button === 1) return;
        smileyBtn.innerText = "😮";
    }

    function handleMouseUp(e) {
        if (gameOver) return;
        smileyBtn.innerText = "😊";
        const r = parseInt(this.dataset.row);
        const c = parseInt(this.dataset.col);
        const cellData = grid[r][c];

        if (e.button === 0) {
            if (cellData.isFlagged || cellData.isRevealed) return;
            if (isFirstClick) {
                isFirstClick = false;
                startTimer();
                placeMines(r, c);
            }
            if (cellData.isMine) triggerGameOver(r, c);
            else {
                revealCell(r, c);
                checkWinCondition();
            }
        } else if (e.button === 2) {
            if (cellData.isRevealed) return;
            if (!cellData.isFlagged && flagsLeft > 0) {
                cellData.isFlagged = true;
                this.classList.add('flagged');
                flagsLeft--;
            } else if (cellData.isFlagged) {
                cellData.isFlagged = false;
                this.classList.remove('flagged');
                flagsLeft++;
            }
            updateCounters();
        }
    }

    function revealCell(r, c) {
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
        const cellData = grid[r][c];
        if (cellData.isRevealed || cellData.isFlagged) return;

        cellData.isRevealed = true;
        cellData.element.classList.add('revealed');

        if (cellData.neighborCount > 0) {
            cellData.element.innerText = cellData.neighborCount;
            cellData.element.setAttribute('data-num', cellData.neighborCount);
        } else {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) revealCell(r + i, c + j);
            }
        }
    }

    function triggerGameOver(hitR, hitC) {
        gameOver = true;
        clearInterval(timerInterval);
        smileyBtn.innerText = "😵";
        grid[hitR][hitC].element.classList.add('mine-hit');
        grid.forEach(row => {
            row.forEach(cellData => {
                if (cellData.isMine && !cellData.isFlagged) cellData.element.classList.add('mine-revealed');
                if (!cellData.isMine && cellData.isFlagged) cellData.element.classList.add('wrong-flag');
            });
        });
    }

    function checkWinCondition() {
        let revealedCount = 0;
        grid.forEach(row => row.forEach(c => { if (c.isRevealed) revealedCount++; }));
        if (revealedCount === (ROWS * COLS) - MINES_COUNT) {
            gameOver = true;
            clearInterval(timerInterval);
            smileyBtn.innerText = "😎";
            flagsLeft = 0;
            updateCounters();
            grid.forEach(row => row.forEach(c => {
                if (c.isMine && !c.isFlagged) {
                    c.isFlagged = true;
                    c.element.classList.add('flagged');
                }
            }));
        }
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timer++;
            updateCounters();
            if (timer >= 999) clearInterval(timerInterval);
        }, 1000);
    }

    function updateCounters() {
        minesLeftDisplay.innerText = flagsLeft.toString().padStart(3, '0');
        timerDisplay.innerText = timer.toString().padStart(3, '0');
    }

    smileyBtn.addEventListener('click', initGame);

    initGame();
    setTimeout(resizeAndCenterWindow, 50);
}