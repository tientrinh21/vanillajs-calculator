class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement
		this.currentOperandTextElement = currentOperandTextElement
		this.clear()
	}

	clear() {
		this.previousOperand = ''
		this.currentOperand = ''
		this.operation = undefined
	}

	delete() {
		if (this.currentOperand === '') return
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return
		this.currentOperand = this.currentOperand.toString() + number.toString()
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') return

		if (this.previousOperand !== '') this.compute()
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}

	compute() {
		let result
		const previous = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)
		switch (this.operation) {
			case '+':
				result = previous + current
				break
			case '-':
				result = previous - current
				break
			case '×':
				result = previous * current
				break
			case '÷':
				result = previous / current
				break
			default:
				return
		}
		this.previousOperand = ''
		this.currentOperand = result
		this.operation = undefined
	}

	// Example: 10000 => 10,000
	formatNumber(number) {
		const stringNumber = number.toString()
		const beforeDecimalPoint = parseInt(stringNumber.split('.')[0])
		const afterDecimalPoint = stringNumber.split('.')[1]

		let display

		if (isNaN(beforeDecimalPoint)) display = ''
		else display = beforeDecimalPoint.toLocaleString('en')

		if (afterDecimalPoint !== undefined) display = `${display}.${afterDecimalPoint}`

		return display
	}

	updateScreen() {
		if (this.operation !== undefined)
			this.previousOperandTextElement.textContent = `${this.previousOperand} ${this.operation}`
		else this.previousOperandTextElement.textContent = ''
		this.currentOperandTextElement.textContent = this.formatNumber(this.currentOperand)
	}
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalButton = document.querySelector('[data-equal]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.textContent)
		calculator.updateScreen()
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.textContent)
		calculator.updateScreen()
	})
})

deleteButton.addEventListener('click', () => {
	calculator.delete()
	calculator.updateScreen()
})

allClearButton.addEventListener('click', () => {
	calculator.clear()
	calculator.updateScreen()
})

equalButton.addEventListener('click', () => {
	calculator.compute()
	calculator.updateScreen()
})
