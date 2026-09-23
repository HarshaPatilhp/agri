import React, { useState } from 'react';
import { FormInput } from './FormInput';
import { SelectInput } from './SelectInput';
import { IrrigationControl } from './IrrigationControl';
import { CROP_TYPES, SOIL_TYPES } from '../constants/predictionOptions';
import { validatePredictionForm } from '../utils/validation';
import { predictYield } from '../services/predictionService';

const INITIAL_FORM = {
  cropType: '',
  rainfall: '',
  temperature: '',
  humidity: '',
  soilType: '',
  fertilizerUsage: '',
  cultivatedArea: '',
  irrigation: null,
};

/**
 * PredictionForm — collects all 8 agricultural inputs, validates them,
 * calls the prediction service, and lifts the result to the parent.
 *
 * @param {function} onSuccess - called with { result, formData } on successful prediction
 */
export function PredictionForm({ onSuccess }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState('');

  function updateField(field) {
    return (value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear per-field error on change
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError('');

    const validationErrors = validatePredictionForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error field
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) el.focus();
      return;
    }

    setLoading(true);
    try {
      const result = await predictYield(formData);
      onSuccess({ result, formData });
    } catch {
      setApiError('Unable to generate prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Crop yield prediction form">
      <div className="card">
        <h2 className="section-title">Prediction Inputs</h2>

        <div className="form-grid">
          {/* Crop Type */}
          <SelectInput
            id="cropType"
            label="Crop Type"
            options={CROP_TYPES}
            placeholder="Select crop type"
            value={formData.cropType}
            onChange={updateField('cropType')}
            error={errors.cropType}
          />

          {/* Soil Type */}
          <SelectInput
            id="soilType"
            label="Soil Type"
            options={SOIL_TYPES}
            placeholder="Select soil type"
            value={formData.soilType}
            onChange={updateField('soilType')}
            error={errors.soilType}
          />

          {/* Rainfall */}
          <FormInput
            id="rainfall"
            label="Rainfall"
            unit="mm"
            type="number"
            placeholder="e.g. 1200"
            min="0"
            step="any"
            value={formData.rainfall}
            onChange={updateField('rainfall')}
            error={errors.rainfall}
          />

          {/* Temperature */}
          <FormInput
            id="temperature"
            label="Temperature"
            unit="°C"
            type="number"
            placeholder="e.g. 27.5"
            step="0.1"
            value={formData.temperature}
            onChange={updateField('temperature')}
            error={errors.temperature}
          />

          {/* Humidity */}
          <FormInput
            id="humidity"
            label="Humidity"
            unit="%"
            type="number"
            placeholder="0 – 100"
            min="0"
            max="100"
            step="any"
            value={formData.humidity}
            onChange={updateField('humidity')}
            error={errors.humidity}
          />

          {/* Fertilizer Usage */}
          <FormInput
            id="fertilizerUsage"
            label="Fertilizer Usage"
            unit="kg/ha"
            type="number"
            placeholder="e.g. 150"
            min="0"
            step="any"
            value={formData.fertilizerUsage}
            onChange={updateField('fertilizerUsage')}
            error={errors.fertilizerUsage}
          />

          {/* Cultivated Area */}
          <FormInput
            id="cultivatedArea"
            label="Cultivated Area"
            unit="ha"
            type="number"
            placeholder="e.g. 5.5"
            min="0.01"
            step="any"
            value={formData.cultivatedArea}
            onChange={updateField('cultivatedArea')}
            error={errors.cultivatedArea}
          />

          {/* Irrigation */}
          <IrrigationControl
            value={formData.irrigation}
            onChange={updateField('irrigation')}
            error={errors.irrigation}
          />
        </div>

        {/* API error banner */}
        {apiError && (
          <div className="error-banner" role="alert">
            <svg className="error-banner-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
            <p>{apiError}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          id="predict-btn"
          type="submit"
          className="btn-predict"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="btn-spinner" aria-hidden="true" />
              Predicting Yield...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              Predict Yield
            </>
          )}
        </button>
      </div>
    </form>
  );
}
