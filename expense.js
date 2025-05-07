document.addEventListener(`DOMContentLoaded`, () => {
    const expenseName = document.getElementById(`expense-name`);
    const amount = document.getElementById(`amt`);
    const expenseButton = document.getElementById(`expense-btn`);
    const expenses = document.getElementById(`all-expense`);
    const totalAmt = document.getElementById(`total-amt`);

    // Retrieve and parse stored data
    let expenseData = JSON.parse(localStorage.getItem(`expenseData`)) || [];

    // Add Expense on button click
    expenseButton.addEventListener(`click`, () => {
        const inputExpense = expenseName.value.trim();
        const inputAmt = amount.value.trim();
        if (inputExpense && inputAmt && !isNaN(inputAmt)) {
            addExpenses(inputExpense, parseFloat(inputAmt));
            expenseName.value = "";
            amount.value = "";
        }
    });

    // Delete expense on delete button click
    expenses.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            removeExpenses(e.target.getAttribute(`data-id`));
        }
    });

    // Add new expense to data, storage, and UI
    function addExpenses(inputExpense, inputAmt) {
        const dataId = Date.now(); // Unique ID as number
        const newExpense = { dataId, expense: inputExpense, amount: inputAmt };
        expenseData.push(newExpense);
        localStorage.setItem(`expenseData`, JSON.stringify(expenseData));
        renderExpenses(newExpense);
        updateTotal();
    }

    // Remove expense from data, storage, and UI
    function removeExpenses(dataID) {
        expenseData = expenseData.filter(data => data.dataId !== Number(dataID));
        localStorage.setItem(`expenseData`, JSON.stringify(expenseData));
        document.querySelectorAll(`[data-id='${dataID}']`).forEach(elem => elem.remove());
        updateTotal();
    }

    // Render a single expense item to the DOM
    function renderExpenses(data) {
        const wrapper = document.createElement(`div`);
        wrapper.setAttribute(`data-id`, `${data.dataId}`);
        wrapper.innerHTML = `
            <span>${data.expense} - $${data.amount.toFixed(2)}</span>
            <button data-id="${data.dataId}">Delete</button>
        `;
        expenses.appendChild(wrapper);
    }

    // Update total amount text
    function updateTotal() {
        const total = expenseData.reduce((sum, item) => sum + parseFloat(item.amount), 0);
        totalAmt.innerText = `Total: $${total.toFixed(2)}`;
    }

    // Initial render on page load
    expenseData.forEach(renderExpenses);
    updateTotal();
});
