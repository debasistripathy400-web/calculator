let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

const resultDisplay = document.getElementById('result');
const historyDisplay = document.getElementById('history');

function updateDisplay() {
    resultDisplay.innerText = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) calculateResult();
    previousInput = currentInput;
    operator = op;
    shouldResetScreen = true;
    historyDisplay.innerText = `${previousInput} ${operator}`;
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    historyDisplay.innerText = '';
    updateDisplay();
}

function deleteChar() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.toString().slice(0, -1);
    }
    updateDisplay();
}

function calculateResult() {
    if (operator === null || shouldResetScreen) return;

    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero!");
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }

    currentInput = computation.toString();
    operator = null;
    historyDisplay.innerText = '';
    shouldResetScreen = true;
    updateDisplay();
    triggerGlow();
}

function triggerGlow() {
    const display = document.querySelector('.display');
    display.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.5)';
    setTimeout(() => {
        display.style.boxShadow = 'inset 0 2px 5px rgba(0,0,0,0.5)';
    }, 200);
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '=' || e.key === 'Enter') calculateResult();
    if (e.key === 'Backspace') deleteChar();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') appendOperator(e.key);
});
