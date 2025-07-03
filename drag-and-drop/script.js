const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

for (const card of cards) {
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);
}

for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", drop);
}

// Restore state from localStorage
window.addEventListener("DOMContentLoaded", loadFromLocalStorage);

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.target.classList.add("dragging");
}

function dragEnd(e) {
  e.target.classList.remove("dragging");
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add("over");
}

function dragLeave(e) {
  e.target.classList.remove("over");
}

function drop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);
  e.target.classList.remove("over");

  const dropTarget = e.target.classList.contains("list")
    ? e.target
    : e.target.closest(".list");

  if (dropTarget) {
    dropTarget.appendChild(card);
    saveToLocalStorage(); // Save after moving
  }
}

// Save card positions to localStorage
function saveToLocalStorage() {
  const data = {};
  lists.forEach((list) => {
    const listId = list.id;
    const cardIds = Array.from(list.querySelectorAll(".card")).map(
      (card) => card.id
    );
    data[listId] = cardIds;
  });

  localStorage.setItem("kanbanData", JSON.stringify(data));
}

// Load card positions from localStorage
function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("kanbanData"));
  if (!data) return;

  for (const [listId, cardIds] of Object.entries(data)) {
    const list = document.getElementById(listId);
    if (list) {
      cardIds.forEach((cardId) => {
        const card = document.getElementById(cardId);
        if (card) {
          list.appendChild(card);
        }
      });
    }
  }
}
