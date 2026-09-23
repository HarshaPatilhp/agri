import React from 'react';
import { InputSummary } from './InputSummary';

/**
 * PredictionResult — shows the yield result card, input summary, and reset button.
 *
 * @param {number}   predictedYield  - numeric yield value from the API
 * @param {object}   formData        - original form inputs used for this prediction
 * @param {function} onReset         - callback to return to the form
 */
export function PredictionResult({ predictedYield, formData, onReset }) {
  return (
    <div className="result-wrapper">
      {/* ── Yield Result Card ── */}
      <div className="yield-card" role="region" aria-label="Predicted crop yield result">
        <p className="yield-label">Predicted Yield</p>
        <p className="yield-number" aria-live="polite">
          {predictedYield.toFixed(2)}
        </p>
        <p className="yield-unit">tons / hectare</p>
        <div className="yield-status" aria-label="Prediction completed">
          <span className="yield-status-dot" aria-hidden="true" />
          Prediction completed
        </div>
      </div>

      {/* ── Input Summary ── */}
      <InputSummary formData={formData} />

      {/* ── Reset Button ── */}
      <button
        id="make-another-btn"
        type="button"
        className="btn-secondary"
        onClick={onReset}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
        Make Another Prediction
      </button>
    </div>
  );
}
