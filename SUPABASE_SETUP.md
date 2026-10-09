# Supabase Setup Guide for SalarySeed

This guide explains how to set up your free Supabase authentication project and link it to SalarySeed locally.

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **"New Project"**.
3. Select your organization.
4. Fill in the project details:
   - **Name:** `SalarySeed-Auth`
   - **Database Password:** Generate a strong password and save it in your personal password manager.
   - **Region:** Choose **Central India (Mumbai)** or South Asia for lowest latency.
   - **Pricing Plan:** Free Tier.
5. Click **"Create new project"** and wait 1–2 minutes for provisioning.

---

## 2. Locate Your API Credentials

1. In your Supabase dashboard, navigate to **Project Settings** (gear icon in the bottom left).
2. Click on **API** in the sidebar.
3. Under **Project API keys**, you will see:
   - **Project URL:** e.g., `https://xyzcompany.supabase.co`
   - **anon (public) key:** e.g., `eyJhbGciOi...`
   - **service_role (secret) key:** **DO NOT COPY THIS KEY!**
4. Copy the **Project URL** and the **anon (public)** key.

> **CRITICAL SECURITY RULE:**  
> The `anon` key is designed for browser use with Row Level Security.  
> **NEVER** expose your `service_role` key, database connection strings, or database passwords in frontend code, `.env`, Git commits, or chat.

---

## 3. Configure Local Credentials

SalarySeed supports two seamless configuration methods:

### Method A: Direct Config File (`js/config.js`)
Open `js/config.js` and enter your credentials:
```javascript
export const SUPABASE_CONFIG = {
  url: "https://your-project-id.supabase.co", // Replace with your Project URL
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // Replace with your anon key
};
```

### Method B: Environment File (`.env`)
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
*(Vite automatically injects these into `import.meta.env` during `npm run dev`.)*

---

## 4. Enable Email & Password Authentication

1. In the Supabase Dashboard, go to **Authentication** -> **Providers**.
2. Click on **Email**.
3. Verify that **Enable Email provider** is turned **ON**.
4. Option for Email Confirmations:
   - For fast local testing without waiting for email delivery, you may temporarily toggle **"Confirm email"** to **OFF**.
   - For production, keep **"Confirm email"** turned **ON** with your custom SMTP provider.
5. Click **Save**.

---

## 5. Configure Redirect URLs

For authentication callbacks (such as password resets and email verifications):

1. Go to **Authentication** -> **URL Configuration**.
2. Set **Site URL** to:
   - Local: `http://localhost:3000`
3. Under **Redirect URLs**, click **Add URL** and add:
   - `http://localhost:3000/auth/reset-password.html`
   - `http://localhost:3000/dashboard.html`
   - `http://localhost:3000/salary-calculator.html`
   - *(Later in Phase 15, add your live Azure URL here, e.g., `https://salaryseed.azurewebsites.net/...`)*
4. Click **Save changes**.

---

## 6. How to Test Local Authentication

1. Start the local server:
   ```bash
   node server.js
   # Or: npm run dev
   ```
2. Open `http://localhost:3000/auth/signup.html`.
3. Sign up with a test email and password (minimum 6 characters).
4. Upon successful signup/login, you will be redirected to the **Protected Dashboard** (`/dashboard.html`).
5. Verify you can access the **Salary Calculator** (`/salary-calculator.html`).
6. Click **Log Out** in the navigation. Verify that accessing `/dashboard.html` or `/salary-calculator.html` immediately redirects back to `/auth/login.html`.
7. Test the **Forgot Password** link (`/auth/forgot-password.html`).

---

## 7. Troubleshooting Common Errors

| Error | Cause | Solution |
| :--- | :--- | :--- |
| `Failed to fetch` / network error | Incorrect Supabase URL or blocked network | Check Project URL in `js/config.js` or `.env`. Ensure no firewall/adblocker blocks `supabase.co`. |
| `Invalid API key` | Typo in anon key or expired key | Re-copy the public `anon` key from Supabase Dashboard -> API. |
| `Email not confirmed` | Email confirmation is enabled in Supabase | Either check your inbox for the confirmation link or disable "Confirm email" in Supabase Auth settings during local testing. |
| `Redirect URL not allowed` | Redirect URL mismatch | Add `http://localhost:3000/auth/reset-password.html` in Supabase Auth URL Configuration. |
| Missing credentials notice | Placeholders still in config | Update `js/config.js` with your active project details. |
