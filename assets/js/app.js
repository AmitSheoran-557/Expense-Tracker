const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategorySelect = document.getElementById('expense-category');
const expenseList = document.getElementById('expense-list');
const totalExpenseElement = document.getElementById('total-expense');
const addExpenseButton = document.getElementById('add-expense');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const updateUI = () => {
  expenseList.innerHTML = '';
  let totalExpense = 0;

  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement('li');
    expenseItem.className = 'flex justify-between items-center bg-gray-100 p-2 rounded-md shadow-sm';

    expenseItem.innerHTML = `
      <span>${expense.name} (${expense.category})</span>
      <div class="flex items-center gap-2">
        <span class="text-gray-700 font-medium">$${expense.amount.toFixed(2)}</span>
        <button class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 delete-btn" data-index="${index}">Delete</button>
      </div>
    `;

    expenseList.appendChild(expenseItem);
    totalExpense += expense.amount;
  });

  totalExpenseElement.textContent = totalExpense.toFixed(2);
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

const deleteExpense = (index) => {
  expenses.splice(index, 1);
  updateUI();
};

addExpenseButton.addEventListener('click', () => {
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);
  const category = expenseCategorySelect.value;

  if (!name || isNaN(amount) || amount <= 0) {
    alert('Please enter valid expense details!');
    return;
  }

  expenses.push({ name, amount, category });
  updateUI();

  expenseNameInput.value = '';
  expenseAmountInput.value = '';
});

expenseList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.getAttribute('data-index');
    deleteExpense(index);
  }
});

updateUI();