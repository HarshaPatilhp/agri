/**
 * predictionService.js
 *
 * Abstraction layer between the UI and the prediction backend.
 *
 * Backend API contract:
 *   POST /predict
 *   Body: {
 *     crop: string, crop_year: number, season: string, state: string,
 *     area: number, annual_rainfall: number, fertilizer: number, pesticide: number,
 *   }
 *   Response: { predicted_yield: number, unit?: string }
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Converts form state to the exact prediction API contract.
 */
function toApiPayload(formData) {
  return {
    crop: formData.crop,
    crop_year: Number(formData.cropYear),
    season: formData.season,
    state: formData.state,
    area: Number(formData.area),
    annual_rainfall: Number(formData.annualRainfall),
    fertilizer: Number(formData.fertilizer),
    pesticide: Number(formData.pesticide),
  };
}

/**
 * Primary prediction function called by the UI.
 *
 * @param {Object} formData - Raw form state (camelCase keys)
 * @returns {Promise<{ predicted_yield: number }>}
 */
export async function predictYield(formData) {
  const payload = toApiPayload(formData);
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = `Prediction API error: ${response.status}`;
    try {
      const errorBody = await response.json();
      if (Array.isArray(errorBody.detail)) {
        message = errorBody.detail.map((error) => error.msg).filter(Boolean).join(' ');
      } else if (typeof errorBody.detail === 'string') {
        message = errorBody.detail;
      }
    } catch {
      // Keep the status-based message when the server has no JSON error body.
    }
    throw new Error(message);
  }

  const result = await response.json();
  if (typeof result.predicted_yield !== 'number' || !Number.isFinite(result.predicted_yield)) {
    throw new Error('The prediction response did not contain a valid predicted_yield.');
  }
  return result;
}
