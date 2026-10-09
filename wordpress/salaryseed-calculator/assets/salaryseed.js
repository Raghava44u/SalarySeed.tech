// SalarySeed WordPress JavaScript Bundle
(function() {
  function formatINR(val) {
    if (isNaN(val)) return '₹ 0';
    return '₹ ' + Math.round(val).toLocaleString('en-IN');
  }

  function calculateTax(taxable) {
    if (taxable <= 0) return 0;
    let tax = 0;
    if (taxable > 300000) {
      tax += Math.min(taxable - 300000, 400000) * 0.05;
    }
    if (taxable > 700000) {
      tax += Math.min(taxable - 700000, 300000) * 0.10;
    }
    if (taxable > 1000000) {
      tax += Math.min(taxable - 1000000, 200000) * 0.15;
    }
    if (taxable > 1200000) {
      tax += Math.min(taxable - 1200000, 300000) * 0.20;
    }
    if (taxable > 1500000) {
      tax += (taxable - 1500000) * 0.30;
    }
    // S.87A rebate
    if (taxable <= 700000) tax = 0;
    return Math.round(tax * 1.04); // With 4% Cess
  }

  function updateWP() {
    const ctcEl = document.getElementById('wp-ctc-input');
    if (!ctcEl) return;
    const ctc = parseFloat(ctcEl.value) || 0;
    const basic = Math.round(ctc * 0.40);
    const hra = Math.round(basic * 0.50);
    const empPf = Math.round(basic * 0.12);
    const gratuity = Math.round(basic * 0.0481);
    const special = Math.max(0, Math.round(ctc - basic - hra - empPf - gratuity));
    const gross = basic + hra + special;
    const pt = 2400;

    const taxable = Math.max(0, gross - 75000);
    const tax = calculateTax(taxable);

    const totalDed = empPf + pt + tax;
    const inHand = Math.max(0, gross - totalDed);
    const monthlyInHand = Math.round(inHand / 12);

    const resMonthly = document.getElementById('wp-res-monthly');
    const resAnnual = document.getElementById('wp-res-annual');
    const tbody = document.getElementById('wp-table-body');

    if (resMonthly) resMonthly.textContent = formatINR(monthlyInHand);
    if (resAnnual) resAnnual.textContent = formatINR(inHand) + ' / year';

    if (tbody) {
      tbody.innerHTML = `
        <tr><td>Basic Salary (40%)</td><td style="text-align:right;">${formatINR(basic/12)}</td><td style="text-align:right;">${formatINR(basic)}</td></tr>
        <tr><td>HRA (50% of Basic)</td><td style="text-align:right;">${formatINR(hra/12)}</td><td style="text-align:right;">${formatINR(hra)}</td></tr>
        <tr><td>Special Allowance</td><td style="text-align:right;">${formatINR(special/12)}</td><td style="text-align:right;">${formatINR(special)}</td></tr>
        <tr style="font-weight:700; background:#f8fafc;"><td>Gross Cash Salary</td><td style="text-align:right;">${formatINR(gross/12)}</td><td style="text-align:right;">${formatINR(gross)}</td></tr>
        <tr style="color:#ef4444;"><td>Employee PF (12%)</td><td style="text-align:right;">-${formatINR(empPf/12)}</td><td style="text-align:right;">-${formatINR(empPf)}</td></tr>
        <tr style="color:#ef4444;"><td>Professional Tax</td><td style="text-align:right;">-₹ 200</td><td style="text-align:right;">-₹ 2,400</td></tr>
        <tr style="color:#ef4444;"><td>Income Tax (TDS)</td><td style="text-align:right;">-${formatINR(tax/12)}</td><td style="text-align:right;">-${formatINR(tax)}</td></tr>
        <tr style="font-weight:800; background:#ecfdf5; color:#064e3b;"><td>Net Monthly Take-Home</td><td style="text-align:right;">${formatINR(monthlyInHand)}</td><td style="text-align:right;">${formatINR(inHand)}</td></tr>
      `;
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    const ctcEl = document.getElementById('wp-ctc-input');
    const regEl = document.getElementById('wp-regime-input');
    if (ctcEl) ctcEl.addEventListener('input', updateWP);
    if (regEl) regEl.addEventListener('change', updateWP);
    updateWP();
  });
})();
