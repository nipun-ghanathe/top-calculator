const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
}
operations['×'] = operations['*']
operations['÷'] = operations['/']

let operandA = null
let operandB = null
let operator = null
let clearDisplay = null

const display = document.querySelector('.display')

const nums = document.querySelectorAll('.num:not(.unary-op)')
for (let num of nums) {
  num.addEventListener('click', () => {
    if (clearDisplay) {
      display.textContent = ''
      clearDisplay = false
    }
    const value = num.textContent
    if (value !== '.' || !display.textContent.includes('.')) {
      display.textContent += value
    }
  })
}

const opBtns = document.querySelectorAll('.op')
for (let opBtn of opBtns) {
  const op = opBtn.textContent

  opBtn.addEventListener('click', () => {
    if (!operator) {
      operandA = +display.textContent
      operator = op
      clearDisplay = true
    } else {
      operandB = +display.textContent
      const result = operations[operator](operandA, operandB)
      display.textContent = result
      operandB = null
      if (opBtn.textContent !== '=') {
        operandA = result
        operator = op
        clearDisplay = true
      } else {
        operandA = null
        operator = null
      }
    }
  })
}

const clearBtn = document.querySelector('.clear')
clearBtn.addEventListener('click', () => {
  display.textContent = ''
})
