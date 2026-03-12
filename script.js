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

const operations = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

function operator(op, a, b) {
  return operations[op](a, b);
}
