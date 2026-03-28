import { state } from './state.js'

const display = document.querySelector('.display')

export function render() {
  display.value = state.displayValue
}
