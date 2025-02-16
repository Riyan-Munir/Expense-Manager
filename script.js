let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;

    if (amount === "" || category === "") {
        alert("Please fill in amount and category!");
        return;
    }

    let expense = {
        id: Date.now(),
        amount: parseFloat(amount),
        category: category,
        description: description
    };

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";

    displayExpenses();
}

function displayExpenses() {
    let list = document.getElementById("expense-list");
    list.innerHTML = "";

    let total = 0;

    expenses.forEach((expense) => {
        total += expense.amount;
        let li = document.createElement("li");
        li.innerHTML = `
            ${expense.category}: $${expense.amount} (${expense.description || "No description"}) 
            <button onclick="deleteExpense(${expense.id})">❌</button>
        `;
        list.appendChild(li);
    });

    document.getElementById("total").textContent = total;
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}

document.addEventListener("DOMContentLoaded", displayExpenses);
