const generateBtn = document.getElementById("generate-btn");
const colorContainer = document.querySelector(".color-container");

generateBtn.addEventListener("click", generateColors);
colorContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("copy-btn")) {
    const hexValue = event.target.previousElementSibling.textContent;

    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopyMessage(event.target))
      .catch((err) => console.log(err));
  } else if (event.target.classList.contains("color")) {
    const hexValue =
      event.target.nextElementSibling.querySelector(".hex-value").textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() =>
        showCopyMessage(
          event.target.nextElementSibling.querySelector(".copy-btn")
        )
      )
      .catch((err) => console.log(err));
  }
});

function showCopyMessage(element) {
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");

  element.style.color = "#4CAF50";

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "";
  }, 1500);
}

function generateColors() {
  const colors = [];

  for (let i = 0; i < 5; i++) {
    colors.push(getRandomColor());
  }

  updateDisplay(colors);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateDisplay(colors) {
  const colorElements = document.querySelectorAll(".color-box");

  colorElements.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const hexCode = box.querySelector(".hex-value");

    colorDiv.style.backgroundColor = color;
    hexCode.textContent = color;
  });
}

generateColors();
