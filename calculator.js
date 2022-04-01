let firstNumber = '';
let secondNumber = '';
let operationSign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/', '+/-', '🠖'];
const out = document.querySelector('.calc-screen p');

function clearAll() {
  firstNumber = '';
  secondNumber = '';
  operationSign = '';
  finish = false;
  out.textContent = 0;
}

document.querySelector('.c').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
  if (!event.target.classList.contains('btn')) {
    return;
  }

  if (event.target.classList.contains('c')) {
    return;
  }

  const key = event.target.textContent;
  let isFinish = firstNumber !== '' && secondNumber !== '' && finish;
  let isSecondNumber = firstNumber !== '' && operationSign !== '';

  // если нажата 0-9 или .
  if (digit.includes(key)) {
    if (isFinish) {
      firstNumber = key;
      finish = false;
      out.textContent = number;
    } else if (isSecondNumber) { // проверка, чтобы занести второе число
      if (key.includes('.') && secondNumber.includes('.')) {
        return;
      }
      
      secondNumber += key;
      out.textContent = secondNumber;
    }
    else {
      if (key.includes('.') && firstNumber.includes('.')) {
        return;
      }
      
      firstNumber += key;
      out.textContent = firstNumber;
    }

    return;
  }

  // если нажаты + - / * +/- ->
  if (action.includes(key)) {
    let activeNumber = secondNumber || firstNumber;
    operationSign = key;
    out.textContent = operationSign;

    switch (operationSign) {
      case '+':
        if (secondNumber) {
          firstNumber = +firstNumber + +secondNumber;
          secondNumber = '';
          return;
        }

        break;
      case '-':
        if (secondNumber) {
          firstNumber = firstNumber - secondNumber;
          secondNumber = '';
          return;
        }
  
        break;
      case 'X':
        if (secondNumber) {
          firstNumber = firstNumber * secondNumber;
          secondNumber = '';
          return;
        }
  
        break;
      case '/':
        if (secondNumber) {
          firstNumber = firstNumber / secondNumber;
          secondNumber = '';
          return;
        }
  
        if (secondNumber === '0') {
          out.textContent = 'Error';
          firstNumber = '';
          secondNumber = '';
          operationSign = '';
          return;
        }
  
        break;
      case '+/-':
        activeNumber *= -1;

        if (secondNumber) {
          secondNumber = activeNumber.toString();
        } else {
          firstNumber = activeNumber.toString();
        }

        out.textContent = secondNumber || firstNumber;
        break;
      case '🠖':
        if (activeNumber.length <= 1) {
          (secondNumber) ? secondNumber = '' : firstNumber = '';
        } else {
          activeNumber = activeNumber.substring(0, activeNumber.length - 1);

          (secondNumber) ? secondNumber = activeNumber : firstNumber = activeNumber;
        }

        out.textContent = secondNumber || firstNumber || 0;
        break;
    }
  }

  

  // если нажат =
  if (key === '=') {
    if (secondNumber === '') {
      secondNumber = firstNumber;
    }

    let result;

    switch (operationSign) {
      case '+':
        result = +firstNumber + +secondNumber;
        firstNumber = result.toFixed(8);
        break;
      case '-':
        result = firstNumber - secondNumber;
        firstNumber = result.toFixed(8);
        break;
      case 'X':
        result = firstNumber * secondNumber;
        firstNumber = result.toFixed(8);
        break;
      case '/':
        if (secondNumber === '0') {
          out.textContent = 'Error';
          firstNumber = '';
          secondNumber = '';
          operationSign = '';
          return;
        }

        result = firstNumber / secondNumber;
        firstNumber = result.toFixed(8);
        break;
    }

    finish = true;

    if (firstNumber) {
      out.textContent = firstNumber;
    } else {
      out.textContent = 0;
    }
  }
};
