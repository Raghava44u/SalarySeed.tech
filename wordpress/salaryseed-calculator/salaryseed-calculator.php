<?php
/**
 * Plugin Name: SalarySeed - Indian In-Hand Salary Calculator
 * Plugin URI: https://salaryseed.in
 * Description: Production-ready Indian CTC to In-Hand Salary Calculator for WordPress. Supports Budget 2024 New Tax Regime (Section 115BAC), EPF 12%, Gratuity, and State PT.
 * Version: 1.0.0
 * Author: Dasari Veera Raghavulu (Team Trinetra - Bennett University)
 * License: GPL2
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function salaryseed_enqueue_assets() {
    wp_register_style(
        'salaryseed-styles',
        plugins_url('assets/salaryseed.css', __FILE__),
        array(),
        '1.0.0'
    );
    wp_register_script(
        'salaryseed-script',
        plugins_url('assets/salaryseed.js', __FILE__),
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'salaryseed_enqueue_assets');

function salaryseed_calculator_shortcode($atts) {
    wp_enqueue_style('salaryseed-styles');
    wp_enqueue_script('salaryseed-script');

    ob_start();
    ?>
    <div class="salaryseed-wp-container">
        <div class="calc-panel">
            <h3 style="margin-bottom: 0.5rem; color: #064e3b;">SalarySeed In-Hand Calculator</h3>
            <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 1.5rem;">Updated with Budget 2024 New Tax Regime Slabs & S.87A Rebate</p>
            
            <div class="form-group">
                <label for="wp-ctc-input" class="form-label">Annual Cost to Company (CTC in ₹):</label>
                <input type="number" id="wp-ctc-input" class="form-input" value="1000000" min="0" step="10000">
            </div>

            <div class="form-group">
                <label for="wp-regime-input" class="form-label">Tax Regime:</label>
                <select id="wp-regime-input" class="form-select">
                    <option value="new_2024">New Tax Regime (Section 115BAC - ₹75k Std Ded)</option>
                    <option value="old">Old Tax Regime (₹50k Std Ded)</option>
                </select>
            </div>

            <div class="result-card-highlight" style="margin-top: 1.5rem; padding: 1.5rem; background: linear-gradient(135deg, #064e3b, #047857); color: #fff; border-radius: 12px; text-align: center;">
                <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.9;">Estimated Monthly In-Hand Cash</span>
                <div id="wp-res-monthly" style="font-size: 2.25rem; font-weight: 800; margin: 0.5rem 0;">₹ 70,429</div>
                <div id="wp-res-annual" style="font-size: 1rem; opacity: 0.9;">₹ 8,45,153 / year</div>
            </div>

            <div style="margin-top: 1.5rem;">
                <table class="styled-table" style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                    <thead>
                        <tr style="background: #f1f5f9;">
                            <th style="padding: 8px; text-align: left;">Component</th>
                            <th style="padding: 8px; text-align: right;">Monthly (₹)</th>
                            <th style="padding: 8px; text-align: right;">Annual (₹)</th>
                        </tr>
                    </thead>
                    <tbody id="wp-table-body">
                        <!-- Populated by JS -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('salaryseed_calculator', 'salaryseed_calculator_shortcode');
