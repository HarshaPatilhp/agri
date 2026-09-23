import React from 'react';

/**
 * FormInput — reusable labeled numeric/text input with error display.
 */
export function FormInput({
  id,
  label,
  description,
  unit,
  type = 'number',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  min,
  max,
  step,
  inputMode,
}) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
        {unit && <span className="field-unit">{unit}</span>}
      </label>
      {description && <span className="field-description">{description}</span>}
      <input
        id={id}
        type={type}
        inputMode={inputMode || (type === 'number' ? 'decimal' : 'text')}
        className={`form-input${error ? ' input-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        min={min}
        max={max}
        step={step}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
      />
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
