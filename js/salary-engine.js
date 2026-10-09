/**
 * SalarySeed - Core Indian Salary Calculation Engine
 * 
 * Compliant with:
 * - Income-tax Act, 1961 (Section 115BAC New Regime as amended by Finance Act 2024)
 * - Employees' Provident Funds and Miscellaneous Provisions Act, 1952
 * - Payment of Gratuity Act, 1972
 * - State Professional Tax Enactments (Max ₹2,500/yr under Article 276)
 * 
 * Author: Dasari Veera Raghavulu (Team Trinetra)
 * Course: CSET489 - Bennett University
 */

export const TAX_REGIMES = {
  NEW_2024: 'new_2024', // FY 2024-25 / FY 2025-26 New Regime
  OLD: 'old'            // Old Tax Regime with standard 80C/80D
};

export const DEFAULT_CONFIG = {
  fy: '2024-25',
  regime: TAX_REGIMES.NEW_2024,
  standardDeductionNew: 75000, // Budget 2024 increased to ₹75,000 for salaried
  standardDeductionOld: 50000,
  epfRate: 0.12,               // 12% of basic
  gratuityRate: 0.0481,        // ~4.81% of basic ((15/26)/12 * basic)
  defaultProfessionalTax: 2400, // ₹200/month typical Indian average
  cessRate: 0.04               // 4% Health & Education Cess
};

/**
 * Format number to Indian Currency string (e.g. ₹ 10,50,000)
 */
export function formatINR(val, includeSymbol = true) {
  if (val === null || val === undefined || isNaN(val)) return includeSymbol ? '₹ 0' : '0';
  const num = Math.round(Number(val));
  const isNegative = num < 0;
  const absNum = Math.abs(num);
  
  // Format using Indian locale
  const formatted = absNum.toLocaleString('en-IN');
  const sign = isNegative ? '-' : '';
  return includeSymbol ? `${sign}₹ ${formatted}` : `${sign}${formatted}`;
}

/**
 * Calculate Income Tax under New Tax Regime (Section 115BAC, FY 2024-25 / 2025-26)
 * Slabs (Budget 2024):
 * 0 - 3 Lakh: 0%
 * 3 - 7 Lakh: 5%
 * 7 - 10 Lakh: 10%
 * 10 - 12 Lakh: 15%
 * 12 - 15 Lakh: 20%
 * Above 15 Lakh: 30%
 * 
 * Rebate under Section 87A:
 * Taxable income <= ₹7,00,000 => 100% Tax Rebate (up to ₹25,000) -> Tax = 0.
 * Marginal Relief: If taxable income marginally exceeds ₹7,00,000, tax cannot exceed income in excess of ₹7 Lakh.
 */
export function calculateTaxNewRegime(taxableIncome) {
  if (taxableIncome <= 0) {
    return { grossTax: 0, rebate87A: 0, netTaxBeforeCess: 0, cess: 0, totalTax: 0, slabs: [] };
  }

  let remaining = taxableIncome;
  let grossTax = 0;
  const slabs = [];

  // Slab 1: 0 - 3,00,000 (0%)
  const s1 = Math.min(remaining, 300000);
  slabs.push({ slab: 'Up to ₹3,00,000', rate: '0%', taxable: s1, tax: 0 });
  remaining -= s1;

  // Slab 2: 3,00,001 - 7,00,000 (5%)
  if (remaining > 0) {
    const s2 = Math.min(remaining, 400000);
    const tax2 = s2 * 0.05;
    grossTax += tax2;
    slabs.push({ slab: '₹3,00,001 - ₹7,00,000', rate: '5%', taxable: s2, tax: tax2 });
    remaining -= s2;
  }

  // Slab 3: 7,00,001 - 10,00,000 (10%)
  if (remaining > 0) {
    const s3 = Math.min(remaining, 300000);
    const tax3 = s3 * 0.10;
    grossTax += tax3;
    slabs.push({ slab: '₹7,00,001 - ₹10,00,000', rate: '10%', taxable: s3, tax: tax3 });
    remaining -= s3;
  }

  // Slab 4: 10,00,001 - 12,00,000 (15%)
  if (remaining > 0) {
    const s4 = Math.min(remaining, 200000);
    const tax4 = s4 * 0.15;
    grossTax += tax4;
    slabs.push({ slab: '₹10,00,001 - ₹12,00,000', rate: '15%', taxable: s4, tax: tax4 });
    remaining -= s4;
  }

  // Slab 5: 12,00,001 - 15,00,000 (20%)
  if (remaining > 0) {
    const s5 = Math.min(remaining, 300000);
    const tax5 = s5 * 0.20;
    grossTax += tax5;
    slabs.push({ slab: '₹12,00,001 - ₹15,00,000', rate: '20%', taxable: s5, tax: tax5 });
    remaining -= s5;
  }

  // Slab 6: Above 15,00,000 (30%)
  if (remaining > 0) {
    const tax6 = remaining * 0.30;
    grossTax += tax6;
    slabs.push({ slab: 'Above ₹15,00,000', rate: '30%', taxable: remaining, tax: tax6 });
  }

  // Section 87A Rebate
  let rebate87A = 0;
  if (taxableIncome <= 700000) {
    rebate87A = grossTax; // Full rebate
  } else {
    // Marginal relief under Section 87A
    const excessIncome = taxableIncome - 700000;
    if (grossTax > excessIncome) {
      const marginalRelief = grossTax - excessIncome;
      rebate87A = marginalRelief;
    }
  }

  let netTaxBeforeCess = Math.max(0, grossTax - rebate87A);
  const cess = Math.round(netTaxBeforeCess * DEFAULT_CONFIG.cessRate);
  const totalTax = Math.round(netTaxBeforeCess + cess);

  return {
    grossTax: Math.round(grossTax),
    rebate87A: Math.round(rebate87A),
    netTaxBeforeCess: Math.round(netTaxBeforeCess),
    cess,
    totalTax,
    slabs
  };
}

/**
 * Calculate Income Tax under Old Tax Regime
 * Slabs:
 * 0 - 2.5 Lakh: 0%
 * 2.5 - 5 Lakh: 5%
 * 5 - 10 Lakh: 20%
 * Above 10 Lakh: 30%
 * Rebate 87A: If taxable income <= 5,00,000 => Rebate up to ₹12,500 (0 tax).
 */
export function calculateTaxOldRegime(taxableIncome) {
  if (taxableIncome <= 0) {
    return { grossTax: 0, rebate87A: 0, netTaxBeforeCess: 0, cess: 0, totalTax: 0, slabs: [] };
  }

  let remaining = taxableIncome;
  let grossTax = 0;
  const slabs = [];

  // Slab 1: Up to 2,50,000 (0%)
  const s1 = Math.min(remaining, 250000);
  slabs.push({ slab: 'Up to ₹2,50,000', rate: '0%', taxable: s1, tax: 0 });
  remaining -= s1;

  // Slab 2: 2,50,001 - 5,00,000 (5%)
  if (remaining > 0) {
    const s2 = Math.min(remaining, 250000);
    const tax2 = s2 * 0.05;
    grossTax += tax2;
    slabs.push({ slab: '₹2,50,001 - ₹5,00,000', rate: '5%', taxable: s2, tax: tax2 });
    remaining -= s2;
  }

  // Slab 3: 5,00,001 - 10,00,000 (20%)
  if (remaining > 0) {
    const s3 = Math.min(remaining, 500000);
    const tax3 = s3 * 0.20;
    grossTax += tax3;
    slabs.push({ slab: '₹5,00,001 - ₹10,00,000', rate: '20%', taxable: s3, tax: tax3 });
    remaining -= s3;
  }

  // Slab 4: Above 10,00,000 (30%)
  if (remaining > 0) {
    const tax4 = remaining * 0.30;
    grossTax += tax4;
    slabs.push({ slab: 'Above ₹10,00,000', rate: '30%', taxable: remaining, tax: tax4 });
  }

  let rebate87A = 0;
  if (taxableIncome <= 500000) {
    rebate87A = grossTax;
  }

  let netTaxBeforeCess = Math.max(0, grossTax - rebate87A);
  const cess = Math.round(netTaxBeforeCess * DEFAULT_CONFIG.cessRate);
  const totalTax = Math.round(netTaxBeforeCess + cess);

  return {
    grossTax: Math.round(grossTax),
    rebate87A: Math.round(rebate87A),
    netTaxBeforeCess: Math.round(netTaxBeforeCess),
    cess,
    totalTax,
    slabs
  };
}

/**
 * Quick Estimate Mode
 * Estimates realistic Indian CTC breakdown:
 * - Basic Salary: 40% of CTC
 * - HRA: 50% of Basic (20% of CTC)
 * - Employer PF: 12% of Basic (included in CTC)
 * - Gratuity: 4.81% of Basic (included in CTC)
 * - Professional Tax: ₹2,400/yr (₹200/mo)
 * - Special Allowance: Balance of CTC after Basic, HRA, Employer PF, and Gratuity
 * - Gross Salary = Basic + HRA + Special Allowance
 * - Employee Deductions: Employee PF (12% of Basic) + PT + Income Tax
 * - In-Hand = Gross Salary - Employee Deductions
 */
export function calculateQuickEstimate(annualCtc, options = {}) {
  const ctc = Math.max(0, Number(annualCtc) || 0);
  const regime = options.regime || TAX_REGIMES.NEW_2024;
  const ptAnnual = options.professionalTax !== undefined ? Number(options.professionalTax) : DEFAULT_CONFIG.defaultProfessionalTax;

  if (ctc <= 0) {
    return getEmptyResult();
  }

  // Standard corporate salary structure decomposition
  const basicSalary = Math.round(ctc * 0.40);
  const hra = Math.round(basicSalary * 0.50); // 20% of CTC
  const employerPf = Math.round(basicSalary * DEFAULT_CONFIG.epfRate);
  const gratuity = Math.round(basicSalary * DEFAULT_CONFIG.gratuityRate);

  // Special allowance absorbs the remaining CTC
  const specialAllowance = Math.max(0, Math.round(ctc - basicSalary - hra - employerPf - gratuity));

  // Gross Salary received by employee before employee deductions
  const grossSalary = basicSalary + hra + specialAllowance;

  // Employee statutory deductions
  const employeePf = Math.round(basicSalary * DEFAULT_CONFIG.epfRate);
  const professionalTax = ptAnnual;

  // Tax calculation
  const stdDeduction = regime === TAX_REGIMES.NEW_2024 ? DEFAULT_CONFIG.standardDeductionNew : DEFAULT_CONFIG.standardDeductionOld;
  const taxableIncome = Math.max(0, grossSalary - stdDeduction);

  const taxDetails = regime === TAX_REGIMES.NEW_2024 ? calculateTaxNewRegime(taxableIncome) : calculateTaxOldRegime(taxableIncome);
  const annualIncomeTax = taxDetails.totalTax;

  // Total Employee Deductions
  const totalEmployeeDeductions = employeePf + professionalTax + annualIncomeTax;

  // Total Employer Retentions / Non-cash components in CTC
  const totalEmployerRetentions = employerPf + gratuity;

  // Net Take-Home (In-Hand) Pay
  const annualInHand = Math.max(0, grossSalary - totalEmployeeDeductions);
  const monthlyInHand = Math.round(annualInHand / 12);
  const monthlyGross = Math.round(grossSalary / 12);
  const monthlyCtc = Math.round(ctc / 12);

  return {
    mode: 'quick',
    regime,
    inputs: { annualCtc: ctc, professionalTax: ptAnnual },
    annual: {
      ctc,
      grossSalary,
      basicSalary,
      hra,
      specialAllowance,
      employerPf,
      gratuity,
      employeePf,
      professionalTax,
      standardDeduction: stdDeduction,
      taxableIncome,
      incomeTax: annualIncomeTax,
      totalEmployeeDeductions,
      totalEmployerRetentions,
      inHand: annualInHand
    },
    monthly: {
      ctc: monthlyCtc,
      grossSalary: monthlyGross,
      basicSalary: Math.round(basicSalary / 12),
      hra: Math.round(hra / 12),
      specialAllowance: Math.round(specialAllowance / 12),
      employerPf: Math.round(employerPf / 12),
      gratuity: Math.round(gratuity / 12),
      employeePf: Math.round(employeePf / 12),
      professionalTax: Math.round(professionalTax / 12),
      incomeTax: Math.round(annualIncomeTax / 12),
      inHand: monthlyInHand
    },
    taxDetails,
    assumptions: [
      'Basic salary estimated at 40% of CTC',
      'HRA estimated at 50% of Basic Salary (20% of CTC)',
      'EPF estimated at 12% of Basic Salary for both employee & employer',
      'Gratuity estimated at 4.81% of Basic Salary included in CTC',
      'Professional Tax estimated at ₹2,400 per year (₹200/month)',
      `Standard Deduction applied: ₹${stdDeduction.toLocaleString('en-IN')}`,
      'Full Section 87A rebate applied if Taxable Income is up to ₹7,00,000 (New Regime)'
    ]
  };
}

/**
 * Detailed Salary Breakdown Mode
 * Allows custom itemized inputs.
 */
export function calculateDetailedBreakdown(inputs = {}) {
  const basic = Math.max(0, Number(inputs.basicSalary) || 0);
  const hra = Math.max(0, Number(inputs.hra) || 0);
  const specialAllowance = Math.max(0, Number(inputs.specialAllowance) || 0);
  const otherAllowances = Math.max(0, Number(inputs.otherAllowances) || 0);
  const annualBonus = Math.max(0, Number(inputs.annualBonus) || 0);

  // Employer parts included in CTC
  const employerPf = inputs.employerPf !== undefined ? Number(inputs.employerPf) : Math.round(basic * DEFAULT_CONFIG.epfRate);
  const gratuity = inputs.gratuity !== undefined ? Number(inputs.gratuity) : Math.round(basic * DEFAULT_CONFIG.gratuityRate);
  const otherEmployerCost = Math.max(0, Number(inputs.otherEmployerCost) || 0);

  // Gross Cash Salary
  const grossSalary = basic + hra + specialAllowance + otherAllowances + annualBonus;

  // CTC = Gross + Employer Contributions
  const ctc = grossSalary + employerPf + gratuity + otherEmployerCost;

  // Employee Deductions
  const employeePf = inputs.employeePf !== undefined ? Number(inputs.employeePf) : Math.round(basic * DEFAULT_CONFIG.epfRate);
  const professionalTax = inputs.professionalTax !== undefined ? Number(inputs.professionalTax) : DEFAULT_CONFIG.defaultProfessionalTax;
  const otherDeductions = Math.max(0, Number(inputs.otherDeductions) || 0);

  // Tax deductions (for Old Regime: 80C, 80D, HRA exemption)
  const regime = inputs.regime || TAX_REGIMES.NEW_2024;
  const stdDeduction = regime === TAX_REGIMES.NEW_2024 ? DEFAULT_CONFIG.standardDeductionNew : DEFAULT_CONFIG.standardDeductionOld;
  
  let additionalDeductions = 0;
  if (regime === TAX_REGIMES.OLD) {
    const sec80C = Math.min(150000, Math.max(0, Number(inputs.sec80C) || employeePf));
    const sec80D = Math.min(50000, Math.max(0, Number(inputs.sec80D) || 0));
    const hraExemption = Math.max(0, Number(inputs.hraExemption) || 0);
    additionalDeductions = sec80C + sec80D + hraExemption;
  }

  const taxableIncome = Math.max(0, grossSalary - stdDeduction - additionalDeductions);
  const taxDetails = regime === TAX_REGIMES.NEW_2024 ? calculateTaxNewRegime(taxableIncome) : calculateTaxOldRegime(taxableIncome);
  const annualIncomeTax = taxDetails.totalTax;

  const totalEmployeeDeductions = employeePf + professionalTax + otherDeductions + annualIncomeTax;
  const totalEmployerRetentions = employerPf + gratuity + otherEmployerCost;

  const annualInHand = Math.max(0, grossSalary - totalEmployeeDeductions);
  const monthlyInHand = Math.round(annualInHand / 12);
  const monthlyGross = Math.round(grossSalary / 12);
  const monthlyCtc = Math.round(ctc / 12);

  return {
    mode: 'detailed',
    regime,
    inputs,
    annual: {
      ctc,
      grossSalary,
      basicSalary: basic,
      hra,
      specialAllowance,
      otherAllowances,
      annualBonus,
      employerPf,
      gratuity,
      otherEmployerCost,
      employeePf,
      professionalTax,
      otherDeductions,
      standardDeduction: stdDeduction,
      additionalDeductions,
      taxableIncome,
      incomeTax: annualIncomeTax,
      totalEmployeeDeductions,
      totalEmployerRetentions,
      inHand: annualInHand
    },
    monthly: {
      ctc: monthlyCtc,
      grossSalary: monthlyGross,
      basicSalary: Math.round(basic / 12),
      hra: Math.round(hra / 12),
      specialAllowance: Math.round(specialAllowance / 12),
      otherAllowances: Math.round(otherAllowances / 12),
      annualBonus: Math.round(annualBonus / 12),
      employerPf: Math.round(employerPf / 12),
      gratuity: Math.round(gratuity / 12),
      employeePf: Math.round(employeePf / 12),
      professionalTax: Math.round(professionalTax / 12),
      otherDeductions: Math.round(otherDeductions / 12),
      incomeTax: Math.round(annualIncomeTax / 12),
      inHand: monthlyInHand
    },
    taxDetails,
    assumptions: [
      'Custom user components verified',
      `Standard Deduction applied: ₹${stdDeduction.toLocaleString('en-IN')}`,
      `Tax Regime: ${regime === TAX_REGIMES.NEW_2024 ? 'New Regime (Section 115BAC - Budget 2024)' : 'Old Regime'}`,
      'Income Tax calculated with 4% Health & Education Cess'
    ]
  };
}

function getEmptyResult() {
  return {
    mode: 'none',
    regime: TAX_REGIMES.NEW_2024,
    inputs: {},
    annual: {
      ctc: 0, grossSalary: 0, basicSalary: 0, hra: 0, specialAllowance: 0,
      employerPf: 0, gratuity: 0, employeePf: 0, professionalTax: 0,
      standardDeduction: 0, taxableIncome: 0, incomeTax: 0,
      totalEmployeeDeductions: 0, totalEmployerRetentions: 0, inHand: 0
    },
    monthly: {
      ctc: 0, grossSalary: 0, basicSalary: 0, hra: 0, specialAllowance: 0,
      employerPf: 0, gratuity: 0, employeePf: 0, professionalTax: 0,
      incomeTax: 0, inHand: 0
    },
    taxDetails: { grossTax: 0, rebate87A: 0, netTaxBeforeCess: 0, cess: 0, totalTax: 0, slabs: [] },
    assumptions: []
  };
}
