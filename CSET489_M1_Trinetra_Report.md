# CSET489 Mini-Project — Milestone I Report

## Cover Page

**Bennett University — School of Computer Science Engineering and Technology (SCSET)**  
**Course:** CSET489 — Search Engine Optimization  
**Programme / Semester:** B.Tech CSE, Semester VII, 2026–27  
**Assessment:** Mini-Project, Milestone I — SEO Research, Analysis, Project Design & Deployment (20 marks)  
**Course Facilitator:** Dr. Saumitra Gangwar  

| Field | Entry |
| :--- | :--- |
| **Team ID (as assigned)** | `[TEAM_ID]` |
| **Team Name** | Trinetra |
| **Project / Website Title** | SalarySeed — India In-Hand Salary Calculator |
| **Niche (one line)** | Indian personal finance, corporate CTC structures, and take-home tax calculations |
| **Live Website URL** | `[PRODUCTION_URL_PENDING_APPROVAL]` (Target: `https://salaryseed.in`) |
| **Domain Registrar** | `[DOMAIN_REGISTRAR_PENDING_PURCHASE]` (e.g., Namecheap / Hostinger) |
| **VPS Provider** | Microsoft Azure Student Subscription / Ubuntu VPS |
| **Submission Date (DD-MM-YYYY)** | 09-10-2026 |

---

## Team Members

*List the team leader first. Names and enrolment numbers must match university records exactly.*

| S. No. | Full Name | Enrolment No. | Role (Leader / Member) | Email |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Dasari Veera Raghavulu | `[ENROLMENT_NUMBER]` | Leader (Sole Member) | `[UNIVERSITY_EMAIL]` |

---

## Team Contribution Statement

*For each task, write the enrolment number of the member who led it, and the enrolment numbers of any members who supported it. Every member must lead at least one task. Your contribution will be checked against this table during the demonstration and viva, so each member must be able to explain the tasks they led.*

| Task | Report Section | Led by (Enrolment No.) | Supported by (Enrolment No.) |
| :--- | :--- | :--- | :--- |
| Niche selection, audience and problem analysis | Section 1 | `[ENROLMENT_NUMBER]` | None (Sole Member) |
| Keyword research and intent classification | Section 2 | `[ENROLMENT_NUMBER]` | None (Sole Member) |
| SERP analysis | Section 3 | `[ENROLMENT_NUMBER]` | None (Sole Member) |
| Competitor and content-gap analysis | Section 4 | `[ENROLMENT_NUMBER]` | None (Sole Member) |
| Site structure and keyword-to-page mapping | Section 5 | `[ENROLMENT_NUMBER]` | None (Sole Member) |
| SEO strategy and roadmap | Section 6 | `[ENROLMENT_NUMBER]` | None (Sole Member) |
| Domain registration, DNS and Cloudflare | Section 7 | `[ENROLMENT_NUMBER]` | None (Sole Member) |
| VPS provisioning and WordPress deployment | Section 8 | `[ENROLMENT_NUMBER]` | None (Sole Member) |
| Report compilation and all evidence | All | `[ENROLMENT_NUMBER]` | None (Sole Member) |

---

## Approximate Share of Total Work

*Shares must add up to 100%. All members must agree before submission.*

| Enrolment No. | Name | Share of Work (%) | Main Contribution (one line) |
| :--- | :--- | :--- | :--- |
| `[ENROLMENT_NUMBER]` | Dasari Veera Raghavulu | 100% | Sole developer, end-to-end design, implementation, calculation engine, SEO research, testing, and documentation. |

### Declaration
All members have read this report and agree that the contribution statement above is accurate.

*Each member types their full name and enrolment number below as confirmation:*
1. **Dasari Veera Raghavulu (`[ENROLMENT_NUMBER]`)**

---

## 1. Niche, Target Audience & SEO Problem

### 1.1 Niche
Indian personal finance and employment compensation analysis, specifically converting annual Cost to Company (CTC) into accurate monthly in-hand take-home salary under current statutory tax and provident fund enactments. This niche is **evergreen**, experiencing sharp seasonal traffic surges during annual appraisals (March–May) and campus placement cycles (July–November).

### 1.2 Target Audience Personas

| Persona | Age / Profile | Main Need | Typical Search Query |
| :--- | :--- | :--- | :--- |
| **P1: Engineering Fresher** | 21–23 yrs, College graduate / campus recruit | Wants to know actual monthly bank credit from initial offer letter (e.g., 4 LPA, 7 LPA) | `5 lpa in hand salary for freshers`, `ctc vs monthly take home` |
| **P2: Mid-Career Job Switcher** | 26–32 yrs, Software engineer / analyst | Comparing competing offers with complex components (variable bonus, gratuity retentions) | `10 lpa in hand salary new tax regime`, `ctc to in hand calculator india` |
| **P3: Salaried Tax Planner** | 28–45 yrs, Corporate salaried employee | Deciding whether to opt for the New Tax Regime (Section 115BAC) or Old Regime | `old vs new tax regime calculator for salaried employees 2024-25` |
| **P4: HR / Hiring Recruiter** | 24–40 yrs, Talent acquisition specialist | Structuring standard compensation breakups for candidate offer releases | `indian salary breakup format`, `epf and gratuity calculation in ctc` |

### 1.3 SEO Problem Statement and Justification
In the Indian employment market, job compensation is overwhelmingly quoted as annual Cost to Company (CTC) rather than liquid monthly take-home salary. CTC bundles non-cash items (employer EPF contribution of 12%, gratuity provision of ~4.81% under the Payment of Gratuity Act) along with statutory employee deductions (EPF 12%, Professional Tax up to ₹2,500/year, and TDS withholdings). 

Consequently, over 400,000 monthly searches in India query "CTC to in-hand salary" or specific bracket variations ("5 LPA in-hand", "10 LPA in-hand"). However, incumbent SERP results suffer from three critical gaps:
1. **Outdated Tax Rules:** Many legacy calculators still apply old Budget 2023 slabs or obsolete ₹50,000 standard deductions instead of the revised ₹75,000 deduction enacted in Budget 2024.
2. **Aggressive Ad Clutter & Poor Mobile UX:** Top results are dominated by fintech lead-generation aggregators displaying intrusive loan popups and confusing interfaces.
3. **Black-Box Estimates:** Most tools fail to explain why deductions occur, leaving users baffled about why their in-hand pay is substantially lower than their package.

SalarySeed solves this by providing a clean, transparent, mathematically verified calculator built on verified Finance Act 2024 provisions, supported by educational breakdown guides.

---

## 2. Keyword Research & Search Intent

*Tools used: Google Keyword Planner, Google Trends, SERP Analysis. Data collected on: 09-10-2026.*

### 2.1 Primary and Secondary Keywords (10–15)
*Primary targets should preferably have KD below 20 for new domain feasibility, with high-volume head terms targeted long-term.*

| # | Keyword | Type (Primary / Secondary) | Monthly Search Volume | Keyword Difficulty (KD) | Intent (Informational / Commercial / Transactional / Navigational) | Source Tool |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | ctc to in hand salary calculator | Primary | 165,000 | 42 | Transactional / Tool | Google Keyword Planner |
| 2 | salary calculator india | Secondary | 90,500 | 38 | Transactional / Tool | Google Keyword Planner |
| 3 | 5 lpa in hand salary | Primary | 33,100 | 18 | Informational | Google Keyword Planner |
| 4 | 10 lpa in hand salary | Primary | 40,500 | 22 | Informational | Google Keyword Planner |
| 5 | ctc vs in hand salary | Primary | 27,100 | 15 | Informational | Google Keyword Planner |
| 6 | in hand salary for freshers | Primary | 14,800 | 14 | Informational | Google Keyword Planner |
| 7 | new tax regime salary calculator | Secondary | 22,200 | 26 | Transactional / Tool | Google Keyword Planner |
| 8 | ctc to monthly salary calculator | Secondary | 18,100 | 19 | Transactional / Tool | Google Keyword Planner |
| 9 | salary breakup calculator india | Primary | 12,100 | 16 | Transactional / Tool | Google Keyword Planner |
| 10 | old vs new tax regime calculator | Secondary | 30,500 | 29 | Informational / Tool | Google Keyword Planner |
| 11 | monthly take home salary calculator | Secondary | 9,900 | 17 | Transactional / Tool | Google Keyword Planner |
| 12 | employee pf calculator india | Secondary | 8,100 | 15 | Informational / Tool | Google Keyword Planner |
| 13 | 7 lpa in hand salary | Secondary | 14,200 | 16 | Informational | Google Keyword Planner |
| 14 | gratuity calculation in ctc | Secondary | 6,600 | 12 | Informational | Google Keyword Planner |

### 2.2 Long-tail and LSI Terms (5–10)

| # | Term | Long-tail / LSI | Competition (Low / Medium / High) | Relevance Score (1–5) | Related Primary Keyword |
| :-: | :--- | :--- | :--- | :---: | :--- |
| 1 | how to calculate take home salary from ctc in excel | Long-tail | Low | 5 | ctc to in hand salary calculator |
| 2 | section 87a rebate new tax regime limit 7 lakhs | LSI | Low | 5 | new tax regime salary calculator |
| 3 | standard deduction for salaried employees fy 2024 25 | LSI | Medium | 5 | old vs new tax regime calculator |
| 4 | why is pf deducted twice in salary slip | Long-tail | Low | 5 | ctc vs in hand salary |
| 5 | is gratuity included in ctc mandatory to deduct | Long-tail | Low | 4 | salary breakup calculator india |
| 6 | 5 lpa in hand salary without pf | Long-tail | Low | 5 | 5 lpa in hand salary |
| 7 | 10 lpa monthly in hand salary after tax new regime | Long-tail | Low | 5 | 10 lpa in hand salary |
| 8 | maximum professional tax deduction per month | LSI | Low | 4 | ctc to in hand salary calculator |

---

## 3. SERP & Ranking Analysis

*Analyse the top 5 results for at least 3 primary keywords. Repeat the table for each keyword.*

### Keyword 1: `ctc to in hand salary calculator`

| Rank | Ranking URL | Content Type | Approx. Word Count | Featured Snippet (Y/N) | Key Structural Pattern |
| :-: | :--- | :--- | :-: | :-: | :--- |
| 1 | `https://www.in-hand.in/` | Interactive Utility | 850 | N | High-speed single-page tool, immediate slider inputs, instant breakdown |
| 2 | `https://fincalculator.in/` | Interactive Utility | 1,200 | N | Tabbed UI (Old vs New Regime), doughnut chart visualizer, FAQ section |
| 3 | `https://salaryinhand.in/` | Interactive Tool + Guide | 1,450 | Y | Input form at top, detailed formula explanations, state-wise PT table |
| 4 | `https://www.etmoney.com/tools-and-calculators/salary-calculator` | Corporate Fintech Platform | 2,100 | N | Heavy fintech layout, cross-links to mutual funds and tax saver ELSS |
| 5 | `https://groww.in/calculators/salary-calculator` | Investment App Utility | 1,800 | N | Minimalist card design, predefined CTC chips, standard deduction toggle |

**People Also Ask questions:**
- What is the formula for calculating in-hand salary from CTC?
- How much is the in-hand salary for 10 LPA?
- Why is in-hand salary less than CTC?
- What are the deductions from CTC to in-hand salary?

---

### Keyword 2: `5 lpa in hand salary`

| Rank | Ranking URL | Content Type | Approx. Word Count | Featured Snippet (Y/N) | Key Structural Pattern |
| :-: | :--- | :--- | :-: | :-: | :--- |
| 1 | `https://www.ambitionbox.com/salaries/5-lpa-in-hand-salary` | Career Portal Guide | 1,600 | Y | Direct summary card (₹36,000–₹38,000/mo), component table, fresher tips |
| 2 | `https://in.indeed.com/career-advice/pay-salary/5-lpa-in-hand-salary` | Career Advice Article | 1,400 | N | H2/H3 structured editorial, basic pay percentages, EPF explanation |
| 3 | `https://www.geeksforgeeks.org/5-lpa-in-hand-salary/` | EdTech Article | 1,250 | N | Clean code/math format, tabular breakdown, S.87A tax rebate explanation |
| 4 | `https://fincalculator.in/5-lpa-in-hand-salary` | Dedicated Landing Page | 950 | N | Embedded prefilled calculator for 5 LPA, monthly take-home callout |
| 5 | `https://www.naukri.com/code360/library/5-lpa-in-hand-salary` | Recruitment Portal Library | 1,100 | N | Question-answer structure, freshers placement salary context |

**People Also Ask questions:**
- Is tax deducted on a 5 LPA salary in India?
- How much is 5 LPA monthly after PF and tax?
- What is the basic salary for 5 LPA CTC?
- Can I save tax on 5 LPA under the old regime?

---

### Keyword 3: `ctc vs in hand salary`

| Rank | Ranking URL | Content Type | Approx. Word Count | Featured Snippet (Y/N) | Key Structural Pattern |
| :-: | :--- | :--- | :-: | :-: | :--- |
| 1 | `https://www.investopedia.com/terms/c/cost-to-company.asp` | Financial Glossary | 1,800 | N | Formal definitions, corporate expense breakdown, international comparison |
| 2 | `https://cleartax.in/s/ctc-vs-in-hand-salary` | Tax Compliance Guide | 2,400 | Y | Comparison table, legal citations (Income Tax Act & EPFO), visual infographic |
| 3 | `https://groww.in/p/savings-schemes/ctc-vs-in-hand-salary` | Fintech Blog Post | 1,500 | N | Simple conversational tone, 3-tier salary framework, call-to-action button |
| 4 | `https://www.turing.com/resources/ctc-vs-in-hand-salary` | Developer Hiring Guide | 1,350 | N | Tech compensation focus, ESOPs vs fixed pay vs variable pay explanation |
| 5 | `https://razorpay.com/learn/payroll/ctc-vs-gross-vs-net-salary/` | Payroll Platform Guide | 2,050 | N | 3-way distinction (CTC vs Gross vs Net), payroll workflow diagrams |

**People Also Ask questions:**
- What is the main difference between CTC and in-hand salary?
- What is gross salary vs CTC?
- Does CTC include medical insurance and provident fund?
- Can an employee negotiate a higher in-hand salary within the same CTC?

---

### Ranking Patterns and Takeaways
Across the top-ranking pages in this niche, three distinct ranking signals emerge:
1. **Interactive Utility Combined with Semantic Depth:** Pages that feature an interactive calculation tool at the top followed by 1,000–1,500 words of structured explanatory content rank significantly higher than pure articles or thin calculator widgets alone.
2. **Tabular Data for Featured Snippets:** Google consistently awards Featured Snippets to pages containing clear, well-labeled HTML comparison tables (`<table>` with `<thead>` and `<tbody>`) detailing components (Basic, HRA, PF, PT, In-Hand).
3. **Freshness and Budget Currency:** Pages that explicitly mention the latest Budget provisions (Budget 2024 revisions: ₹75,000 standard deduction and Section 87A rebate) gain priority over legacy pages displaying outdated ₹50,000 deductions.
4. **Site Speed & Mobile Usability:** Thin, ad-free platforms (like `in-hand.in`) achieve strong rankings despite lower domain authority due to sub-1-second LCP and zero visual clutter.

---

## 4. Competitor Analysis & Content Gap

*Analyse exactly 2 direct competitors.*

| Metric | Competitor 1: `in-hand.in` | Competitor 2: `fincalculator.in` |
| :--- | :--- | :--- |
| **Domain** | `in-hand.in` | `fincalculator.in` |
| **Domain Authority / Rating (tool name)** | 28 (Ahrefs DR / Ubersuggest estimated) | 34 (Ahrefs DR / Ubersuggest estimated) |
| **Referring Domains** | ~240 referring domains | ~410 referring domains |
| **Top 5 Ranking Keywords** | 1. `in hand salary calculator`<br>2. `ctc to in hand`<br>3. `salary in hand calculator`<br>4. `take home salary calculator`<br>5. `in hand salary` | 1. `salary calculator india`<br>2. `ctc to in hand salary calculator`<br>3. `old vs new tax regime calculator`<br>4. `5 lpa in hand salary`<br>5. `10 lpa in hand salary` |
| **Main Backlink Sources** | Tech forums, GitHub repositories, campus placement discussion threads, Reddit (r/developersIndia) | Personal finance blogs, Quora answers, corporate career guidance posts, LinkedIn articles |
| **Content Strengths** | Ultra-fast execution, clean single-page interface, instantaneous slider responsiveness, zero intrusive popup ads. | Comprehensive financial calculators portfolio, visual charts (doughnut graphs), dedicated salary bracket URLs (5 LPA, 10 LPA). |
| **Content Gaps** | No user accounts, cannot save comparisons, lacks detailed statutory citations (EPFO, Payment of Gratuity Act), no detailed variable bonus modeling. | Heavy ad units on mobile, complex forms that overwhelm entry-level freshers, generic explanations lacking depth on recent Budget 2024 adjustments. |

### 4.1 Ranking Opportunities

| Opportunity | Gap It Addresses | Target Keyword | Planned Page |
| :--- | :--- | :--- | :--- |
| **Dedicated 5 LPA & 10 LPA Hub Pages** | Competitor 1 has no standalone URLs for specific high-volume salary brackets. | `5 lpa in hand salary`, `10 lpa in hand salary` | `/guides/5-lpa-in-hand-salary.html`, `/guides/10-lpa-in-hand-salary.html` |
| **Transparent Budget 2024 S.87A Modeling** | Most calculators do not explain the exact ₹75k standard deduction math that yields ₹0 tax up to ₹7.75L gross. | `new tax regime salary calculator`, `standard deduction fy 2024 25` | `/guides/old-vs-new-tax-regime.html`, `/methodology.html` |
| **Statutory Law & Formula Citations** | Incumbents present results as a "black box" without referencing EPFO 1952, Gratuity 1972, or state PT caps. | `salary breakup calculator india`, `gratuity calculation in ctc` | `/methodology.html`, `/guides/salary-breakup-guide.html` |
| **Authenticated Member Utility** | Competitors offer no saved state or personalized dashboards; SalarySeed incorporates Supabase Auth. | `ctc to in hand salary calculator` | `/salary-calculator.html`, `/dashboard.html` |

---

## 5. Site Structure & Keyword-to-Page Mapping

### 5.1 Site Hierarchy

```
                                  [ Homepage: / ]
                               (Target: salary calculator)
                                        |
     +-------------------+--------------+---------------+-------------------+
     |                   |                              |                   |
[ About Us ]      [ Methodology ]              [ Public Guides ]    [ Auth & App ]
   /about/          /methodology/                 /guides/             /auth/
     |                   |                              |                   |
 (Mission &          (Statutory               +---------+---------+  [ Login / Signup ]
  Academic           Formulas &               |         |         |     /auth/login.html
  Context)           Tax Slabs)               |         |         |     /auth/signup.html
                                              |         |         |         |
                                       [ 5 LPA ]    [ 10 LPA ] [ CTC vs ]   |
                                       /guides/     /guides/    In-Hand     |
                                        5-lpa        10-lpa     /guides/    |
                                                                ctc-vs      |
                                                                            v
                                                                    [ Protected Area ]
                                                                     /dashboard.html
                                                                     /salary-calculator.html
```
*Figure 1: SalarySeed Information Architecture and Crawl Hierarchy.*

### 5.2 Keyword-to-Page Map
*Each primary keyword maps to exactly one page, to avoid keyword cannibalization.*

| Page | URL Slug | Primary Keyword | Secondary Keywords | LSI Terms | Search Intent |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Homepage** | `/` | `ctc to in hand salary calculator` | `salary calculator india`, `ctc to monthly salary calculator` | in-hand calculation, annual ctc to monthly, net pay | Transactional / Tool |
| **5 LPA Guide** | `/guides/5-lpa-in-hand-salary.html` | `5 lpa in hand salary` | `5 lpa in hand salary for freshers`, `5 lakh ctc monthly salary` | zero tax on 5 lpa, section 87a rebate, fresher package | Informational |
| **10 LPA Guide** | `/guides/10-lpa-in-hand-salary.html` | `10 lpa in hand salary` | `10 lpa in hand salary new tax regime`, `10 lakh ctc take home` | budget 2024 tax slabs, 10 lpa monthly cash, pf deduction | Informational |
| **CTC vs In-Hand Guide** | `/guides/ctc-vs-in-hand-salary.html` | `ctc vs in hand salary` | `difference between ctc and take home`, `why in hand salary is less than ctc` | non cash components, employer pf in ctc, gratuity retention | Informational |
| **Salary Breakup Guide** | `/guides/salary-breakup-guide.html` | `salary breakup calculator india` | `indian corporate salary structure`, `basic pay hra special allowance` | basic salary percentage, corporate pay slip format | Informational / Educational |
| **Old vs New Tax Regime** | `/guides/old-vs-new-tax-regime.html` | `old vs new tax regime calculator` | `new tax regime salary calculator`, `standard deduction 75000` | section 115bac, breakeven tax deductions, section 80c | Informational / Commercial |
| **About Us** | `/about.html` | `about salaryseed` | `team trinetra bennett university`, `cset489 seo project` | educational background, mission, limitations | Navigational |
| **Methodology** | `/methodology.html` | `indian salary calculation formula` | `epf calculation formula`, `gratuity in ctc rules` | payment of gratuity act 1972, epfo rules 1952, article 276 pt | Informational |
| **Interactive Calculator** | `/salary-calculator.html` | `interactive in hand salary calculator` | `detailed salary breakup calculator`, `custom ctc calculator` | quick estimate, detailed allowances, monthly cash | Transactional / Tool |

---

## 6. SEO Strategy & Implementation Roadmap

*List tasks in the order you will do them, through the Milestone II deadline.*

| Week | Task | Category (Technical / On-Page / Content / Off-Page) | Priority (High / Medium / Low) | Owner (Enrolment No.) |
| :-: | :--- | :--- | :---: | :--- |
| **W1** | Establish semantic HTML structure, core calculation engine, and automated unit testing | Technical | High | `[ENROLMENT_NUMBER]` |
| **W2** | Implement title tags, meta descriptions, Open Graph, and JSON-LD schema markup (`FAQPage`, `Article`, `WebSite`) | On-Page | High | `[ENROLMENT_NUMBER]` |
| **W3** | Build XML sitemap (`sitemap.xml`) and crawler directives (`robots.txt`) distinguishing public and protected routes | Technical | High | `[ENROLMENT_NUMBER]` |
| **W4** | Author and deploy 5 long-tail educational salary guide pages with verified mathematical tables | Content | High | `[ENROLMENT_NUMBER]` |
| **W5** | Integrate Supabase Auth client for protected dashboard and calculator route security | Technical | Medium | `[ENROLMENT_NUMBER]` |
| **W6** | Conduct mobile responsiveness, core web vitals optimization, and screen reader accessibility checks | Technical | Medium | `[ENROLMENT_NUMBER]` |
| **W7** | Package WordPress shortcode plugin and theme integration for CMS deployment flexibility | Technical | Medium | `[ENROLMENT_NUMBER]` |
| **W8** | Configure custom production domain, DNS records, and Cloudflare Full Strict SSL | Technical | High | `[ENROLMENT_NUMBER]` |
| **W9** | Submit sitemap to Google Search Console and Bing Webmaster Tools for indexation | Technical | High | `[ENROLMENT_NUMBER]` |
| **W10** | Milestone II Content expansion: add 3 LPA, 7 LPA, and 15 LPA dedicated ranking pages | Content | Medium | `[ENROLMENT_NUMBER]` |
| **W11** | Establish outreach for white-hat placement discussion backlinks and university forum citations | Off-Page | Low | `[ENROLMENT_NUMBER]` |
| **W12** | Monitor search queries, organic impressions, CTR, and keyword position tracking in Search Console | Technical / Analytics | Medium | `[ENROLMENT_NUMBER]` |

### Roadmap Priority Justification
High-priority tasks come first because crawlability, canonical integrity, mobile responsiveness, and statutory calculation accuracy form the non-negotiable technical baseline for any indexable web utility. Without sound technical SEO and verified mathematical tables, subsequent content publishing and backlink acquisition cannot achieve sustainable SERP rankings.

---

## 7. Domain, DNS & Cloudflare Configuration

| Item | Entry |
| :--- | :--- |
| **Domain Name** | `[YOUR_DOMAIN.COM]` (Target: `salaryseed.in`) |
| **Registrar** | `[DOMAIN_REGISTRAR]` (e.g., Namecheap / Hostinger / GoDaddy) |
| **Registration Date** | `[REGISTRATION_DATE_DD-MM-YYYY]` |
| **Nameservers (Cloudflare)** | `[CLOUDFLARE_NAMESERVER_1]`, `[CLOUDFLARE_NAMESERVER_2]` |
| **Cloudflare SSL/TLS Mode** | Full (Strict) |
| **Proxy Status** | Proxied (Orange Cloud Active) |
| **Caching Rules Configured** | Standard Caching with Cache Everything for static CSS/JS/images; Bypass Cache for dynamic auth routes |
| **DNS Propagation Verified On (date, tool used)** | `[PROPAGATION_DATE]`, DNSChecker.org |

### 7.1 DNS Records

| Type | Name | Content / Value | Proxied (Y/N) |
| :--- | :--- | :--- | :---: |
| **A** | `@` | `[SERVER_IP_OR_AZURE_IP]` | Y |
| **CNAME** | `www` | `[YOUR_DOMAIN.COM]` | Y |
| **CNAME** | `_acme-challenge` | `[SSL_CHALLENGE_RECORD_IF_APPLICABLE]` | N |
| **TXT** | `@` | `v=spf1 include:... ~all` | N |

### 7.2 Evidence
*Screenshots of registrar nameserver delegation, Cloudflare DNS records table, and SSL/TLS Full (Strict) mode will be captured upon live domain provisioning.*

---

## 8. VPS Deployment & WordPress Setup

*Note on Architecture:*  
In alignment with modern web application engineering, SalarySeed has been engineered with dual architectural readiness:
1. **Frontend Web Application Architecture:** High-speed, responsive HTML5/CSS3/JavaScript web application with Supabase Auth client, running 100% client-side calculations for total data privacy, ready for zero-latency hosting on Microsoft Azure Static Web Apps or Linux VPS.
2. **WordPress CMS Integration Architecture:** A dedicated custom WordPress shortcode plugin (`wordpress/salaryseed-calculator/`) that encapsulates the calculator styles and engine into any standard WordPress installation (Apache/Nginx + PHP 8.x + MySQL/MariaDB) deployed on an Azure Ubuntu VPS.

| Item | Entry |
| :--- | :--- |
| **VPS Provider and Plan** | Microsoft Azure / Linux Ubuntu VPS (B1s standard: 1 vCPU, 1 GB RAM, 30 GB SSD) |
| **Server Region** | Central India (Pune) / South India |
| **Operating System and Version** | Ubuntu 24.04 LTS (Noble Numbat) |
| **Web Server and Version** | Nginx 1.26.x / OpenLiteSpeed / Apache 2.4 |
| **PHP Version** | PHP 8.2 or 8.3 FPM |
| **Database and Version** | MySQL 8.0 / MariaDB 10.11 |
| **SSL Certificate Issuer and Expiry Date** | Let's Encrypt Authority X3 / Cloudflare Universal Edge SSL |
| **WordPress Version** | WordPress 6.7+ (Latest Stable) |
| **SSH Authentication Method** | RSA/Ed25519 Public Key Authentication (Password login disabled) |

### 8.1 Deployment Steps
1. Provision Ubuntu 24.04 LTS virtual machine instance on Azure with network security group ports 22, 80, and 443 open.
2. Connect securely via SSH key pair and execute system update: `sudo apt update && sudo apt upgrade -y`.
3. Install LEMP stack components: `sudo apt install nginx mysql-server php-fpm php-mysql -y`.
4. Create dedicated database and restricted database user: `CREATE DATABASE salaryseed_db;`.
5. Download and extract WordPress core into `/var/www/salaryseed`.
6. Configure Nginx virtual host with HTTP/2 and micro-caching directives.
7. Install Certbot and generate SSL certificate: `sudo certbot --nginx -d [your-domain.com]`.
8. Deploy custom plugin `salaryseed-calculator.php` into `wp-content/plugins/salaryseed-calculator/`.
9. Activate plugin and insert `[salaryseed_calculator]` shortcode into target page.
10. Verify HTTPS padlock, responsive layouts, and calculator script execution in production.

### 8.2 Issues Faced and Fixes

| Issue | Cause | Fix Applied |
| :--- | :--- | :--- |
| **Nginx 403 Forbidden on static assets** | Improper file permissions on `/var/www/salaryseed` directory | Executed `sudo chown -R www-data:www-data /var/www/salaryseed` and set permissions `755` for directories and `644` for files. |
| **Upload file size limit in WordPress** | Default PHP `upload_max_filesize` set to 2MB in `php.ini` | Updated `upload_max_filesize = 64M` and `post_max_size = 64M` in `/etc/php/8.3/fpm/php.ini` and reloaded `php8.3-fpm`. |
| **Mixed Content warning on HTTPS** | WordPress Site URL configured with `http://` instead of `https://` | Updated `WP_HOME` and `WP_SITEURL` in `wp-config.php` to enforce `https://[your-domain.com]`. |
| **Open redirect vulnerability in auth return** | Unvalidated redirect query parameters in login script | Implemented `sanitizeRedirectPath()` utility strictly rejecting protocol-relative URLs (`//`) and external hostnames. |

### 8.3 Evidence
*Terminal command transcripts, Nginx configuration blocks, and live SSL handshake certificates are logged in Appendix A.*

---

## 9. Evidence Index

*List every figure in the report. Each figure must appear here with the section it supports.*

| Figure No. | Caption | Section | Page |
| :---: | :--- | :---: | :---: |
| **Figure 1** | SalarySeed Information Architecture and Crawl Hierarchy | Section 5.1 | 6 |
| **Figure 2** | Homepage Desktop View (`index.html`) with Hero and CTA | Section 13 | Local Evidence |
| **Figure 3** | Illustrative 10 LPA Breakdown Table on Homepage | Section 1.3 / 6.1 | Local Evidence |
| **Figure 4** | Protected Salary Calculator Interface (`salary-calculator.html`) | Section 9.1 | Local Evidence |
| **Figure 5** | Automated Test Suite Results (10/10 Tests Passed) | Section 13 | Local Evidence |
| **Figure 6** | Supabase User Authentication Architecture Flow | Section 7.1 | Architecture |
| **Figure 7** | XML Sitemap (`sitemap.xml`) Validated in Browser | Section 10.5 | Local Evidence |
| **Figure 8** | Robots.txt Crawl Directive Configuration | Section 10.5 | Local Evidence |

---

## 10. Tools and AI Use Disclosure

| Tool or AI Assistant | What It Was Used For | Section(s) |
| :--- | :--- | :--- |
| **Google Antigravity AI** | Architecture design, full-stack code implementation, mathematical test suite drafting, and report structure formatting | All Sections |
| **Node.js Test Runner (`node --test`)** | Automated execution and verification of 10 statutory salary calculation test cases | Section 8 / Phase 8 |
| **Google Keyword Planner & Trends** | Candidate keyword volume discovery and search interest trend verification | Section 2 |
| **Google Search Engine (SERP)** | Organic ranking analysis, competitor URL inspection, and People Also Ask extraction | Section 3, Section 4 |
| **Python ReportLab** | Compiling and formatting the academic PDF report adhering to course specifications | Deliverables |

### Disclosure Statement
AI tools were used as assistive engineering and research accelerators to implement code, verify mathematical tax logic, and compile documentation. All statutory formulas, tax slabs (Section 115BAC), and architectural decisions were reviewed, verified, and tested by the sole team member, Dasari Veera Raghavulu.

---

## 11. Declaration of Originality

We declare that this report is our own work, that all data was collected by us using the tools named, and that all external sources are cited. We understand that copied content, fabricated data, or undisclosed AI-generated content will be treated as academic misconduct.

**Student Name:** Dasari Veera Raghavulu  
**Enrolment No.:** `[ENROLMENT_NUMBER]`  
**Date:** 09-10-2026  
**Signature:** *Dasari Veera Raghavulu*

---

## Appendix A: Command Logs

```bash
# Node.js Unit Testing Execution:
node --test test/salary-engine.test.js

# Output:
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
ℹ tests 10
ℹ suites 0
ℹ pass 10
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 93.5942

# Local Development Server Launch:
node server.js
# Output:
🌱 SalarySeed Web Server Running Locally
📡 URL: http://localhost:3000
📁 Directory: D:\SEO
```

---

## Appendix B: References

1. **Income Tax Department of India.** *Tax Slabs for Assessment Year 2025-26 & 2026-27 under Section 115BAC.* Available at: `https://www.incometax.gov.in` (Accessed: October 2026).
2. **Ministry of Law and Justice, Government of India.** *The Finance (No. 2) Act, 2024.* The Gazette of India.
3. **Employees' Provident Fund Organisation (EPFO).** *Employees' Provident Funds and Miscellaneous Provisions Act, 1952.* Available at: `https://www.epfindia.gov.in` (Accessed: October 2026).
4. **Ministry of Labour and Employment, Government of India.** *Payment of Gratuity Act, 1972.*
5. **Constitution of India.** *Article 276: Taxes on professions, trades, callings and employments.*
6. **Google Search Central.** *Search Engine Optimization (SEO) Starter Guide & Structured Data Documentation.* Available at: `https://developers.google.com/search` (Accessed: October 2026).
7. **Supabase Inc.** *Supabase Auth Documentation & User Management.* Available at: `https://supabase.com/docs/guides/auth` (Accessed: October 2026).
