/**
 * SalarySeed Interactive Calculator Application
 * Connects UI inputs to the salary-engine calculation methods
 */

import {
  formatINR,
  calculateQuickEstimate,
  calculateDetailedBreakdown,
  TAX_REGIMES
} from './salary-engine.js';

let currentMode = 'quick'; // 'quick' | 'detailed'

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initQuickMode();
  initDetailedMode();
  initActions();

  // Run initial calculation with default 10 LPA
  updateQuickEstimate();
});

function initTabs() {
  const tabQuick = document.getElementById('tab-quick');
  const tabDetailed = document.getElementById('tab-detailed');
  const formQuick = document.getElementById('form-quick');
  const formDetailed = document.getElementById('form-detailed');

  if (!tabQuick || !tabDetailed) return;

  tabQuick.addEventListener('click', () => {
    currentMode = 'quick';
    tabQuick.classList.add('active');
    tabDetailed.classList.remove('active');
    formQuick.style.display = 'block';
    formDetailed.style.display = 'none';
    updateQuickEstimate();
  });

  tabDetailed.addEventListener('click', () => {
    currentMode = 'detailed';
    tabDetailed.classList.add('active');
    tabQuick.classList.remove('active');
    formDetailed.style.display = 'block';
    formQuick.style.display = 'none';
    updateDetailedBreakdown();
  });
}

function initQuickMode() {
  const ctcInput = document.getElementById('quick-ctc');
  const regimeSelect = document.getElementById('quick-regime');
  const ptInput = document.getElementById('quick-pt');
  const chipButtons = document.querySelectorAll('.ctc-chip');

  if (!ctcInput) return;

  ctcInput.addEventListener('input', updateQuickEstimate);
  if (regimeSelect) regimeSelect.addEventListener('change', updateQuickEstimate);
  if (ptInput) ptInput.addEventListener('input', updateQuickEstimate);

  chipButtons.forEach(chip => {
    chip.addEventListener('click', () => {
      const amount = chip.getAttribute('data-amount');
      ctcInput.value = amount;
      updateQuickEstimate();
    });
  });
}

function updateQuickEstimate() {
  const ctcInput = document.getElementById('quick-ctc');
  const regimeSelect = document.getElementById('quick-regime');
  const ptInput = document.getElementById('quick-pt');

  const ctc = parseFloat(ctcInput?.value) || 0;
  const regime = regimeSelect?.value || TAX_REGIMES.NEW_2024;
  const pt = ptInput && ptInput.value !== '' ? parseFloat(ptInput.value) : 2400;

  const result = calculateQuickEstimate(ctc, { regime, professionalTax: pt });
  renderResults(result);
}

function initDetailedMode() {
  const inputs = document.querySelectorAll('#form-detailed input, #form-detailed select');
  inputs.forEach(input => {
    input.addEventListener('input', updateDetailedBreakdown);
    input.addEventListener('change', updateDetailedBreakdown);
  });
}

function updateDetailedBreakdown() {
  const basic = parseFloat(document.getElementById('det-basic')?.value) || 0;
  const hra = parseFloat(document.getElementById('det-hra')?.value) || 0;
  const special = parseFloat(document.getElementById('det-special')?.value) || 0;
  const otherAllow = parseFloat(document.getElementById('det-other-allow')?.value) || 0;
  const bonus = parseFloat(document.getElementById('det-bonus')?.value) || 0;
  const regime = document.getElementById('det-regime')?.value || TAX_REGIMES.NEW_2024;
  const pt = parseFloat(document.getElementById('det-pt')?.value) || 2400;
  const otherDed = parseFloat(document.getElementById('det-other-ded')?.value) || 0;

  // Old Regime deductions
  const sec80C = parseFloat(document.getElementById('det-80c')?.value) || 0;
  const sec80D = parseFloat(document.getElementById('det-80d')?.value) || 0;
  const hraExemption = parseFloat(document.getElementById('det-hra-exempt')?.value) || 0;

  const result = calculateDetailedBreakdown({
    basicSalary: basic,
    hra,
    specialAllowance: special,
    otherAllowances: otherAllow,
    annualBonus: bonus,
    regime,
    professionalTax: pt,
    otherDeductions: otherDed,
    sec80C,
    sec80D,
    hraExemption
  });

  renderResults(result);
}

function renderResults(res) {
  // Highlights
  const monthlyInHandEl = document.getElementById('res-monthly-inhand');
  const annualInHandEl = document.getElementById('res-annual-inhand');
  const annualCtcEl = document.getElementById('res-annual-ctc');
  const grossSalaryEl = document.getElementById('res-gross-salary');
  const totalDeductionsEl = document.getElementById('res-total-deductions');
  const employerRetentionsEl = document.getElementById('res-employer-retentions');

  if (monthlyInHandEl) monthlyInHandEl.textContent = formatINR(res.monthly.inHand);
  if (annualInHandEl) annualInHandEl.textContent = `${formatINR(res.annual.inHand)} / year`;
  if (annualCtcEl) annualCtcEl.textContent = formatINR(res.annual.ctc);
  if (grossSalaryEl) grossSalaryEl.textContent = formatINR(res.annual.grossSalary);
  if (totalDeductionsEl) totalDeductionsEl.textContent = formatINR(res.annual.totalEmployeeDeductions);
  if (employerRetentionsEl) employerRetentionsEl.textContent = formatINR(res.annual.totalEmployerRetentions);

  // Table Body
  const tableBody = document.getElementById('breakdown-table-body');
  if (tableBody) {
    tableBody.innerHTML = `
      <tr>
        <td><strong>Basic Salary</strong></td>
        <td class="text-right">${formatINR(res.monthly.basicSalary)}</td>
        <td class="text-right">${formatINR(res.annual.basicSalary)}</td>
        <td>Cash Earning</td>
      </tr>
      <tr>
        <td><strong>House Rent Allowance (HRA)</strong></td>
        <td class="text-right">${formatINR(res.monthly.hra)}</td>
        <td class="text-right">${formatINR(res.annual.hra)}</td>
        <td>Cash Earning</td>
      </tr>
      <tr>
        <td><strong>Special & Other Allowances</strong></td>
        <td class="text-right">${formatINR(res.monthly.specialAllowance + (res.monthly.otherAllowances || 0))}</td>
        <td class="text-right">${formatINR(res.annual.specialAllowance + (res.annual.otherAllowances || 0))}</td>
        <td>Cash Earning</td>
      </tr>
      ${res.annual.annualBonus ? `
      <tr>
        <td><strong>Annual Bonus / Variable Pay</strong></td>
        <td class="text-right">${formatINR(res.monthly.annualBonus)}</td>
        <td class="text-right">${formatINR(res.annual.annualBonus)}</td>
        <td>Cash Earning</td>
      </tr>` : ''}
      <tr style="background-color: #f8fafc; font-weight: 700;">
        <td>Gross Salary (Total Cash Earnings)</td>
        <td class="text-right">${formatINR(res.monthly.grossSalary)}</td>
        <td class="text-right">${formatINR(res.annual.grossSalary)}</td>
        <td>Subtotal</td>
      </tr>
      <tr>
        <td class="text-danger">Employee PF (12%)</td>
        <td class="text-right text-danger">-${formatINR(res.monthly.employeePf)}</td>
        <td class="text-right text-danger">-${formatINR(res.annual.employeePf)}</td>
        <td>Statutory Deduction</td>
      </tr>
      <tr>
        <td class="text-danger">Professional Tax (PT)</td>
        <td class="text-right text-danger">-${formatINR(res.monthly.professionalTax)}</td>
        <td class="text-right text-danger">-${formatINR(res.annual.professionalTax)}</td>
        <td>State Tax</td>
      </tr>
      <tr>
        <td class="text-danger">Estimated Income Tax (TDS)</td>
        <td class="text-right text-danger">-${formatINR(res.monthly.incomeTax)}</td>
        <td class="text-right text-danger">-${formatINR(res.annual.incomeTax)}</td>
        <td>Income Tax</td>
      </tr>
      <tr style="background-color: #ecfdf5; font-weight: 800; font-size: 1.05rem;">
        <td class="text-emerald">Net In-Hand (Take-Home Pay)</td>
        <td class="text-right text-emerald">${formatINR(res.monthly.inHand)}</td>
        <td class="text-right text-emerald">${formatINR(res.annual.inHand)}</td>
        <td>Cash Received</td>
      </tr>
      <tr>
        <td>Employer PF Contribution (in CTC)</td>
        <td class="text-right">${formatINR(res.monthly.employerPf)}</td>
        <td class="text-right">${formatINR(res.annual.employerPf)}</td>
        <td>Employer Benefit</td>
      </tr>
      <tr>
        <td>Gratuity Provision (in CTC)</td>
        <td class="text-right">${formatINR(res.monthly.gratuity)}</td>
        <td class="text-right">${formatINR(res.annual.gratuity)}</td>
        <td>Retirement Benefit</td>
      </tr>
      <tr style="background-color: #f1f5f9; font-weight: 700;">
        <td>Total Cost to Company (CTC)</td>
        <td class="text-right">${formatINR(res.monthly.ctc)}</td>
        <td class="text-right">${formatINR(res.annual.ctc)}</td>
        <td>Annual Package</td>
      </tr>
    `;
  }

  // Tax Details
  const taxSummaryEl = document.getElementById('tax-summary-details');
  if (taxSummaryEl) {
    const td = res.taxDetails;
    taxSummaryEl.innerHTML = `
      <div style="background: var(--color-surface-subtle); padding: 1rem; border-radius: var(--radius-md); font-size: 0.9rem;">
        <p><strong>Gross Taxable Income:</strong> ${formatINR(res.annual.taxableIncome)} (after Standard Deduction of ${formatINR(res.annual.standardDeduction)})</p>
        <p><strong>Base Slab Tax:</strong> ${formatINR(td.grossTax)}</p>
        ${td.rebate87A > 0 ? `<p class="text-emerald"><strong>Section 87A Rebate Applied:</strong> -${formatINR(td.rebate87A)} (Zero tax for taxable income up to ₹7,00,000)</p>` : ''}
        <p><strong>Health & Education Cess (4%):</strong> ${formatINR(td.cess)}</p>
        <p><strong>Final Income Tax:</strong> <strong>${formatINR(td.totalTax)}</strong></p>
      </div>
    `;
  }
}

function initActions() {
  const copyBtn = document.getElementById('btn-copy-summary');
  const printBtn = document.getElementById('btn-print-summary');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const monthly = document.getElementById('res-monthly-inhand')?.textContent || '';
      const annual = document.getElementById('res-annual-inhand')?.textContent || '';
      const ctc = document.getElementById('res-annual-ctc')?.textContent || '';

      const summaryText = `SalarySeed Salary Estimate:\nAnnual CTC: ${ctc}\nEstimated Monthly In-Hand: ${monthly}\nEstimated Annual In-Hand: ${annual}\nCalculated via SalarySeed (https://salaryseed.in)`;

      navigator.clipboard.writeText(summaryText).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied to Clipboard!';
        setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}
