export const state = {
  operandA: null,
  operandB: null,
  operator: null,
  clearDisplay: false,
}

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
}
operations['×'] = operations['*']
operations['÷'] = operations['/']

export function calculate(a, operator, b) {
  if (!operations[operator]) return null
  return operations[operator](a, b)
}

export function handleOperator(op, displayValue) {
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
