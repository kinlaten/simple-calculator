window.addEventListener("load", () => {
  inputValue();
});

function inputValue() {
  let numberSelector = document.querySelectorAll(".number");
  let operatorSelector = document.querySelectorAll(".operator");

  let calculator = {
    currentInput: "0",
    rightOperand: null,
    leftOperand: null,
    currentOperator: null,
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
      return a / b;
    },
    "=": function () {
      return getResult();
    },
  };

  //handle number click
  Array.from(numberSelector).forEach((number) => {
    number.addEventListener("click", () => {
      //handle inputs operand
      // calculator.currentInput = number.value;
      // if (calculator.leftOperand === null) {
      //   calculator.leftOperand = calculator.currentInput;
      // } else if (calculator.leftOperand && !calculator.currentOperator) {
      //   calculator.leftOperand += calculator.currentInput;
      // } else if (calculator.leftOperand && calculator.currentOperator) {
      //   calculator.rightOperand = calculator.currentInput;
      // } else if (
      //   calculor.leftOperand &&
      //   calculator.rightOperand &&
      //   calculator.currentOperator
      // ) {
      //   calculator.rightOperand += calculator.currentInput;
      // }

      // if (calculator.leftOperand) {
      //   displayInputOutput(calculator.leftOperand);
      // } else if (calculator.rightOperand) {
      //   displayInputOutput(rightOperand);
      // }

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

      // put displayInputOutput inside a anonymous function to
      // make sure it is not be call immediately when load window,
      // which happen because the function need refer to parameter number.value
      console.log(number.value);
    });
  });

  //handle operator click
  Array.from(operatorSelector).forEach((operator) => {
    operator.addEventListener("click", () => {
      currentOperator = operator.value;
      //if there only leftOperand, no operator and no rightOperand, operating not run
      if (currentOperator && leftOperand && rightOperand) {
        result = equation[currentOperator](
          parseFloat(rightOperand),
          parseFloat(leftOperand)
        );
        console.log(result);
        return result;
      }
      return;
    });
  });
}

function displayInputOutput(value) {
  let currentInput = document.querySelector(".current__input");

  currentInput.textContent = value;
}
