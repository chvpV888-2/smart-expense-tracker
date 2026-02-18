let myChart;

// This ensures the code only runs after the page (and Chart.js) has loaded
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});

async function loadData() {
    try {
        const res = await fetch('/api/expenses');
        const data = await res.json();

        updateTable(data);
        updateSummary(data);
        updateChart(data);
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function updateTable(data) {
    const tbody = document.getElementById('expenseTableBody');
    tbody.innerHTML = data.map(ex => `
        <tr>
            <td class="ps-4">${ex.description}</td>
            <td class="fw-bold">$${Number(ex.amount).toFixed(2)}</td>
            <td><span class="badge rounded-pill bg-light text-dark border">${ex.category}</span></td>
            <td>${ex.date}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-danger border-0" onclick="deleteExpense(${ex.id})">
                    Delete
                </button>
            </td>
        </tr>
    `).join('');
}

function updateSummary(data) {
    const total = data.reduce((sum, ex) => sum + Number(ex.amount), 0);
    document.getElementById('totalAmount').innerText = `$${total.toFixed(2)}`;
    document.getElementById('itemCount').innerText = data.length;
}

async function deleteExpense(id) {
    if(confirm("Are you sure you want to remove this entry?")) {
        await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
        loadData();
    }
}

function updateChart(data) {
    const categories = [...new Set(data.map(ex => ex.category))];
    const totals = categories.map(cat =>
        data.filter(ex => ex.category === cat).reduce((sum, ex) => sum + Number(ex.amount), 0)
    );

    // Update Top Category Card
    if(categories.length > 0) {
        const maxVal = Math.max(...totals);
        const topCat = categories[totals.indexOf(maxVal)];
        document.getElementById('topCategory').innerText = topCat;
    } else {
        document.getElementById('topCategory').innerText = "-";
    }

    const canvas = document.getElementById('expenseChart');
    if (!canvas) return; // Guard clause

    const ctx = canvas.getContext('2d');
    if (myChart) myChart.destroy();

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: totals,
                backgroundColor: ['#4e73df', '#1cc88a', '#f6c23e', '#e74a3b', '#36b9cc'],
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

// Fixed the form submission
document.getElementById('expenseForm').onsubmit = async (e) => {
    e.preventDefault();
    const expense = {
        description: document.getElementById('desc').value,
        amount: parseFloat(document.getElementById('amt').value),
        category: document.getElementById('cat').value,
        date: document.getElementById('date').value
    };

    try {
        await fetch('/api/expenses', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(expense)
        });
        e.target.reset();
        loadData();
    } catch (error) {
        console.error("Error saving expense:", error);
    }
};