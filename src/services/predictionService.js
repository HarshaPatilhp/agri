/**
 * predictionService.js
 *
 * Abstraction layer between the UI and the prediction backend.
 *
 * Currently uses a mock response. When the Python REST API is ready,
 * replace the mock body with a real fetch/axios call — the UI stays unchanged.
 *
 * Future API contract:
 *   POST /predict
 *   Body: {
 *     crop_type: string,
 *     rainfall: number,
 *     temperature: number,
 *     humidity: number,
 *     soil_type: string,
 *     fertilizer_usage: number,
 *     cultivated_area: number,
 *     irrigation: boolean,
 *   }
 *   Response: { predicted_yield: number }
 */

// Base URL for the future REST API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Converts camelCase form data to the snake_case API contract.
 */
function toApiPayload(formData) {
  return {
    crop_type: formData.cropType,
    rainfall: Number(formData.rainfall),
    temperature: Number(formData.temperature),
    humidity: Number(formData.humidity),
    soil_type: formData.soilType,
    fertilizer_usage: Number(formData.fertilizerUsage),
    cultivated_area: Number(formData.cultivatedArea),
    irrigation: formData.irrigation,
  };
}

/**
 * Mock implementation — simulates network latency and returns a static prediction.
 * Replace this function body with a real fetch() call when the backend is ready.
 */
async function mockPredictYield(payload) {
  // Simulate network delay (800 – 1400 ms)
  const delay = 800 + Math.random() * 600;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Deterministic-looking mock: vary slightly based on cultivated area
  const base = 4.72;
  const variation = (payload.cultivated_area % 1) * 0.5;
  const predicted_yield = parseFloat((base + variation).toFixed(2));

  return { predicted_yield };
}

/**
 * Primary prediction function called by the UI.
 *
 * @param {Object} formData - Raw form state (camelCase keys)
 * @returns {Promise<{ predicted_yield: number }>}
 */
export async function predictYield(formData) {
  const payload = toApiPayload(formData);

  // ─── MOCK MODE (active until backend is connected) ──────────────────────────
  return mockPredictYield(payload);
  // ─── REAL API MODE (uncomment when backend is ready) ────────────────────────
  // const response = await fetch(`${API_BASE_URL}/predict`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });
  // if (!response.ok) {
  //   throw new Error(`Prediction API error: ${response.status}`);
  // }
  // return response.json();
}
