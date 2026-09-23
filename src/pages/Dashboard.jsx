import React, { useState } from 'react';
import { PredictionForm } from '../components/PredictionForm';
import { PredictionResult } from '../components/PredictionResult';

/**
 * Dashboard — top-level page that owns the prediction state machine.
 *
 * States:
 *   idle     → show PredictionForm
 *   success  → show PredictionResult
 *
 * Loading and error states are managed inside PredictionForm.
 */
export function Dashboard() {
  const [prediction, setPrediction] = useState(null); // { result, formData }

  function handleSuccess({ result, formData }) {
    setPrediction({ result, formData });
  }

  function handleReset() {
    setPrediction(null);
  }

  return (
    <div className="page-wrapper">
      <main className="page-inner">
        {/* ── Header ── */}
        <header className="dashboard-header">
          <div className="header-icon" aria-hidden="true">
            {/* Leaf / crop icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10"/>
              <path d="M12 2c3 3 5 6.5 5 10"/>
              <path d="M2.5 10.5S7 9 12 12s9.5 1.5 9.5 1.5"/>
              <path d="M12 12v10"/>
            </svg>
          </div>
          <div className="header-text">
            <h1>Agricultural Yield Prediction</h1>
            <p>AI-powered crop yield estimation for smarter farming decisions</p>
          </div>
        </header>

        {/* ── Content ── */}
        {prediction ? (
          <PredictionResult
            predictedYield={prediction.result.predicted_yield}
            formData={prediction.formData}
            onReset={handleReset}
          />
        ) : (
          <PredictionForm onSuccess={handleSuccess} />
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="dashboard-footer">
        <p>Agricultural Yield Prediction Dashboard &mdash; Connected to the prediction API.</p>
      </footer>
    </div>
  );
}
