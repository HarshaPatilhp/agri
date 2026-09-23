import React from 'react';

/**
 * IrrigationControl — segmented Yes/No radio control.
 * Represents irrigation as boolean (true/false).
 */
export function IrrigationControl({ value, onChange, error }) {
  return (
    <div className="form-field">
      <span className="form-label" id="irrigation-label">
        Irrigation
      </span>
      <div
        className={`irrigation-control${error ? ' irrigation-error' : ''}`}
        role="radiogroup"
        aria-labelledby="irrigation-label"
        aria-describedby={error ? 'irrigation-error' : undefined}
      >
        {[
          { label: 'Yes', boolVal: true },
          { label: 'No',  boolVal: false },
        ].map(({ label, boolVal }) => (
          <label key={label} className="irrigation-option">
            <input
              type="radio"
              name="irrigation"
              value={String(boolVal)}
              checked={value === boolVal}
              onChange={() => onChange(boolVal)}
              aria-label={`Irrigation: ${label}`}
            />
            <span className="irrigation-label">
              <span className="irrigation-dot" aria-hidden="true" />
              {label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <span id="irrigation-error" className="field-error" role="alert">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 4a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 8 4zm0 9.25a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}
