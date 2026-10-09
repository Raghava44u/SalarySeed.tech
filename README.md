# SalarySeed — India In-Hand Salary Calculator
> **Know Your Salary. Plan Your Future.**  
> Academic Capstone Mini-Project | CSET489: Search Engine Optimization | Milestone I  
> **Bennett University — School of Computer Science Engineering and Technology**  
> **Team:** Trinetra | **Lead & Sole Contributor:** Dasari Veera Raghavulu (100% Contribution)  
> **Course Facilitator:** Dr. Saumitra Gangwar | **Semester:** VII, 2026–27  

---

## 1. Project Overview

**SalarySeed** is a high-speed, privacy-first financial utility web application and WordPress plugin designed to eliminate confusion surrounding Indian employment compensation. 

In India, job offers are predominantly quoted in **Cost to Company (CTC)**, which aggregates non-cash employer benefits (Employer EPF 12%, Gratuity ~4.81%) and statutory withholdings. SalarySeed allows students, freshers, and professionals to calculate their exact **monthly in-hand take-home salary** based on verified **Finance Act 2024 New Tax Regime (Section 115BAC)** rules, the Employees' Provident Funds Act 1952, the Payment of Gratuity Act 1972, and state Professional Tax enactments.

---

## 2. Key Architecture & Features

### 🌟 Core Web Application (HTML5, Modern CSS3 & JavaScript)
- **Zero-Dependency Native Execution:** Pure semantic HTML5, modern CSS3 with responsive design tokens, and modular ES JavaScript.
- **100% Client-Side Privacy:** Salary calculations execute strictly inside the user's web browser. Financial figures are never transmitted to external APIs or stored on servers.
- **Indian CTC-to-In-Hand Engine (`js/salary-engine.js`):**
  - **Quick Estimate Mode:** Derives standard corporate salary components (Basic 40%, HRA 20%, EPF 12%, Gratuity 4.81%, Special Allowance) directly from CTC.
  - **Detailed Breakdown Mode:** Allows fine-grained customization of Basic Pay, HRA, Special Allowance, Bonuses, and statutory deductions.
  - **Budget 2024 Slabs:** Incorporates the revised **₹75,000 standard deduction** and **Section 87A rebate** (zero tax for taxable income up to ₹7,00,000 / ₹7.75 Lakh gross).
  - **Old vs. New Tax Regime Comparison:** Allows direct tax liability comparisons.
  - **Indian Rupee Formatting:** Formats numbers with Indian currency standards (`₹ 10,00,000`).
  - **Utilities:** One-click copy summary to clipboard and clean print stylesheet.

### 🔒 Supabase Authentication & Route Guards
- **Secure Access Control:** The interactive salary calculator (`/salary-calculator.html`) and user dashboard (`/dashboard.html`) are protected by Supabase Auth.
- **Route Guard Module (`js/auth-guard.js`):**
  - Verifies active sessions before rendering protected content.
  - Displays a clean loading skeleton to prevent unauthorized screen flash.
  - Safely redirects unauthenticated visitors to `/auth/login.html?redirect=...`.
  - Implements open-redirect security validation (strictly rejecting protocol-relative URLs).
- **Public Informational Pages:** Homepage, About Us, Methodology, Privacy Policy, and all Salary Guides remain completely public and crawlable by search engines without login.

### 🌐 WordPress Shortcode Plugin Integration
- Located in `wordpress/salaryseed-calculator/`:
  - Standalone WordPress plugin (`salaryseed-calculator.php`) registering shortcode `[salaryseed_calculator]`.
  - Enables instant deployment into any standard WordPress installation running on a VPS (Apache/Nginx + PHP + MySQL) in compliance with CSET489 Milestone I requirements.

### 📈 Technical SEO & On-Page Architecture
- **Canonical URLs:** Configured across all pages.
- **Meta Hierarchy:** Unique, optimized `<title>` and `<meta name="description">` per page.
- **Structured Data:** JSON-LD schema markup for `WebSite`, `Organization`, `FAQPage`, and `Article`.
- **Crawl Control:** Fully configured `robots.txt` and `sitemap.xml`.
- **Dedicated Public Guides:**
  - `/guides/5-lpa-in-hand-salary.html`
  - `/guides/10-lpa-in-hand-salary.html`
  - `/guides/ctc-vs-in-hand-salary.html`
  - `/guides/salary-breakup-guide.html`
  - `/guides/old-vs-new-tax-regime.html`

---

## 3. Directory Structure

```
d:\SEO\
├── index.html                           # Public SEO Homepage
├── about.html                           # About Us & Academic Background
├── methodology.html                     # Official Statutory Formulas & Citations
├── privacy.html                         # Client-Side Data Privacy Policy
├── dashboard.html                       # Protected User Dashboard (Supabase Auth)
├── salary-calculator.html               # Protected Interactive Calculator Application
├── robots.txt                           # Search engine crawling rules
├── sitemap.xml                          # Production XML Sitemap
├── package.json                         # Scripts & test commands
├── server.js                            # Zero-dependency local development server
├── .gitignore                           # Git ignore rules (excludes .env & secrets)
├── .env.example                         # Environment variable placeholders
├── SUPABASE_SETUP.md                    # Step-by-step Supabase configuration guide
├── README.md                            # Main project documentation
├── CSET489_M1_Trinetra_Report.md        # Academic Milestone I Report (Markdown)
├── CSET489_M1_Trinetra_Report.pdf       # Academic Milestone I Report (ReportLab PDF)
├── css/
│   └── style.css                        # Design system & responsive CSS tokens
├── js/
│   ├── config.js                        # Client configuration for Supabase
│   ├── supabase-client.js               # Supabase JS SDK client singleton
│   ├── auth-guard.js                    # Protected route guards & security
│   ├── salary-engine.js                 # Tested Indian Salary Calculation Engine
│   └── calculator-app.js                # Interactive UI controller & event listeners
├── guides/                              # Public crawlable long-tail SEO guides
│   ├── 5-lpa-in-hand-salary.html
│   ├── 10-lpa-in-hand-salary.html
│   ├── ctc-vs-in-hand-salary.html
│   ├── salary-breakup-guide.html
│   └── old-vs-new-tax-regime.html
├── test/
│   └── salary-engine.test.js            # Automated Node.js unit test suite (10 tests)
├── scripts/
│   └── generate_report_pdf.py           # Python script generating the academic PDF
└── wordpress/                           # WordPress deployment package
    └── salaryseed-calculator/
        ├── salaryseed-calculator.php    # Plugin entry file & shortcode
        └── assets/
            ├── salaryseed.css
            └── salaryseed.js
```

---

## 4. Local Installation and Running

### Prerequisites
- **Node.js:** v18+ (verified on Node v24.14.1)
- **Python:** 3.10+ (for PDF report regeneration if needed)

### Step 1: Start the Local Web Server
You can start the application using the included zero-dependency server:
```bash
node server.js
```
*Or using npm:*
```bash
npm run serve
```
*Output:*
```
🌱 SalarySeed Web Server Running Locally
📡 URL: http://localhost:3000
📁 Directory: D:\SEO
```
Open your browser and navigate to `http://localhost:3000`.

---

## 5. Automated Testing

SalarySeed includes a native automated test suite covering 10 test scenarios:
- Rupee currency formatting with Indian grouping
- Budget 2024 New Tax Regime slabs
- Section 87A full tax rebate (₹0 tax up to ₹7,00,000 taxable income)
- 10 LPA slab tax computation + 4% cess
- Old Tax Regime standard deduction and rebate
- 5 LPA fresher CTC take-home breakdown
- 10 LPA and 25 LPA high-income CTC consistency
- Detailed mode custom inputs
- Zero and negative boundary condition handling

Run the tests with:
```bash
npm test
# Or: node --test test/salary-engine.test.js
```
*Actual Test Execution Result:*
```
✔ formatINR correctly formats numbers with Indian commas and Rupee symbol (14.469ms)
✔ calculateTaxNewRegime: Income up to ₹3 Lakh has 0 tax (0.2577ms)
✔ calculateTaxNewRegime: Section 87A Rebate yields 0 tax for taxable income <= ₹7,00,000 (0.1116ms)
✔ calculateTaxNewRegime: Taxable income ₹10 Lakh calculates correct slab tax + cess (0.0879ms)
✔ calculateTaxOldRegime: Basic exemption and 87A rebate up to ₹5,00,000 (0.1921ms)
✔ calculateQuickEstimate: 5 LPA Package breakdown and zero tax under Section 87A (0.2671ms)
✔ calculateQuickEstimate: 10 LPA Package breakdown (0.2372ms)
✔ calculateQuickEstimate: 25 LPA High Income CTC consistency (0.1328ms)
✔ calculateDetailedBreakdown: Custom inputs calculate correctly (0.4654ms)
✔ Boundary values: Zero CTC, negative values and empty inputs handled gracefully (0.2199ms)
ℹ tests 10 | pass 10 | fail 0 | cancelled 0 | duration_ms 93.5942
```

---

## 6. Supabase Local Configuration

To connect live Supabase authentication:
1. Open your free project at [https://supabase.com](https://supabase.com).
2. Copy your **Project URL** and public **`anon` key** from **Project Settings -> API**.
3. Open `js/config.js` and paste them:
   ```javascript
   export const SUPABASE_CONFIG = {
     url: "https://your-project-id.supabase.co",
     anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
   };
   ```
   *(Or place them in `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.)*
4. Ensure **Email Provider** is enabled under **Authentication -> Providers**.
5. Add `http://localhost:3000/auth/reset-password.html` to **Redirect URLs**.
6. Refer to `SUPABASE_SETUP.md` for complete troubleshooting instructions.

---

## 7. Viva & Academic Defense Notes

### The 10 LPA Calculation Walkthrough
- **Annual CTC:** ₹ 10,00,000
- **Basic Salary (40% of CTC):** ₹ 4,00,000
- **HRA (50% of Basic):** ₹ 2,00,000
- **Employer EPF (12% of Basic, in CTC):** ₹ 48,000
- **Gratuity Provision (4.81% of Basic, in CTC):** ₹ 19,240
- **Special Allowance (Balancing figure):** ₹ 3,32,760
- **Gross Cash Salary:** Basic + HRA + Special Allowance = ₹ 9,32,760
- **Employee Deductions:**
  - **Employee EPF (12% of Basic):** ₹ 48,000
  - **Professional Tax:** ₹ 2,400 (₹200/mo)
  - **Standard Deduction (Budget 2024 New Regime):** ₹ 75,000
  - **Net Taxable Income:** ₹ 9,32,760 - ₹ 75,000 = ₹ 8,57,760
  - **Tax Calculation:**
    - ₹ 0 to ₹ 3,00,000: 0% = ₹ 0
    - ₹ 3,00,001 to ₹ 7,00,000: 5% of ₹ 4,00,000 = ₹ 20,000
    - ₹ 7,00,001 to ₹ 8,57,760: 10% of ₹ 1,57,760 = ₹ 15,776
    - **Gross Tax:** ₹ 35,776
    - **Health & Education Cess (4%):** ₹ 1,431
    - **Total Income Tax:** ₹ 37,207
- **Total Employee Deductions:** ₹ 48,000 (PF) + ₹ 2,400 (PT) + ₹ 37,207 (Tax) = ₹ 87,607
- **Net Annual Take-Home:** ₹ 9,32,760 - ₹ 87,607 = **₹ 8,45,153**
- **Net Monthly In-Hand:** ₹ 8,45,153 / 12 = **₹ 70,429 per month**

---

## 8. Academic Deliverables & Report

The project includes the complete CSET489 Milestone I academic report adhering to the university template:
- **Markdown Report:** `CSET489_M1_Trinetra_Report.md`
- **Official Formatted PDF:** `CSET489_M1_Trinetra_Report.pdf`
- Both documents contain exact tables, persona analysis, 14 primary/secondary keywords, 7 long-tail terms, SERP competitor analysis (for `in-hand.in` and `fincalculator.in`), site hierarchy, 12-week roadmap, DNS tables, VPS deployment steps, and AI disclosure.
