import React from 'react';

/**
 * SelectInput — reusable labeled dropdown with error display.
 */
export function SelectInput({ id, label, description, options, value, onChange, onBlur, error, placeholder }) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {description && <span className="field-description">{description}</span>}
      <div className="select-wrapper">
        <select
          id={id}
          className={`form-select${error ? ' input-error' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        >
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <span id={`${id}-error`} className="field-error" role="alert">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 4a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 8 4zm0 9.25a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}
