document.addEventListener('DOMContentLoaded', function () {
  const inputField = document.getElementById('inputField');
  const rollButton = document.getElementById('rollButton');
  const resultDisplay = document.getElementById('result');
  const diceButtons = document.querySelectorAll('.dice-button');
  
  // Retrieve saved colors from localStorage
  const d6Color = localStorage.getItem('d6Color');
  const d12Color = localStorage.getItem('d12Color');
  const d20Color = localStorage.getItem('d20Color');
  const d100Color = localStorage.getItem('d100Color');
  const rollColor = localStorage.getItem('rollColor');

  // Apply colors to buttons
  document.getElementById('d6Button').style.borderColor = d6Color;
  document.getElementById('d6Button').style.color = d6Color;

  document.getElementById('d12Button').style.borderColor = d12Color;
  document.getElementById('d12Button').style.color = d12Color;

  document.getElementById('d20Button').style.borderColor = d20Color;
  document.getElementById('d20Button').style.color = d20Color;

  document.getElementById('d100Button').style.borderColor = d100Color;
  document.getElementById('d100Button').style.color = d100Color;

  document.getElementById('rollButton').style.borderColor = rollColor;
  document.getElementById('rollButton').style.color = rollColor;

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
