const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income-amount");
const expensesElement = document.getElementById("expense-amount");
const transactionList = document.getElementById("transaction__list");
const transactionForm = document.getElementById("transaction-form");
const descriptionElement = document.getElementById("description");
const amountElement = document.getElementById("amount");

let transactions = localStorage.getItem("transactions")
  ? JSON.parse(localStorage.getItem("transactions"))
  : [];

transactionForm.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();

  const description = descriptionElement.value.trim();
  const amount = parseFloat(amountElement.value.trim());

  if (description === "" || isNaN(amount)) {
    alert("Please enter a valid description and amount.");
    return;
  }

  const transaction = {
    id: Date.now(),
    description,
    amount,
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  descriptionElement.value = "";
  amountElement.value = "";

  updateTransactionList();
  updateSummary();

  transactionForm.reset();
}

function updateTransactionList() {
  transactionList.innerHTML = "";

  const sortedTransactions = [...transactions].reverse();

  sortedTransactions.forEach((transaction) => {
    const transactionEl = createTransactionElement(transaction);
    transactionList.appendChild(transactionEl);
  });
}

function createTransactionElement(transaction) {
  const li = document.createElement("li");
  li.classList.add("transaction");
  li.classList.add(transaction.amount < 0 ? "expenses" : "income");

  li.innerHTML = `
    <span>${transaction.description}</span>
    <span>${transaction.amount}<button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button></span>
    
  `;

  return li;
}

function updateSummary() {
  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  balanceElement.textContent = formatCurrency(balance);
  incomeElement.textContent = formatCurrency(income);
  expensesElement.textContent = formatCurrency(Math.abs(expenses));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateTransactionList();
  updateSummary();
}

updateTransactionList();
updateSummary();
