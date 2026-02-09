import { createWindow } from '../modules/windowFactory.js';

export function renderCalculator() {
    const winId = 'window-calculator';
    
    let displayValue = '0';
    let firstOperand = null;
    let waitingForSecondOperand = false;
    let operator = null;
    let memory = 0;
    let inErrorState = false;

    createWindow({
        id: winId,
        title: 'Calculadora',
        isCentered: true,
        content: `
            <div class="calc-container">
                <div class="calc-display-wrapper">
                    <div class="calc-display" id="calc-screen">0</div>
                </div>
                
                <div class="calc-body">
                    <div class="calc-mem-status-box">
                        <div id="calc-mem-indicator"></div>
                    </div>

                    <div class="calc-top-row">
                        <button class="os-btn calc-btn btn-red" data-action="backspace">Backspace</button>
                        <button class="os-btn calc-btn btn-red" data-action="ce">CE</button>
                        <button class="os-btn calc-btn btn-red" data-action="clear">C</button>
                    </div>
                </div>
                
                <div class="calc-main-grid" id="calc-pad">
                    <button class="os-btn calc-btn btn-red" data-action="memory" data-op="MC">MC</button>
                    <button class="os-btn calc-btn btn-blue" data-num="7">7</button>
                    <button class="os-btn calc-btn btn-blue" data-num="8">8</button>
                    <button class="os-btn calc-btn btn-blue" data-num="9">9</button>
                    <button class="os-btn calc-btn btn-red" data-action="operator" data-op="/">/</button>
                    <button class="os-btn calc-btn btn-blue" data-action="sqrt">sqrt</button>

                    <button class="os-btn calc-btn btn-red" data-action="memory" data-op="MR">MR</button>
                    <button class="os-btn calc-btn btn-blue" data-num="4">4</button>
                    <button class="os-btn calc-btn btn-blue" data-num="5">5</button>
                    <button class="os-btn calc-btn btn-blue" data-num="6">6</button>
                    <button class="os-btn calc-btn btn-red" data-action="operator" data-op="*">*</button>
                    <button class="os-btn calc-btn btn-blue" data-action="percent">%</button>

                    <button class="os-btn calc-btn btn-red" data-action="memory" data-op="MS">MS</button>
                    <button class="os-btn calc-btn btn-blue" data-num="1">1</button>
                    <button class="os-btn calc-btn btn-blue" data-num="2">2</button>
                    <button class="os-btn calc-btn btn-blue" data-num="3">3</button>
                    <button class="os-btn calc-btn btn-red" data-action="operator" data-op="-">-</button>
                    <button class="os-btn calc-btn btn-blue" data-action="reciproc">1/x</button>

                    <button class="os-btn calc-btn btn-red" data-action="memory" data-op="M+">M+</button>
                    <button class="os-btn calc-btn btn-blue" data-num="0">0</button>
                    <button class="os-btn calc-btn btn-blue" data-action="negate">+/-</button>
                    <button class="os-btn calc-btn btn-blue" data-action="decimal">.</button>
                    <button class="os-btn calc-btn btn-red" data-action="operator" data-op="+">+</button>
                    <button class="os-btn calc-btn btn-red" data-action="equals">=</button>
                </div>
            </div>
        `
    });

    const win = document.getElementById(winId);
    if (win) {
        win.style.width = '300px'; 
        win.style.height = 'auto';
        win.style.resize = 'none'; 
    }

    const screen = win.querySelector('#calc-screen');
    const keypad = win.querySelector('.calc-container');
    const memIndicator = win.querySelector('#calc-mem-indicator');

    function updateDisplay() {
        if (inErrorState) {
            screen.innerText = displayValue;
            return;
        }

        let text = displayValue.toString();
        if (text.length > 28) {
            text = text.substring(0, 28);
        }
        screen.innerText = text;

        memIndicator.innerText = memory !== 0 ? 'M' : '';
    }

    function triggerError(msg) {
        displayValue = msg;
        inErrorState = true;
        firstOperand = null;
        waitingForSecondOperand = false;
        operator = null;
    }

    function inputDigit(digit) {
        if (inErrorState) resetCalculator();

        if (waitingForSecondOperand) {
            displayValue = digit;
            waitingForSecondOperand = false;
        } else {
            displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }

    function inputDecimal() {
        if (inErrorState) resetCalculator();
        if (waitingForSecondOperand) {
            displayValue = '0.';
            waitingForSecondOperand = false;
            return;
        }
        if (!displayValue.includes('.')) {
            displayValue += '.';
        }
    }

    function handleOperator(nextOperator) {
        if (inErrorState) return;

        const inputValue = parseFloat(displayValue);

        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand == null && !isNaN(inputValue)) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            if (!inErrorState) {
                displayValue = `${parseFloat(result.toFixed(10))}`;
                firstOperand = result;
            }
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
    }

    function calculate(first, second, op) {
        if (op === '+') return first + second;
        if (op === '-') return first - second;
        if (op === '*') return first * second;
        if (op === '/') {
            if (second === 0) {
                triggerError("Impossível dividir por 0");
                return 0;
            }
            return first / second;
        }
        return second;
    }

    function handleFunctions(action) {
        if (inErrorState && action !== 'clear') return;
        if (action === 'clear') { // C
            resetCalculator();
            return;
        }

        let current = parseFloat(displayValue);

        if (action === 'ce') { // CE
            displayValue = '0';
        } else if (action === 'backspace') { // Backspace
            if (!waitingForSecondOperand) {
                displayValue = displayValue.toString().slice(0, -1);
                if (displayValue === '' || displayValue === '-') displayValue = '0';
            }
        } else if (action === 'sqrt') {
            if (current < 0) triggerError("Entrada inválida");
            else displayValue = Math.sqrt(current).toString();
            waitingForSecondOperand = true; // Reseta para próxima entrada
        } else if (action === 'reciproc') { // 1/x
            if (current === 0) triggerError("Impossível dividir por 0");
            else displayValue = (1 / current).toString();
            waitingForSecondOperand = true;
        } else if (action === 'percent') {
            // Lógica simples: valor / 100
            displayValue = (current / 100).toString();
             waitingForSecondOperand = true;
        } else if (action === 'negate') { // +/-
            displayValue = (current * -1).toString();
        }
    }

    function handleMemory(op) {
        if (inErrorState) return;
        let current = parseFloat(displayValue);

        if (op === 'MC') memory = 0;
        if (op === 'MS') memory = current;
        if (op === 'MR') {
            displayValue = memory.toString();
            waitingForSecondOperand = true;
        }
        if (op === 'M+') memory += current;
    }

    function resetCalculator() {
        displayValue = '0';
        firstOperand = null;
        waitingForSecondOperand = false;
        operator = null;
        inErrorState = false;
    }

    keypad.addEventListener('click', (e) => {
        const { target } = e;
        if (!target.matches('button')) return;

        const { action, num, op } = target.dataset;

        if (num) inputDigit(num);
        else if (action === 'operator') handleOperator(op);
        else if (action === 'decimal') inputDecimal();
        else if (action === 'equals') {
            if (operator && !waitingForSecondOperand && !inErrorState) {
                handleOperator(operator);
                operator = null;
            }
        }
        else if (action === 'memory') handleMemory(op);
        else handleFunctions(action);

        updateDisplay();
    });
}