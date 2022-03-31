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

  out.textContent = '';
  const key = event.target.textContent;
  let isFinish = firstNumber !== '' && secondNumber !== '' && finish;
  let isFirstNumber = (firstNumber === '' && operationSign === '') ||
                      (firstNumber && secondNumber === '' && !operationSign);

  // если нажата 0-9 или .
  if (digit.includes(key)) {
    if (isFirstNumber) {
      firstNumber += key;
      out.textContent = firstNumber;
    } else if (isFinish) {
      secondNumber = key;
      finish = false;
      out.textContent = secondNumber;
    } else {
      secondNumber += key;
      out.textContent = secondNumber;
    }

    return;
  }

  // если нажаты + - / *
  if (action.includes(key)) {
    operationSign = key;
    out.textContent = operationSign;

    switch (operationSign) {
      case '+':
        if (secondNumber) {
          firstNumber = +firstNumber + +secondNumber;
          secondNumber = '';
          out.textContent = firstNumber;
          return;
        }

        break;
      case '-':
        if (secondNumber) {
          firstNumber = firstNumber - secondNumber;
          secondNumber = '';
          out.textContent = firstNumber;
          return;
        }
  
        break;
      case 'X':
        if (secondNumber) {
          firstNumber = firstNumber * secondNumber;
          secondNumber = '';
          out.textContent = firstNumber;
          return;
        }
  
        break;
      case '/':
        if (secondNumber) {
          firstNumber = firstNumber / secondNumber;
          secondNumber = '';
          out.textContent = firstNumber;
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
        if (key > 0) {
          '-' + key;
        } else {
          '+' + key;
        }
        
        break;
      case '🠖':
        if (firstNumber) {
          firstNumber.split().pop.join();
        } else {
          secondNumber.split().pop.join();
        }

        break;
    }
  }

  

  // если нажат =
  if (key === '=') {
    if (secondNumber === '') {
      secondNumber = firstNumber;
    }

    switch (operationSign) {
      case '+':
        firstNumber = +firstNumber + +secondNumber;
        break;
      case '-':
        firstNumber = firstNumber - secondNumber;
        break;
      case 'X':
        firstNumber = firstNumber * secondNumber;
        break;
      case '/':
        if (secondNumber === '0') {
          out.textContent = 'Error';
          firstNumber = '';
          secondNumber = '';
          operationSign = '';
          return;
        }

        firstNumber = firstNumber / secondNumber;
        break;
      case '🠖':
        if (firstNumber) {
          firstNumber.split().pop.join();
        } else {
          secondNumber.split().pop.join();
        }
    }

    finish = true;

    if (firstNumber) {
      out.textContent = firstNumber;
    } else {
      out.textContent = 0;
    }
  }
};
