import { state, handleOperator } from './state.js'
import { render } from './ui.js'

export function initEvents() {
  const display = document.querySelector('.display')

  handleKeyboard(display)
  handleNumberButtons()
  handleOperatorButtons()
  handleSpecialButtons()
}

function clickButton(eleId) {
  document.querySelector(`#${eleId}`).click()
}

function handleKeyboard(display) {
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
}

function handleNumberButtons() {
  const nums = document.querySelectorAll('.num:not(#sign-change)')

  for (let num of nums) {
    num.addEventListener('click', () => {
      if (state.clearDisplay) {
        state.displayValue = ''
        state.clearDisplay = false
      }

      const value = num.textContent
      if (value !== '.' || !state.displayValue.includes('.')) {
        state.displayValue += value
      }

      render()
    })
  }
}

function handleOperatorButtons() {
  const opBtns = document.querySelectorAll('.op')

  for (let opBtn of opBtns) {
    opBtn.addEventListener('click', () => {
      state.displayValue = handleOperator(opBtn.textContent, state.displayValue)
      render()
    })
  }
}

function handleSpecialButtons() {
  document.querySelector('#sign-change').addEventListener('click', () => {
    if (!state.displayValue) return
    if (state.displayValue.startsWith('-')) {
      state.displayValue = state.displayValue.slice(1)
    } else {
      state.displayValue = '-' + state.displayValue
    }
    render()
  })

  document.querySelector('#all-clear').addEventListener('click', () => {
    state.operandA = null
    state.operandB = null
    state.operator = null
    state.displayValue = ''
    render()
  })

  document.querySelector('#clear-entry').addEventListener('click', () => {
    state.displayValue = ''
    render()
  })

  document.querySelector('#back').addEventListener('click', () => {
    state.displayValue = state.displayValue.slice(0, -1)
    render()
  })
}
