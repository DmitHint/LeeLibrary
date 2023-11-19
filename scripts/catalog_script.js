function Accumulator(startingValue) {
    this.value = startingValue || 0;
}

Accumulator.prototype.read = function () {
    var inputValue = prompt('Введите число:');
    var numericValue = parseFloat(inputValue);

    if (!isNaN(numericValue)) {
        this.value += numericValue;
        updateDisplay();
    } else {
        alert('Некорректный ввод. Пожалуйста, введите число.');
    }
};

function updateDisplay() {
    var displayValueElement = document.getElementById('shopperCount');
    displayValueElement.textContent = accumulator.value;
}

function addValue() {
    accumulator.read();
}

var accumulator = new Accumulator(10);

updateDisplay();