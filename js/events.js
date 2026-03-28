import { state, handleOperator } from './state.js'
import { getDisplayValue, setDisplayValue, clearDisplay } from './ui.js'

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
        clearDisplay()
        state.clearDisplay = false
      }

      const value = num.textContent
      if (value !== '.' || !getDisplayValue().includes('.')) {
        setDisplayValue(getDisplayValue() + value)
      }
    })
  }
}

function handleOperatorButtons() {
  const opBtns = document.querySelectorAll('.op')

  for (let opBtn of opBtns) {
    opBtn.addEventListener('click', () => {
      const result = handleOperator(opBtn.textContent, getDisplayValue())
      setDisplayValue(result)
    })
  }
}

function handleSpecialButtons() {
  document.querySelector('#sign-change').addEventListener('click', () => {
    if (!getDisplayValue()) return
    if (getDisplayValue().startsWith('-')) {
      setDisplayValue(getDisplayValue().slice(1))
    } else {
      setDisplayValue('-' + getDisplayValue())
    }
  })

  document.querySelector('#all-clear').addEventListener('click', () => {
    clearDisplay()
    state.operandA = null
    state.operandB = null
    state.operator = null
  })

  document.querySelector('#clear-entry').addEventListener('click', () => {
    clearDisplay()
  })

  document.querySelector('#back').addEventListener('click', () => {
    setDisplayValue(getDisplayValue().slice(0, -1))
  })
}
