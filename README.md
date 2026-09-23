# Agricultural Yield Prediction Dashboard

A modern, production-quality **frontend-only** dashboard for AI-powered crop yield estimation.

---

## Project Overview

This frontend collects 8 agricultural inputs from the user, validates them, calls a prediction service, and displays the estimated crop yield in tons per hectare.

The complete workflow:

```
Enter agricultural data → Validate → Predict → Display Yield → Review Inputs → Make Another Prediction
```

The UI is fully functional using a **mock prediction service**. When the Python ML backend is ready, a single code change in `src/services/predictionService.js` connects the real API — no UI changes required.

---

## Technology

| Concern | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) |
| Build tool | [Vite](https://vitejs.dev/) |
| Styling | Vanilla CSS with CSS Custom Properties |
| Fonts | Google Fonts (Inter, Plus Jakarta Sans) |
| State management | React local state (`useState`) |

No external UI component libraries or CSS frameworks are used.

---

## Project Structure

```
src/
├── components/
│   ├── PredictionForm.jsx    # Main form (8 inputs + validation + submit)
│   ├── PredictionResult.jsx  # Result card + summary + reset
│   ├── InputSummary.jsx      # Grid of submitted field values
│   ├── FormInput.jsx         # Reusable labeled numeric/text input
│   ├── SelectInput.jsx       # Reusable dropdown input
│   └── IrrigationControl.jsx # Yes/No segmented radio control
│
├── services/
│   └── predictionService.js  # API abstraction layer (mock → real)
│
├── constants/
│   └── predictionOptions.js  # Crop types & soil types config
│
├── utils/
│   └── validation.js         # Form validation logic
│
├── pages/
│   └── Dashboard.jsx         # Top-level page / state machine
│
├── App.jsx
├── main.jsx
└── index.css                 # Design system + all component styles
```

---

## Installation

```bash
npm install
```

---

## Run

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Mock API

Currently, `src/services/predictionService.js` uses a **mock implementation** that:

- Simulates a network delay of ~800–1400 ms
- Returns a mock `predicted_yield` value (varies slightly based on cultivated area)
- Requires no backend or network connection

This allows the complete frontend workflow to be demonstrated without any backend.

---

## Future API Integration

When the Python ML backend is ready:

### Endpoint

```
POST /predict
```

### Request body

```json
{
  "crop_type": "Rice",
  "rainfall": 1200,
  "temperature": 27.5,
  "humidity": 72,
  "soil_type": "Loamy",
  "fertilizer_usage": 150,
  "cultivated_area": 5.5,
  "irrigation": true
}
```

### Response

```json
{
  "predicted_yield": 4.72
}
```

### How to connect

In `src/services/predictionService.js`, replace the mock body with:

```js
const response = await fetch(`${API_BASE_URL}/predict`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
if (!response.ok) throw new Error(`API error: ${response.status}`);
return response.json();
```

The commented-out code is already present in the file — just uncomment it.

Set the API base URL via an environment variable:

```
VITE_API_BASE_URL=http://localhost:8000
```

> **Note:** The backend is intentionally not included in this project. This repository is frontend-only.

---

## Inputs

| Field | Type | Constraints |
|---|---|---|
| Crop Type | Dropdown | Required |
| Rainfall | Number | Required, ≥ 0 mm |
| Temperature | Number | Required |
| Humidity | Number | Required, 0–100% |
| Soil Type | Dropdown | Required |
| Fertilizer Usage | Number | Required, ≥ 0 kg/ha |
| Cultivated Area | Number | Required, > 0 ha |
| Irrigation | Boolean (Yes/No) | Required |
