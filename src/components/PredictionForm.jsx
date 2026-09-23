import React, { useState } from 'react';
import { FormInput } from './FormInput';
import { SelectInput } from './SelectInput';
import { CROP_TYPES, CROP_YEARS, SEASONS, STATES, FIELD_RANGES } from '../constants/predictionOptions';
import { validatePredictionForm } from '../utils/validation';
import { predictYield } from '../services/predictionService';

const INITIAL_FORM = {
  crop: '',
  cropYear: '',
  season: '',
  state: '',
  area: '',
  annualRainfall: '',
  fertilizer: '',
  pesticide: '',
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
      setFormData((prev) => {
        const nextData = { ...prev, [field]: value };
        const fieldError = validatePredictionForm(nextData)[field] || '';
        setErrors((currentErrors) => ({ ...currentErrors, [field]: fieldError }));
        return nextData;
      });
    };
  }

  function validateField(field) {
    return () => {
      const fieldErrors = validatePredictionForm(formData);
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] || '' }));
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
    } catch (error) {
      setApiError(error.message || 'Unable to generate prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Crop yield prediction form">
      <div className="card">
        <h2 className="section-title">Prediction Inputs</h2>

        <div className="form-grid">
          {/* Crop */}
          <SelectInput
            id="crop"
            label="Crop"
            description="The crop grown in the selected season and state."
            options={CROP_TYPES}
            placeholder="Select crop"
            value={formData.crop}
            onChange={updateField('crop')}
            onBlur={validateField('crop')}
            error={errors.crop}
          />

          {/* Crop Year */}
          <SelectInput
            id="cropYear"
            label="Crop Year"
            description="The harvest year; choose a year from 1997 to 2020."
            options={CROP_YEARS}
            placeholder="Select crop year"
            value={formData.cropYear}
            onChange={updateField('cropYear')}
            onBlur={validateField('cropYear')}
            error={errors.cropYear}
          />

          {/* Season */}
          <SelectInput
            id="season"
            label="Season"
            description="The growing season when the crop was cultivated."
            options={SEASONS}
            placeholder="Select season"
            value={formData.season}
            onChange={updateField('season')}
            onBlur={validateField('season')}
            error={errors.season}
          />

          {/* State */}
          <SelectInput
            id="state"
            label="State"
            description="The Indian state or UT where the crop was grown."
            options={STATES}
            placeholder="Select state"
            value={formData.state}
            onChange={updateField('state')}
            onBlur={validateField('state')}
            error={errors.state}
          />

          {/* Area */}
          <FormInput
            id="area"
            label="Area"
            unit="ha"
            description="The cultivated land area, measured in hectares."
            type="number"
            placeholder="e.g. 5000"
            min={FIELD_RANGES.area.min}
            max={FIELD_RANGES.area.max}
            step="any"
            value={formData.area}
            onChange={updateField('area')}
            onBlur={validateField('area')}
            error={errors.area}
          />

          {/* Annual Rainfall */}
          <FormInput
            id="annualRainfall"
            label="Annual Rainfall"
            description="The total rainfall received during the year, in millimetres."
            unit="mm"
            type="number"
            placeholder="e.g. 1200"
            min={FIELD_RANGES.annualRainfall.min}
            max={FIELD_RANGES.annualRainfall.max}
            step="any"
            value={formData.annualRainfall}
            onChange={updateField('annualRainfall')}
            onBlur={validateField('annualRainfall')}
            error={errors.annualRainfall}
          />

          {/* Fertilizer */}
          <FormInput
            id="fertilizer"
            label="Fertilizer"
            unit="kg"
            description="The amount of fertilizer applied to the crop."
            type="number"
            placeholder="e.g. 150000"
            min={FIELD_RANGES.fertilizer.min}
            max={FIELD_RANGES.fertilizer.max}
            step="any"
            value={formData.fertilizer}
            onChange={updateField('fertilizer')}
            onBlur={validateField('fertilizer')}
            error={errors.fertilizer}
          />

          {/* Pesticide */}
          <FormInput
            id="pesticide"
            label="Pesticide"
            unit="kg"
            description="The amount of pesticide used for the crop."
            type="number"
            placeholder="e.g. 5000"
            min={FIELD_RANGES.pesticide.min}
            max={FIELD_RANGES.pesticide.max}
            step="any"
            value={formData.pesticide}
            onChange={updateField('pesticide')}
            onBlur={validateField('pesticide')}
            error={errors.pesticide}
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
