const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
}
operations['×'] = operations['*']
operations['÷'] = operations['/']

const state = {
  operandA: null,
  operandB: null,
  operator: null,
  clearDisplay: false,
}

function calculate(a, operator, b) {
  if (!operations[operator]) return null
  return operations[operator](a, b)
}

function clickButton(eleId) {
  document.querySelector(`#${eleId}`).click()
}

const otherAllowedKeys = ['Backspace', 'Enter']

const display = document.querySelector('.display')

function getDisplayValue() {
  return display.value
}

function setDisplayValue(value) {
  display.value = value
}

function clearDisplay() {
  display.value = ''
}

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
    if (state.clearDisplay) {
      clearDisplay()
      state.clearDisplay = false
    }
    const value = num.textContent
    if (value !== '.' || !getDisplayValue().includes('.')) {
      setDisplayValue(getDisplayValue() + value)
    }
  })
}

function handleOperator(op, displayValue) {
  if (!state.operator) {
    state.operandA = displayValue ? +displayValue : 0
    state.operator = op !== '=' ? op : null
    state.clearDisplay = true
    return displayValue
  }

  if (state.clearDisplay && op !== '=') {
    state.operator = op
    return displayValue
  }

  state.operandB = +displayValue

  const result = calculate(state.operandA, state.operator, state.operandB)

  if (result === null) return displayValue

  state.clearDisplay = true
  state.operandB = null
  if (op !== '=') {
    state.operandA = result
    state.operator = op
  } else {
    state.operandA = null
    state.operator = null
  }

  return result
}

const opBtns = document.querySelectorAll('.op')
for (let opBtn of opBtns) {
  const op = opBtn.textContent

  opBtn.addEventListener('click', () => {
    const result = handleOperator(op, getDisplayValue())
    setDisplayValue(result)
  })
}

const signChangeBtn = document.querySelector('#sign-change')
signChangeBtn.addEventListener('click', () => {
  if (!getDisplayValue()) return
  if (getDisplayValue().startsWith('-')) {
    setDisplayValue(getDisplayValue().slice(1))
  } else {
    setDisplayValue('-' + getDisplayValue())
  }
})

const allClearBtn = document.querySelector('#all-clear')
allClearBtn.addEventListener('click', () => {
  clearDisplay()
  state.operandA = null
  state.operandB = null
  state.operator = null
})

const clearEntryBtn = document.querySelector('#clear-entry')
clearEntryBtn.addEventListener('click', () => {
  clearDisplay()
})

const backBtn = document.querySelector('#back')
backBtn.addEventListener('click', () => {
  setDisplayValue(getDisplayValue().slice(0, -1))
})
