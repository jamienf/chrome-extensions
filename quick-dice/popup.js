document.addEventListener('DOMContentLoaded', function () {
  const inputField = document.getElementById('inputField');
  const rollButton = document.getElementById('rollButton');
  const resultDisplay = document.getElementById('result');
  const diceButtons = document.querySelectorAll('.dice-button');

  diceButtons.forEach(button => {
    button.addEventListener('click', function () {
      const value = button.getAttribute('data-value');
      const maxValue = parseInt(value);
      const randomNumber = Math.floor(Math.random() * maxValue) + 1;
      resultDisplay.textContent = randomNumber;
    });
  });

  rollButton.addEventListener('click', function () {
    const input = inputField.value.trim();

    if (input.includes(',')) {
      const options = input.split(',');
      const randomIndex = Math.floor(Math.random() * options.length);
      resultDisplay.textContent = options[randomIndex];
    } else {
      const maxValue = parseInt(input);
      if (!isNaN(maxValue) && maxValue > 0) {
        const randomNumber = Math.floor(Math.random() * maxValue) + 1;
        resultDisplay.textContent = randomNumber;
      } else {
        resultDisplay.textContent = 'Invalid input';
      }
    }
  });
});
