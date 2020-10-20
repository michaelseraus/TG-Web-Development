const calculator = {
  displayValue: 0,
  firstOperand: null,
  secondOperand: null,
  waitingForOperand: false,
  operator: null,
  secondOperator: null
};

function updateDisplay() {
const display = document.querySelector("h1");
display.innerHTML = calculator.displayValue;
}
updateDisplay();

function inputDigit(digit) {
const {displayValue, waitingForSecondOperand} = calculator ; 
  
let clearbutton = document.getElementById('clear');
clearbutton.innerHTML = "C"

if (waitingForSecondOperand === true) {
calculator.displayValue = digit;
calculator.waitingForSecondOperand = false;

} else {
calculator.displayValue =
displayValue === 0 ? digit : displayValue + digit;
}
    console.log(calculator);}


function inputMinus(minus){

  if (calculator.displayValue === 0 ){
    calculator.displayValue = minus 

  } else if(calculator.waitingForSecondOperand === true){
      calculator.displayValue = minus 
      calculator.waitingForSecondOperand = false;
    }}

  
  function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
      calculator.displayValue = "0.";
      calculator.waitingForSecondOperand = false;
      return;
    } if(calculator.displayValue === 0){
      calculator.displayValue = calculator.displayValue + dot;
    }
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }}


    function inputOperator(clickedoperator) {
    const { displayValue, firstOperand, secondOperand, operator, secondOperator } = calculator;
    const inputValue = parseFloat(displayValue);
  
    if (firstOperand === null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
        } else if (clickedoperator) {
        let result = "";  
                      switch (clickedoperator) {
                      case "*":
                      case "/": {
                      calculator.secondOperand = calculator.firstOperand;
                      calculator.firstOperand = inputValue;
                      calculator.secondOperator = clickedoperator;
                      calculator.waitingForSecondOperand = true;
                      break;
                }
                      case "=":
                      case "+":{
                    // if there is a division or times
                      if (firstOperand && secondOperand) {
                        result = Calculate(inputValue, firstOperand, secondOperator);
                        result = Calculate(result, secondOperand, operator);
                      } else {
                          result = Calculate(firstOperand, inputValue, operator);
                      }
                      break;
                  }
                }
                calculator.displayValue = parseFloat(result.toFixed([7]));
                calculator.firstOperand = result;
              }
              calculator.waitingForSecondOperand = true;
              calculator.operator = clickedoperator;
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
if (operator === "%"){
return firstOperand % secondOperand;
}
return secondOperand;}


function reset() {
  calculator.displayValue = 0;
  calculator.firstOperand = null;
  calculator.secondOperand=null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  calculator.secondOperator= null;
  console.log(calculator);
  let clearbutton = document.getElementById('clear');
  clearbutton.innerHTML = "AC"
}


const keys = document.querySelector(".calc-buttons");

keys.addEventListener("click", (event) => {
  const { target } = event; /* const target = event.target; */

  if (target.classList.contains("operator")) {
    inputOperator(target.value);
    updateDisplay();
   
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
   
  }

  if (target.classList.contains("minus")) {
    inputMinus(target.value);
    updateDisplay();
  }

  if (target.classList.contains("clear")) {
    reset();
    updateDisplay();
    
  } else if (target.classList.contains("digit")) {
    inputDigit(target.value);
    updateDisplay();
  }
});












