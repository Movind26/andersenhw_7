let number = '';
let operationSign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/', '+/-', '🠖'];
const out = document.querySelector('.calc-screen p');

function clear() {
  number = '';
  operationSign = '';
  finish = false;
  out.textContent = 0;
}

document.querySelector('.c').onclick = clear;

document.querySelector('.buttons').onclick = (event) => {
  if (!event.target.classList.contains('btn')) {
    return;
  }

  if (event.target.classList.contains('c')) {
    return;
  }

  const key = event.target.textContent;
  let isFinish = number !== '' && finish;

  // если нажали цифру или .
  if (digit.includes(key)) {
    if (isFinish) {
      number = key;
      finish = false;
      out.textContent = number;
    } else {
      if (key.includes('.') && number.includes('.')) {
        return;
      }
      
      number += key;
      out.textContent = number;
    }

    return;
  }

  // если нажаты знаки
  if (action.includes(key)) {
    operationSign = key;

    switch (operationSign) {
      case '+/-':
        number *= -1;
        number = number.toString();
        out.textContent = number;
        break;
      case '🠖':
        if (number.length <= 1) {
          number = '';
          out.textContent = 0;
        } else {
          number = number.substring(number.length - 1);
          out.textContent = number;
        }

        break;
    }
  }

  // если нажат =
  if (key === '=') {
    switch (operationSign) {
      case '+':
    }
  }
};
