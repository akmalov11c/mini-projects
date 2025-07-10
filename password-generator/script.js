const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length__value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate__btn");
const copyButton = document.getElementById("copy__btn");
const strengthBar = document.getElementById("strength__bar");
const strengthLabel = document.getElementById("strength__label");
const toggleVisibility = document.getElementById("toggle__visibility");

// Character sets
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

// Update slider display
lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

// Generate password button
generateButton.addEventListener("click", createPassword);

// Checkbox event listeners
function createPassword() {
  const length = parseInt(lengthSlider.value);
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  if (
    !includeUppercase &&
    !includeLowercase &&
    !includeNumbers &&
    !includeSymbols
  ) {
    alert("Please select at least one character type.");
    return;
  }

  if (length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  const newPassword = generatePassword(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  );

  passwordInput.value = newPassword;
  updateStrengthBar(newPassword);
}

// Generate password function
function generatePassword(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols
) {
  let characterSet = "";
  let guaranteedChars = [];

  if (includeUppercase) {
    characterSet += uppercaseChars;
    guaranteedChars.push(getRandomChar(uppercaseChars));
  }
  if (includeLowercase) {
    characterSet += lowercaseChars;
    guaranteedChars.push(getRandomChar(lowercaseChars));
  }
  if (includeNumbers) {
    characterSet += numberChars;
    guaranteedChars.push(getRandomChar(numberChars));
  }
  if (includeSymbols) {
    characterSet += symbolChars;
    guaranteedChars.push(getRandomChar(symbolChars));
  }

  // Ensure the password length is at least as long as the number of guaranteed characters
  let remainingLength = length - guaranteedChars.length;
  let password = guaranteedChars;

  // If remaining length is less than 0, set it to 0
  for (let i = 0; i < remainingLength; i++) {
    password.push(getRandomChar(characterSet));
  }

  return shuffleArray(password).join("");
}

// Get a random character from a set
function getRandomChar(set) {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return set[array[0] % set.length];
}

// Shuffle an array using Fisher-Yates algorithm
function shuffleArray(arr) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// Update strength bar based on password
function updateStrengthBar(password) {
  const length = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password);

  let strength = 0;
  strength += Math.min(length * 2, 40);
  if (hasUppercase) strength += 15;
  if (hasLowercase) strength += 15;
  if (hasNumbers) strength += 15;
  if (hasSymbols) strength += 15;

  if (length < 8) strength = Math.min(strength, 40);

  // Ensure strength is within a reasonable range
  const finalStrength = Math.max(5, Math.min(100, strength));
  strengthBar.style.width = `${finalStrength}%`;

  let strengthLabelText = "";
  let strengthColor = "";

  // Set strength label and color based on final strength
  if (finalStrength < 40) {
    strengthLabelText = "Weak";
    strengthColor = "#f8d7da";
  } else if (finalStrength < 70) {
    strengthLabelText = "Medium";
    strengthColor = "#ffe58f";
  } else {
    strengthLabelText = "Strong";
    strengthColor = "#52c41a";
  }

  strengthBar.style.backgroundColor = strengthColor;
  strengthLabel.textContent = strengthLabelText;
}

// Clipboard copy
copyButton.addEventListener("click", () => {
  if (!passwordInput.value) return;

  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => showSuccess())
    .catch((err) => console.error("Failed to copy password: ", err));
});

// Show success message
function showSuccess() {
  copyButton.classList.remove("far", "fa-copy");
  copyButton.classList.add("fas", "fa-check");
  copyButton.style.color = "#52c41a";

  setTimeout(() => {
    copyButton.classList.remove("fas", "fa-check");
    copyButton.classList.add("far", "fa-copy");
    copyButton.style.color = "";
  }, 2000);
}

// Toggle visibility
toggleVisibility.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  toggleVisibility.classList.toggle("fa-eye-slash", isHidden);
  toggleVisibility.classList.toggle("fa-eye", !isHidden);
});

// Initialize
window.addEventListener("DOMContentLoaded", createPassword);
