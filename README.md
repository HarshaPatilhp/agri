# Agricultural Yield Prediction Dashboard

A modern, production-quality **frontend-only** dashboard for AI-powered crop yield estimation.

---

## Project Overview

This frontend collects 8 agricultural inputs from the user, validates them, calls a prediction service, and displays the estimated crop yield in tons per hectare.

The complete workflow:

```
Enter agricultural data → Validate → Predict → Display Yield → Review Inputs → Make Another Prediction
```

The UI sends validated input to the Python prediction backend and displays its `predicted_yield` response.

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
│   └── predictionService.js  # Backend API integration
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

## Backend API Integration

When the Python ML backend is ready:

### Endpoint

```
POST /predict
```

### Request body

```json
{
  "crop": "Rice",
  "crop_year": 2020,
  "season": "Kharif",
  "state": "Karnataka",
  "area": 5000,
  "annual_rainfall": 1200,
  "fertilizer": 150000,
  "pesticide": 5000
}
```

### Response

```json
{
  "predicted_yield": 4.72
}
```

Set the API base URL via `.env`:

```
VITE_API_BASE_URL=http://localhost:8000
```

The frontend sends `POST http://localhost:8000/predict` and displays the returned `predicted_yield` and `unit`.

> **Note:** The backend is intentionally not included in this project. This repository is frontend-only.

---

## Inputs

| Field | Type | Constraints |
|---|---|---|
| Crop | Dropdown | One of the 55 dataset crops |
| Crop Year | Dropdown | 1997–2020 |
| Season | Dropdown | Whole Year, Kharif, Rabi, Autumn, Summer, Winter |
| State | Dropdown | One of the 30 dataset states/UTs |
| Area | Number | 0.5–50,808,100 |
| Annual Rainfall | Number | 301.3–6,552.7 mm |
| Fertilizer | Number | 54.17–4,835,407,000 |
| Pesticide | Number | 0.09–15,750,510 |
