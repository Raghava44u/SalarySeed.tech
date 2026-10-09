import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        methodology: resolve(__dirname, 'methodology.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        calculator: resolve(__dirname, 'salary-calculator.html'),
        login: resolve(__dirname, 'auth/login.html'),
        signup: resolve(__dirname, 'auth/signup.html'),
        forgotPassword: resolve(__dirname, 'auth/forgot-password.html'),
        resetPassword: resolve(__dirname, 'auth/reset-password.html'),
        guide5lpa: resolve(__dirname, 'guides/5-lpa-in-hand-salary.html'),
        guide10lpa: resolve(__dirname, 'guides/10-lpa-in-hand-salary.html'),
        guideCtcVsInHand: resolve(__dirname, 'guides/ctc-vs-in-hand-salary.html'),
        guideBreakup: resolve(__dirname, 'guides/salary-breakup-guide.html'),
        guideOldVsNew: resolve(__dirname, 'guides/old-vs-new-tax-regime.html'),
      },
    },
  },
});
