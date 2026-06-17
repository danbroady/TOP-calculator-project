// GENERAL DECLARATIONS
let shouldResetDisplay = false;
let operandA = '';
let currentOperator = null;
let operandB = '';


// QUERY SELECTORS
const lastDisplay = document.querySelector('.last-input');
const currentDisplay = document.querySelector('.current-input');
const clearAll = document.querySelector('#clear-all');
const clearEntry = document.querySelector('#clear-entry');
const numberBtn = document.querySelectorAll('.num');
const operatorBtn = document.querySelectorAll('.operator');
const decimal = document.querySelector('#decimal');
const total = document.querySelector('#sum');

// EVENT LISTENERS
clearAll.addEventListener('click', () => clearDisplay());
clearEntry.addEventListener('click', () => clearLastEntry());
decimal.addEventListener('click', (e) => decimalPress());
total.addEventListener('click', (e) => evaluateCalc());

numberBtn.forEach((button) =>
  button.addEventListener('click', () => concatNumber(button.textContent))
);
operatorBtn.forEach((button) =>
  button.addEventListener('click', () => operationPress(button.textContent))
);


// concatNumber() - update the 'current' display for button inputs
function concatNumber(input) {
    if (currentDisplay.textContent == '0' || shouldResetDisplay) {
        resetDisplay();}
    if (currentDisplay.textContent.length >= 14){

    } else {
        currentDisplay.textContent += input;
    }
}

// clearDisplay() - fully clear display on 'AC' button press
function clearDisplay() {
    currentDisplay.textContent = '0';
    lastDisplay.textContent = '';
    operandA = '';
    operandA = '';
    currentOperator = null;
}

// resetDisplay() - clear leading '0' from display
function resetDisplay() {
    currentDisplay.textContent = '';
    shouldResetDisplay = false;
}

// clearLastEntry() - delete most recent button input in current display
function clearLastEntry() {
    currentDisplay.textContent = currentDisplay.textContent.toString()
    .slice(0,-1);
}

// operationPress() - handle movement of text to upper screen on operator button press
function operationPress(operator) {
    if (currentOperator !== null) evaluateCalc();
    operandA = currentDisplay.textContent;
    currentOperator = operator;
    lastDisplay.textContent = `${operandA} ${currentOperator}`
    shouldResetDisplay = true;
}

// decimalPress() - handles any decimal button input
function decimalPress() {
    if (shouldResetDisplay) resetDisplay();
    if (currentDisplay.textContent === ''){
        currentDisplay.textContent = '0'; }
    if (currentDisplay.textContent.includes('.')) {
        return; }
    else {
        currentDisplay.textContent += '.'; }
}

// evaluateCalc() - on 'equals' button press
function evaluateCalc() {
    if (currentOperator === null || shouldResetDisplay) return;
    operandB = currentDisplay.textContent;
    currentDisplay.textContent = operation(currentOperator,operandA,operandB);
    lastDisplay.textContent = `${operandA} ${currentOperator} ${operandB} = `
    currentOperator = null;
}

// operation() - calculates equation
function operation(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return Math.round(1000*(a+b))/1000;
        case '-':
            return Math.round(1000*(a-b))/1000;
        case '×':
            return Math.round(1000*(a*b))/1000;
        case '÷':
            if (b === 0){
                return null;
            } else {
                return Math.round(1000*(a/b))/1000;
            }
        case '%':
            return Math.round(1000*(a%b))/1000;
        default:
            return null;
    }
}