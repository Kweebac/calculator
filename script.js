function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  return num1 / num2;
}
function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
      break;
    case "-":
      return subtract(num1, num2);
      break;
    case "*":
      return multiply(num1, num2);
      break;
    case "/":
      return divide(num1, num2);
      break;
  }
}

const PREVIOUS_BOX = document.querySelector(".previous-box");
const OUTPUT_BOX = document.querySelector(".output-box");
const TEXTBOX_BOXES = document.querySelectorAll(".num");
const DOT_BOX = document.querySelector(".dot");
const CLEAR_BOX = document.querySelector(".clear");
const DELETE_BOX = document.querySelector(".delete");
const OPERATOR_BOXES = document.querySelectorAll(".operator");
const EQUAL_BOX = document.querySelector(".equal");
const KEYPAD_BOXES = document.querySelectorAll(".hover");

let firstValue = null;
let operator = null;
let secondValue = null;
let temp = false;

DOT_BOX.addEventListener("click", () => {
  if (!OUTPUT_BOX.textContent.includes("."))
    OUTPUT_BOX.textContent += DOT_BOX.textContent.trim();
});

KEYPAD_BOXES.forEach((each) => {
  each.addEventListener(
    "mouseenter",
    () => (each.style.backgroundColor = "lightgray")
  );
  each.addEventListener(
    "mouseleave",
    () => (each.style.backgroundColor = "white")
  );
});

DELETE_BOX.addEventListener(
  "click",
  () =>
    (OUTPUT_BOX.textContent = OUTPUT_BOX.textContent.slice(
      0,
      OUTPUT_BOX.textContent.length - 1
    ))
);
CLEAR_BOX.addEventListener("click", () => {
  PREVIOUS_BOX.textContent = "";
  OUTPUT_BOX.textContent = "";
  firstValue = null;
  operator = null;
  secondValue = null;
});

TEXTBOX_BOXES.forEach((each) =>
  each.addEventListener("click", () => {
    if (temp) {
      OUTPUT_BOX.textContent = "";
      temp = false;
    }
    OUTPUT_BOX.textContent += +each.textContent;
  })
);
OPERATOR_BOXES.forEach((each) =>
  each.addEventListener("click", () => {
    if (operator) {
      secondValue = +OUTPUT_BOX.textContent;

      if (secondValue === 0 && operator === "/") {
        alert("you remind me of an upside down dog stuck in a drain");
        return;
      }

      firstValue = operate(operator, firstValue, secondValue);
      OUTPUT_BOX.textContent = Math.round(firstValue * 10) / 10;

      operator = each.textContent.trim();
      temp = true;
      PREVIOUS_BOX.textContent += ` ${secondValue} ${operator}`;
    } else {
      firstValue = +OUTPUT_BOX.textContent;
      operator = each.textContent.trim();
      temp = true;
      PREVIOUS_BOX.textContent += ` ${firstValue} ${operator}`;
      OUTPUT_BOX.textContent = "";
    }
  })
);
EQUAL_BOX.addEventListener("click", () => {
  +OUTPUT_BOX.textContent === ""
    ? (secondValue = null)
    : (secondValue = +OUTPUT_BOX.textContent);

  if (secondValue === 0 && operator === "/") {
    alert("you remind me of an upside down dog stuck in a drain");
    return;
  }

  if (firstValue === null || operator === null || secondValue === null) return;
  firstValue = operate(operator, firstValue, secondValue);
  OUTPUT_BOX.textContent = Math.round(firstValue * 10) / 10;

  operator = null;
  secondValue = null;
  PREVIOUS_BOX.textContent = "";
});

// keyboard support
const PLUS = document.querySelector(".plus");
PLUS.addEventListener("keydown", (e) => console.log(e));
