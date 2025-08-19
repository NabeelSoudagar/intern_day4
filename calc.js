 
        let display = document.getElementById('display');
        let currentInput = '0';
        let shouldResetDisplay = false;

        function updateDisplay() {
            display.value = currentInput;
        }

        function clearDisplay() {
            currentInput = '0';
            shouldResetDisplay = false;
            updateDisplay();
        }

        function appendToDisplay(value) {
            if (shouldResetDisplay) {
                currentInput = '0';
                shouldResetDisplay = false;
            }
            
            if (currentInput === '0' && value !== '.' && !isOperator(value)) {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                return;
            } else if (isOperator(value) && isOperator(currentInput[currentInput.length - 1])) {
                currentInput = currentInput.slice(0, -1) + value;
            } else {
                currentInput += value;
            }
            
            updateDisplay();
        }

        function isOperator(char) {
            return ['+', '-', '*', '/'].includes(char);
        }

        function deleteLast() {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }

        function calculate() {
            try {
                if (currentInput === '' || isOperator(currentInput[currentInput.length - 1])) {
                    return;
                }
                
                let result = eval(currentInput);
                
                if (result === Infinity || result === -Infinity) {
                    currentInput = 'Error';
                } else if (isNaN(result)) {
                    currentInput = 'Error';
                } else {
                    currentInput = result.toString();
                }
                
                shouldResetDisplay = true;
            } catch (error) {
                currentInput = 'Error';
                shouldResetDisplay = true;
            }
            updateDisplay();
        }

        // Keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (key >= '0' && key <= '9') {
                appendToDisplay(key);
            } else if (key === '.') {
                appendToDisplay('.');
            } else if (key === '+' || key === '-' || key === '*' || key === '/') {
                appendToDisplay(key);
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearDisplay();
            } else if (key === 'Backspace') {
                deleteLast();
            }
        });
