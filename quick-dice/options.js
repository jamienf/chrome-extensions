// options.js
document.addEventListener('DOMContentLoaded', function () {
  const d6ColorSelect = document.getElementById('d6Color');
  const d12ColorSelect = document.getElementById('d12Color');
  const d20ColorSelect = document.getElementById('d20Color');
  const d100ColorSelect = document.getElementById('d100Color');
  const rollColorSelect = document.getElementById('rollColor');

  // Add event listeners to save selected colors
  d6ColorSelect.addEventListener('change', function () {
    const selectedColor = d6ColorSelect.value;
    localStorage.setItem('d6Color', selectedColor);
  });

  d12ColorSelect.addEventListener('change', function () {
    const selectedColor = d12ColorSelect.value;
    localStorage.setItem('d12Color', selectedColor);
  });

  d20ColorSelect.addEventListener('change', function () {
    const selectedColor = d20ColorSelect.value;
    localStorage.setItem('d20Color', selectedColor);
  });

  d100ColorSelect.addEventListener('change', function () {
    const selectedColor = d100ColorSelect.value;
    localStorage.setItem('d100Color', selectedColor);
  });

  rollColorSelect.addEventListener('change', function () {
    const selectedColor = rollColorSelect.value;
    localStorage.setItem('rollColor', selectedColor);
  });

  // Retrieve previously saved colors
  const savedD6Color = localStorage.getItem('d6Color');
  if (savedD6Color) {
    d6ColorSelect.value = savedD6Color;
  }

  const savedD12Color = localStorage.getItem('d12Color');
  if (savedD12Color) {
    d12ColorSelect.value = savedD12Color;
  }

  const savedD20Color = localStorage.getItem('d20Color');
  if (savedD20Color) {
    d20ColorSelect.value = savedD20Color;
  }

  const savedD100Color = localStorage.getItem('d100Color');
  if (savedD100Color) {
    d100ColorSelect.value = savedD100Color;
  }

  const savedRollColor = localStorage.getItem('rollColor');
  if (savedRollColor) {
    rollColorSelect.value = savedRollColor;
  }
});
