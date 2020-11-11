const calculator = {
  displayValue: 0,
  firstOperand: null,
  secondOperand: null,
  waitingForOperand: false,
  operator: null,
  secondOperator: null
};

function updateDisplay() {
  const display = document.querySelector("h2");
  display.innerHTML = calculator.displayValue;
}
updateDisplay();

function inputDigit(digit) {
  const { displayValue, waitingForOperand } = calculator;
  let clearbutton = document.getElementById("clear");
  clearbutton.innerHTML = "C";

  if (waitingForOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForOperand = false;
  } else {
    calculator.displayValue = displayValue === 0 ? digit : displayValue + digit;
  }
  updateDisplay();
}

function inputMinus(minus) {
  const { displayValue, waitingForOperand } = calculator;
  let clearbutton = document.getElementById("clear");
  clearbutton.innerHTML = "C";

  if (displayValue && waitingForOperand !== true) {
    calculator.displayValue = calculator.displayValue - calculator.displayValue * 2;
  } else {
    calculator.displayValue = minus;
    calculator.waitingForOperand = false;
  }
  updateDisplay();
}

function inputDecimal(dot) {
  let clearbutton = document.getElementById("clear");
  clearbutton.innerHTML = "C";

  if (calculator.waitingForOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForOperand = false;
    updateDisplay();
    // return;
  }
  if (calculator.displayValue === 0) {
    calculator.displayValue = calculator.displayValue + dot;
  }
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
  updateDisplay();
}

function inputOperator(obj) {
  const {
    displayValue,
    firstOperand,
    secondOperand,
    operator,
    secondOperator,
    waitingForOperand
  } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForOperand) {
    calculator.operator = obj.value;
    console.log(calculator);
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (obj.value) {
    let result = "";
    switch (obj.value) {
      case "*":
      case "/": {
        calculator.secondOperand = calculator.firstOperand;
        calculator.firstOperand = inputValue;
        calculator.secondOperator = obj.value;
        calculator.waitingForOperand = true;
        console.log(calculator);
        break;
      }
      case "=":
      case "+":
      case "-": {
        // if there is a division or times
        if (firstOperand && secondOperand) {
          result = Calculate(firstOperand, inputValue, secondOperator);
          result = Calculate(result, secondOperand, operator);
        } else {
          result = Calculate(firstOperand, inputValue, operator);
        }
        break;
      }
    }
    calculator.displayValue = parseFloat(result.toFixed([2]));
    calculator.firstOperand = result;
    calculator.secondOperand = null;
  }
  calculator.waitingForOperand = true;
  calculator.operator = obj.value;
  updateDisplay();
  console.log(calculator);
}

function Calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  }
  if (operator === "-") {
    return firstOperand - secondOperand;
  }
  if (operator === "*") {
    return firstOperand * secondOperand;
  }
  if (operator === "/") {
    return firstOperand / secondOperand;
  }
  if (operator === "%") {
    return firstOperand % secondOperand;
  }
  return secondOperand;
}

function reset() {
  calculator.displayValue = 0;
  calculator.firstOperand = null;
  calculator.secondOperand = null;
  calculator.waitingForOperand = false;
  calculator.operator = null;
  calculator.secondOperator = null;
  console.log(calculator);
  let clearbutton = document.getElementById("clear");
  clearbutton.innerHTML = "AC";
  updateDisplay();
}
