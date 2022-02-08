const maxDigits = 13;

const screen = document.querySelector(".screen-text");
const topScreen = document.querySelector(".top-screen");
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

let value = "";
let num1 = "";
let operator = "";
let sequence = "";

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(n1, n2, op) {
  n1 = parseInt(n1);
  n2 = parseInt(n2);

  switch (operator) {
    case "+":
      value = add(n1, n2).toString();
      break;
    case "-":
      value = subtract(n1, n2).toString();
      break;
    case "*":
      value = multiply(n1, n2).toString();
      break;
    case "/":
      value = divide(n1, n2).toString();
      break;
  }
  screen.innerHTML = value;
  //operator = ""; // Reset the operator.
  num1 = "";
}

function clear() {
  value = "";
  operator = "";
  num1 = "";
  screen.innerHTML = value;
  sequence = "";
  topScreen.innerHTML = sequence;
}

function operatorPressed(op) {
  topScreen.innerHTML += op;
  // Check if operator is empty. If not it means that we need to eval the expression
  if (operator != "" && num1 != "") {
    operate(num1, value, op);
    return;
  }

  // Store the first number before operand
  num1 = value;
  // Store the operator that is being applied
  operator = op;
  // Reset value to null for next number and clear the screen
  value = "";
  screen.innerHTML = value;
}

function handleButtonClick(e) {
  // Check if it's a number being entered. If the limit has not been reached add it to display
  if (e.target.id >= "0" && e.target.id <= "9" && value.length < maxDigits) {
    if (value != "" && operator != "") {
      num1 = value;
      value = e.target.id;
      screen.innerHTML = e.target.id;
      topScreen.innerHTML += e.target.id;
      return;
    }
    value += e.target.id;
    screen.innerHTML = value;
    topScreen.innerHTML += e.target.id;
  }

  // If not a number, determine what button was pressed
  switch (e.target.id) {
    case "c":
      clear();
      break;
    case "sign":
      break;
    case "%":
      break;
    case "/":
      operatorPressed("/");
      break;
    case "*":
      operatorPressed("*");
      break;
    case "-":
      operatorPressed("-");
      break;
    case "+":
      operatorPressed("+");
      break;
    case "=":
      if (num1 != "") operate(num1, value, operator);
      break;
    case ".":
      break;
  }
}
