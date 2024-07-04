document.getElementById('monthlyInvestment').addEventListener('input', updateValue);
document.getElementById('investmentYears').addEventListener('input', updateValue);
document.getElementById('investmentIncreaseRate').addEventListener('input', updateValue);
document.getElementById('annualReturnRate').addEventListener('input', updateValue);
document.getElementById('monthlyWithdrawal').addEventListener('input', updateValue);
document.getElementById('withdrawalIncreaseRate').addEventListener('input', updateValue);
document.getElementById('inflationRate').addEventListener('input', updateValue);

function updateValue(e) {
    const id = e.target.id;
    const value = e.target.value;
    document.getElementById(`${id}Value`).innerText = value;
    calculate();
}

function calculate() {
    let monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
    const investmentYears = parseFloat(document.getElementById('investmentYears').value);
    const investmentIncreaseRate = parseFloat(document.getElementById('investmentIncreaseRate').value) / 100;
    const annualReturnRate = parseFloat(document.getElementById('annualReturnRate').value) / 100;
    let monthlyWithdrawal = parseFloat(document.getElementById('monthlyWithdrawal').value);
    const withdrawalIncreaseRate = parseFloat(document.getElementById('withdrawalIncreaseRate').value) / 100;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;

    let balance = 0;
    let years = 0;

    // Investment phase
    for (let year = 0; year < investmentYears; year++) {
        for (let month = 0; month < 12; month++) {
            balance += monthlyInvestment;
            balance *= (1 + annualReturnRate / 12); // Apply monthly return rate
            monthlyWithdrawal *= (1 + inflationRate / 12); // Apply monthly return rate
        }
        monthlyInvestment *= (1 + investmentIncreaseRate); // Increase monthly investment annually
    }



    // Withdrawal phase
    while (balance > 0) {
        for (let month = 0; month < 12; month++) {
            balance -= monthlyWithdrawal;
            balance *= (1 + annualReturnRate / 12); // Apply monthly return rate
            balance /= (1 + inflationRate / 12); // Apply monthly inflation rate

            if (balance <= 0) {
                document.getElementById('result').innerText = `You can withdraw for ${years} years and ${month + 1} months.`;
                return;
            }
        }
        monthlyWithdrawal *= (1 + withdrawalIncreaseRate); // Increase monthly withdrawal annually
        years++;
    }

    document.getElementById('result').innerText = `You can withdraw for ${years} years.`;
}
