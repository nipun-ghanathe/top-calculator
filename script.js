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
let clearDisplay = false

function clickButton(eleId) {
  document.querySelector(`#${eleId}`).click()
}

const otherAllowedKeys = ['Backspace', 'Enter']

const display = document.querySelector('.display')

display.addEventListener('keydown', (e) => {
  if (['Backspace', 'Delete'].includes(e.key)) return

  e.preventDefault()

  if (/\d/.test(e.key)) {
    clickButton(`num-${e.key}`)
    return
  }

  switch (e.key) {
    case '.':
      clickButton('num-decimal')
      break
    case 'Escape':
      clickButton('clear-entry')
      break
    case 'Enter':
    case '=':
      clickButton('equal')
      break
    case '+':
      clickButton('add')
      break
    case '-':
      clickButton('sub')
      break
    case '*':
      clickButton('mul')
      break
    case '/':
      clickButton('div')
      break
  }
})

const nums = document.querySelectorAll('.num:not(#sign-change)')
for (let num of nums) {
  num.addEventListener('click', () => {
    if (clearDisplay) {
      display.value = ''
      clearDisplay = false
    }
    const value = num.textContent
    if (value !== '.' || !display.value.includes('.')) {
      display.value += value
    }
  })
}

const opBtns = document.querySelectorAll('.op')
for (let opBtn of opBtns) {
  const op = opBtn.textContent

  opBtn.addEventListener('click', () => {
    if (!operator) {
      operandA = display.value ? +display.value : 0
      operator = op !== '=' ? op : null
      clearDisplay = true
    } else {
      if (clearDisplay && op !== '=') {
        operator = op
        return
      }
      operandB = +display.value
      if (!operations[operator]) return
      const result = operations[operator](operandA, operandB)
      display.value = result
      clearDisplay = true
      operandB = null
      if (opBtn.textContent !== '=') {
        operandA = result
        operator = op
      } else {
        operandA = null
        operator = null
      }
    }
  })
}

const signChangeBtn = document.querySelector('#sign-change')
signChangeBtn.addEventListener('click', () => {
  if (!display.value) return
  if (display.value.startsWith('-')) {
    display.value = display.value.slice(1)
  } else {
    display.value = '-' + display.value
  }
})

const allClearBtn = document.querySelector('#all-clear')
allClearBtn.addEventListener('click', () => {
  display.value = ''
  operandA = null
  operandB = null
  operator = null
})

const clearEntryBtn = document.querySelector('#clear-entry')
clearEntryBtn.addEventListener('click', () => {
  display.value = ''
})

const backBtn = document.querySelector('#back')
backBtn.addEventListener('click', () => {
  display.value = display.value.slice(0, -1)
})
