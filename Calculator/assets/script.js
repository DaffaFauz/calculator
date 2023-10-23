const calculator = {
  displayNumber: '0',
  firstNumber: null,
  operator: null,
  secondNumber: false,
};

function updateDisplay() {
  document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

function clear() {
  calculator.displayNumber = '0';
  calculator.firstNumber = null;
  calculator.operator = null;
  calculator.secondNumber = false;
}

function inverse() {
  if (calculator.displayNumber === '0') {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

function percent() {
  if (calculator.displayNumber === '0') {
    return;
  }
  calculator.displayNumber = calculator.displayNumber / 100;
}

function handleOperator(operator) {
  if (!calculator.secondNumber) {
    calculator.firstNumber = calculator.displayNumber;
    calculator.operator = operator;
    calculator.secondNumber = true;
    calculator.displayNumber = '0';
  }
}

function equals() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert('Anda belum menetapkan operator');
  }

  let result = 0;

  if (calculator.operator === '+') {
    result = parseFloat(calculator.firstNumber) + parseFloat(calculator.displayNumber);
  }

  if (calculator.operator === '-') {
    result = parseFloat(calculator.firstNumber) - parseFloat(calculator.displayNumber);
  }

  if (calculator.operator === 'X') {
    result = parseFloat(calculator.firstNumber) * parseFloat(calculator.displayNumber);
  }

  if (calculator.operator === '/') {
    result = parseFloat(calculator.firstNumber) / parseFloat(calculator.displayNumber);
  }

  const history = {
    firstNumber: calculator.firstNumber,
    operator: calculator.operator,
    secondNumber: calculator.displayNumber,
    result: result,
  };

  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}

function inputDigit(digit) {
  if (calculator.displayNumber === '0') {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

let buttons = document.querySelectorAll('.button');

for (let button of buttons) {
  button.addEventListener('click', function (event) {
    let target = event.target;

    if (target.classList.contains('clear')) {
      clear();
      updateDisplay();
      return;
    }

    if (target.classList.contains('inverse')) {
      inverse();
      updateDisplay();
      return;
    }

    if (target.classList.contains('percent')) {
      percent();
      updateDisplay();
      return;
    }

    if (target.classList.contains('operator')) {
      handleOperator(target.innerText);
      updateDisplay();
      return;
    }

    if (target.classList.contains('equals')) {
      equals();
      updateDisplay();
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}
