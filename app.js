window.onload = () => {
    document.getElementById("calculateBtn").addEventListener("click", calculateLoan);
    document.getElementById("toggleTheme").addEventListener("click", toggleTheme);
};

function calculateLoan() {
    const principal = parseFloat(document.getElementById('amount').value);
    const interestRate = parseFloat(document.getElementById('interest').value);
    const tenure = parseInt(document.getElementById('tenure').value);
    const errorEl = document.getElementById('error');

    // Clear previous error
    errorEl.textContent = '';

    // Validation
    if (isNaN(principal) || principal <= 0) {
        errorEl.textContent = 'Please enter a valid Loan Amount.';
        return;
    }

    if (isNaN(interestRate) || interestRate <= 0) {
        errorEl.textContent = 'Please enter a valid Interest Rate.';
        return;
    }

    if (isNaN(tenure) || tenure <= 0) {
        errorEl.textContent = 'Please enter a valid Tenure in months.';
        return;
    }

    const monthlyInterest = interestRate / 100 / 12;
    const emi = principal * monthlyInterest * Math.pow(1 + monthlyInterest, tenure) /
        (Math.pow(1 + monthlyInterest, tenure) - 1);

    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    // Show result
    document.getElementById("emi").innerText = emi.toFixed(2);
    document.getElementById("total").innerText = totalAmount.toFixed(2);
    document.getElementById("interestAmount").innerText = totalInterest.toFixed(2);
}

//for dark mode screen
function toggleTheme() {
    const body = document.body;
    const toggleBtn = document.getElementById("toggleTheme");

    body.classList.toggle('dark-mode');

    // Toggle icon and text
    if (body.classList.contains('dark-mode')) {
        toggleBtn.innerText = "☀️ Light Mode";
    } else {
        toggleBtn.innerText = "🌙 Dark Mode";
    }
}

function calculateLoan() {
    const principal = parseFloat(document.getElementById('amount').value);
    const interestRate = parseFloat(document.getElementById('interest').value);
    const tenure = parseInt(document.getElementById('tenure').value);

    const emiDisplay = document.getElementById("emi");
    const totalDisplay = document.getElementById("total");
    const interestAmountDisplay = document.getElementById("interestAmount");
    const tableBody = document.getElementById("tableBody");

    // Clear old data
    emiDisplay.innerText = '';
    totalDisplay.innerText = '';
    interestAmountDisplay.innerText = '';
    tableBody.innerHTML = '';

    if (!principal || !interestRate || !tenure) {
        alert("Please fill all input fields.");
        return;
    }

    const monthlyInterest = interestRate / 100 / 12;
    const emi = principal * monthlyInterest * Math.pow(1 + monthlyInterest, tenure) /
        (Math.pow(1 + monthlyInterest, tenure) - 1);

    let balance = principal;
    let totalInterest = 0;

    for (let i = 1; i <= tenure; i++) {
        const interest = balance * monthlyInterest;
        const principalPaid = emi - interest;
        balance -= principalPaid;
        totalInterest += interest;

        // Avoid negative
        if (balance < 0) balance = 0;

        const row = `
            <tr>
                <td>${i}</td>
                <td>₹${emi.toFixed(2)}</td>
                <td>₹${principalPaid.toFixed(2)}</td>
                <td>₹${interest.toFixed(2)}</td>
                <td>₹${balance.toFixed(2)}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    }

    const totalAmount = emi * tenure;

    emiDisplay.innerText = emi.toFixed(2);
    totalDisplay.innerText = totalAmount.toFixed(2);
    interestAmountDisplay.innerText = (totalAmount - principal).toFixed(2);
}