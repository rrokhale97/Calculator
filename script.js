const displayField = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

// calculate first and second values depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

  "%": (firstNumber, secondNumber) => (firstNumber / 100) * secondNumber,

  "=": (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = " ";
let awaitingNextValue = false;

function sendNumberValue(number) {
  //   Replace current display value if first vaue is entered
  if (awaitingNextValue) {
    displayField.textContent = number;
    awaitingNextValue = false;
  } else {
    // if current dispaly value is 0,replace it if not add number
    const displayValue = displayField.textContent;
    displayField.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // if operator pressed, don't add decimal
  if (awaitingNextValue) return;
  // if no decimal, add one decimal
  if (!displayField.textContent.includes(".")) {
    displayField.textContent = `${displayField.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(displayField.textContent);
  //   prevent multiple opeartors
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  //   Assign first value if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    console.log(firstValue, operatorValue, currentValue);
    const calculation = calculate[operatorValue](firstValue, currentValue);
    displayField.textContent = calculation;
    console.log("calculation", calculation);
    firstValue = calculation;
  }
  //   Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset displayfield
function resetAll() {
  firstValue = 0;
  operatorValue = " ";
  awaitingNextValue = false;
  displayField.textContent = "0";
}

// Add EventListeners for numbers, operators, and decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

clearBtn.addEventListener("click", resetAll);
