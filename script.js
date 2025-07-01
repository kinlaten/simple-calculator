window.addEventListener("load", () => {
  inputValue();
  displayExplanation();

  let buttonSelector = document.querySelectorAll("button");
  Array.from(buttonSelector)
    .filter((button) => button.value !== "=")
    .forEach((button) => {
      button.addEventListener("click", () => {
        displayExplanation();
      });
    });
});

let calculator = {
  currentInput: "0",
  rightOperand: null,
  leftOperand: null,
  currentOperator: null,
  result: null,
  resetDisplay: false,
};

let equation = {
  "+": function (a, b) {
    return a + b;
  },
  "-": function (a, b) {
    return a - b;
  },
  "*": function (a, b) {
    return a * b;
  },
  "/": function (a, b) {
    if (b == 0) {
      return null;
    }
    return a / b;
  },
};

function inputValue() {
  let numberSelector = document.querySelectorAll(".number");
  let operatorSelector = document.querySelectorAll(".operator");

  //handle number click
  Array.from(numberSelector).forEach((number) => {
    number.addEventListener("click", () => {
      const numberValueBuffer = number.value;

      if (calculator.resetDisplay) {
        calculator.currentInput = numberValueBuffer;
        calculator.resetDisplay = false;
      } else {
        //handle duplicated decimal point
        if (numberValueBuffer == "." && calculator.currentInput.includes(".")) {
          return;
        }

        //handle heading zero
        if (calculator.currentInput === "0" && numberValueBuffer != ".") {
          calculator.currentInput = numberValueBuffer;
        } else {
          calculator.currentInput += numberValueBuffer;
        }
      }
      displayInputOutput(calculator.currentInput);

      //pass current input value into operands
      if (!calculator.currentOperator) {
        calculator.leftOperand = calculator.currentInput;
        // console.log(calculator.leftOperand);
      } else if (calculator.leftOperand && calculator.currentOperator) {
        calculator.rightOperand = calculator.currentInput;
      }

      console.log(number.value);
      value = "=";
    });
  });

  //handle operator click
  Array.from(operatorSelector).forEach((operator) => {
    operator.addEventListener("click", () => {
      const op = operator.value;
      console.log(op);

      // If we have a result already, reset the display before next input
      if (calculator.result !== null) {
        calculator.leftOperand = calculator.currentInput;
        calculator.rightOperand = null;
        calculator.currentOperator = null;
        calculator.result = null;
        calculator.resetDisplay = true;
      }

      if (op === "=") {
        const result = calculate(
          calculator.currentOperator,
          calculator.leftOperand,
          calculator.rightOperand
        );
        if (result !== null) {
          calculator.currentInput = result.toString();
          displayInputOutput(calculator.currentInput);
          // Reset for new calculations
          calculator.leftOperand = calculator.currentInput;
          calculator.rightOperand = null;
          calculator.currentOperator = null;
          calculator.result = result;
          calculator.resetDisplay = true;
        }
      } else {
        // If an operator is pressed and we already have a left/right operand and operator,
        // calculate it first
        if (
          calculator.leftOperand &&
          calculator.currentOperator &&
          calculator.rightOperand
        ) {
          const result = calculate(
            calculator.currentOperator,
            calculator.leftOperand,
            calculator.rightOperand
          );
          console.log(result);
          if (result !== null) {
            calculator.currentInput = result.toString();
            displayInputOutput(calculator.currentInput);
            calculator.leftOperand = calculator.currentInput;
            calculator.rightOperand = null;
          }
        }

        // Set new operator for next calculation
        calculator.currentOperator = op;
        calculator.resetDisplay = true;
      }
    });
  });
}

function displayInputOutput(value) {
  //current input
  let currentInput = document.querySelector(".current__input");

  currentInput.textContent = value;
}

function displayExplanation() {
  let explainInput = document.querySelector(".explain__input");

  if (
    calculator.leftOperand !== null &&
    !calculator.currentOperator &&
    !calculator.rightOperand
  ) {
    explainInput.textContent = calculator.leftOperand;
    console.log(calculator.leftOperand);
  } else if (
    calculator.leftOperand !== null &&
    calculator.currentOperator &&
    !calculator.rightOperand
  ) {
    explainInput.textContent =
      calculator.leftOperand + " " + calculator.currentOperator;
  } else if (
    calculator.leftOperand !== null &&
    calculator.currentOperator &&
    calculator.rightOperand !== null
  ) {
    explainInput.textContent =
      calculator.leftOperand +
      " " +
      calculator.currentOperator +
      " " +
      calculator.rightOperand;
  }
  return;
}

function calculate(operator, leftOperand, rightOperand) {
  if (!operator || leftOperand === null || rightOperand === null) {
    return null;
  }

  const a = parseFloat(leftOperand);
  const b = parseFloat(rightOperand);
  const operation = equation[operator];

  if (typeof operation !== "function") {
    return null; // handle invalid operator (e.g. "=")
  }

  let result = operation(a, b);

  //check number is float or integer to present
  if (result % 1 !== 0) return result.toFixed(3);

  if (result) return result;
  return null;
}
