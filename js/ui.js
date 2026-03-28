const display = document.querySelector('.display')

export function getDisplayValue() {
  return display.value
}

export function setDisplayValue(value) {
  display.value = value
}

export function clearDisplay() {
  display.value = ''
}
