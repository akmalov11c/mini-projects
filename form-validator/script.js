const form = document.getElementById("registration-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isRequired = checkValidation([
    usernameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
  ]);

  let isFormValid = isRequired;

  if (isRequired) {
    const isUsernameValid = checklength(usernameInput, 3, 15);
    const isEmailValid = checkEmail(emailInput);
    const isPasswordValid = checklength(passwordInput, 6, 25);
    const isConfirmPasswordValid = checkConfirmPassword(
      passwordInput,
      confirmPasswordInput
    );

    isFormValid =
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid;
  }

  if (isFormValid) {
    alert("Form submitted successfully!");
    form.reset();
    document
      .querySelectorAll(".form__group")
      .forEach((el) => (el.className = "form__group"));
  }
});

function checkValidation(inputs) {
  let isValid = true;

  // Clear previous error messages
  document
    .querySelectorAll(".form__error")
    .forEach((el) => (el.textContent = ""));

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${formatFieldName(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });

  return isValid;
}

function formatFieldName(input) {
  switch (input.id) {
    case "username":
      return "Username";
    case "email":
      return "Email";
    case "password":
      return "Password";
    case "confirm-password":
      return "Confirm Password";
    default:
      return "";
  }
}

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form__group error";
  const errorElement = formGroup.querySelector(".form__error");
  if (errorElement) {
    errorElement.innerText = message;
  }
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form__group success";
}

function checklength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${formatFieldName(input)} must be at least ${min} characters`
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${formatFieldName(input)} must be at most ${max} characters`
    );
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    showError(email, "Please enter a valid email address");
    return false;
  } else {
    showSuccess(email);
    return true;
  }
}

function checkConfirmPassword(passwordInput, confirmPasswordInput) {
  if (confirmPasswordInput.value !== passwordInput.value) {
    showError(confirmPasswordInput, "Passwords do not match");
    return false;
  } else {
    showSuccess(confirmPasswordInput);
    return true;
  }
}
