import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatINR,
  calculateTaxNewRegime,
  calculateTaxOldRegime,
  calculateQuickEstimate,
  calculateDetailedBreakdown,
  TAX_REGIMES
} from '../js/salary-engine.js';

test('formatINR correctly formats numbers with Indian commas and Rupee symbol', () => {
  assert.equal(formatINR(0), '₹ 0');
  assert.equal(formatINR(500000), '₹ 5,00,000');
  assert.equal(formatINR(1234567), '₹ 12,34,567');
  assert.equal(formatINR(10000000), '₹ 1,00,00,000');
  assert.equal(formatINR(500000, false), '5,00,000');
  assert.equal(formatINR(-5000), '-₹ 5,000');
});

test('calculateTaxNewRegime: Income up to ₹3 Lakh has 0 tax', () => {
  const result = calculateTaxNewRegime(300000);
  assert.equal(result.grossTax, 0);
  assert.equal(result.totalTax, 0);
});

test('calculateTaxNewRegime: Section 87A Rebate yields 0 tax for taxable income <= ₹7,00,000', () => {
  const result = calculateTaxNewRegime(700000);
  assert.equal(result.grossTax, 20000);
  assert.equal(result.rebate87A, 20000);
  assert.equal(result.totalTax, 0);
});

test('calculateTaxNewRegime: Taxable income ₹10 Lakh calculates correct slab tax + cess', () => {
  const result = calculateTaxNewRegime(1000000);
  assert.equal(result.grossTax, 50000);
  assert.equal(result.rebate87A, 0);
  assert.equal(result.cess, 2000);
  assert.equal(result.totalTax, 52000);
});

test('calculateTaxOldRegime: Basic exemption and 87A rebate up to ₹5,00,000', () => {
  const res25 = calculateTaxOldRegime(250000);
  assert.equal(res25.totalTax, 0);

  const res50 = calculateTaxOldRegime(500000);
  assert.equal(res50.grossTax, 12500);
  assert.equal(res50.rebate87A, 12500);
  assert.equal(res50.totalTax, 0); // 100% rebate under 87A Old Regime

  const res10L = calculateTaxOldRegime(1000000);
  assert.equal(res10L.grossTax, 112500); // 12,500 + 1,00,000
  assert.equal(res10L.cess, 4500);
  assert.equal(res10L.totalTax, 117000);
});

test('calculateQuickEstimate: 5 LPA Package breakdown and zero tax under Section 87A', () => {
  const res = calculateQuickEstimate(500000);
  assert.equal(res.annual.ctc, 500000);
  assert.equal(res.annual.basicSalary, 200000);
  assert.equal(res.annual.hra, 100000);
  assert.equal(res.annual.employeePf, 24000);
  assert.equal(res.annual.employerPf, 24000);
  assert.equal(res.annual.gratuity, 9620);
  assert.equal(res.annual.professionalTax, 2400);
  assert.equal(res.annual.incomeTax, 0);
  assert.equal(res.annual.inHand, 439980);
  assert.equal(res.monthly.inHand, 36665);
});

test('calculateQuickEstimate: 10 LPA Package breakdown', () => {
  const res = calculateQuickEstimate(1000000);
  assert.equal(res.annual.ctc, 1000000);
  assert.equal(res.annual.basicSalary, 400000);
  assert.equal(res.annual.hra, 200000);
  assert.equal(res.annual.employeePf, 48000);
  assert.equal(res.annual.professionalTax, 2400);
  assert.ok(res.annual.incomeTax > 0);
  assert.ok(res.annual.inHand > 800000);
  assert.equal(res.annual.ctc, res.annual.grossSalary + res.annual.totalEmployerRetentions);
  assert.equal(res.annual.inHand, res.annual.grossSalary - res.annual.totalEmployeeDeductions);
});

test('calculateQuickEstimate: 25 LPA High Income CTC consistency', () => {
  const res = calculateQuickEstimate(2500000);
  assert.equal(res.annual.ctc, 2500000);
  assert.equal(res.annual.basicSalary, 1000000);
  assert.equal(res.annual.employeePf, 120000);
  assert.ok(res.annual.incomeTax > 300000);
  assert.ok(res.monthly.inHand > 140000);
  assert.equal(res.annual.ctc, res.annual.grossSalary + res.annual.totalEmployerRetentions);
});

test('calculateDetailedBreakdown: Custom inputs calculate correctly', () => {
  const inputs = {
    basicSalary: 600000,
    hra: 300000,
    specialAllowance: 200000,
    otherAllowances: 50000,
    annualBonus: 100000,
    professionalTax: 2400,
    regime: TAX_REGIMES.NEW_2024
  };

  const res = calculateDetailedBreakdown(inputs);
  assert.equal(res.annual.grossSalary, 1250000);
  assert.equal(res.annual.basicSalary, 600000);
  assert.equal(res.annual.employeePf, 72000);
  assert.equal(res.annual.employerPf, 72000);
  assert.equal(res.annual.gratuity, 28860);
  assert.equal(res.annual.ctc, 1250000 + 72000 + 28860);
  assert.ok(res.annual.inHand > 950000);
});

test('Boundary values: Zero CTC, negative values and empty inputs handled gracefully', () => {
  const zeroRes = calculateQuickEstimate(0);
  assert.equal(zeroRes.annual.ctc, 0);
  assert.equal(zeroRes.annual.inHand, 0);

  const negRes = calculateQuickEstimate(-50000);
  assert.equal(negRes.annual.ctc, 0);
  assert.equal(negRes.annual.inHand, 0);

  const emptyDetailed = calculateDetailedBreakdown({});
  assert.equal(emptyDetailed.annual.ctc, 0);
  assert.equal(emptyDetailed.annual.inHand, 0);
});
