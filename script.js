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
    if (state.clearDisplay) {
      display.value = ''
      state.clearDisplay = false
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
    if (!state.operator) {
      state.operandA = display.value ? +display.value : 0
      state.operator = op !== '=' ? op : null
      state.clearDisplay = true
    } else {
      if (state.clearDisplay && op !== '=') {
        state.operator = op
        return
      }
      state.operandB = +display.value
      if (!operations[state.operator]) return
      const result = operations[state.operator](state.operandA, state.operandB)
      display.value = result
      state.clearDisplay = true
      state.operandB = null
      if (opBtn.textContent !== '=') {
        state.operandA = result
        state.operator = op
      } else {
        state.operandA = null
        state.operator = null
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
  state.operandA = null
  state.operandB = null
  state.operator = null
})

const clearEntryBtn = document.querySelector('#clear-entry')
clearEntryBtn.addEventListener('click', () => {
  display.value = ''
})

const backBtn = document.querySelector('#back')
backBtn.addEventListener('click', () => {
  display.value = display.value.slice(0, -1)
})
