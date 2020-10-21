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
const {displayValue, waitingForOperand} = calculator ; 
let clearbutton = document.getElementById('clear');
clearbutton.innerHTML = "C"

if (waitingForOperand === true) {
calculator.displayValue = digit;
calculator.waitingForOperand = false;

} else {
calculator.displayValue =
displayValue === 0 ? digit : displayValue + digit;
}}




function inputMinus(minus){
  const {displayValue, waitingForOperand, operator} = calculator;

  if (displayValue === 0 ){
    calculator.displayValue = minus 

  } if (displayValue && waitingForOperand !== true){
    calculator.displayValue = minus + calculator.displayValue
  }
  else if(waitingForOperand === true){
      calculator.displayValue = minus 
      calculator.waitingForOperand = false;
    }
  }
  
    

  
  function inputDecimal(dot) {
    if (calculator.waitingForOperand === true) {
      calculator.displayValue = "0.";
      calculator.waitingForOperand = false;
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

    if(operator && calculator.waitingForOperand){
      calculator.operator = clickedoperator;
      console.log(calculator);
      return;
    }
  
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
                    
                      calculator.waitingForOperand = true;
                      console.log(calculator);
                      break;
                }
                      case "=":
                        case "+":
                          case "-":{
                      // if there is a division or times 

                      if (firstOperand && secondOperand) {
                      result = Calculate(inputValue, firstOperand, secondOperator);
                      result = Calculate(result, secondOperand, operator);

                      }else {
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
  calculator.waitingForOperand = false;
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












