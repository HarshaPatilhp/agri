import { CROP_TYPES, CROP_YEARS, FIELD_RANGES, SEASONS, STATES } from '../constants/predictionOptions';

const isBlank = (value) => value === '' || value === null || value === undefined || (typeof value === 'string' && value.trim() === '');

function validateNumber(data, field, label, min, max, errors) {
  if (isBlank(data[field])) {
    errors[field] = `${label} is required.`;
    return;
  }

  const value = Number(data[field]);
  if (!Number.isFinite(value)) {
    errors[field] = `${label} must be a finite number.`;
  } else if (value < min || value > max) {
    errors[field] = `${label} must be between ${min.toLocaleString()} and ${max.toLocaleString()}.`;
  }
}

export function validatePredictionForm(data) {
  const errors = {};

  if (!CROP_TYPES.includes(data.crop)) {
    errors.crop = 'Please select a valid crop.';
  }
  if (!CROP_YEARS.includes(Number(data.cropYear))) {
    errors.cropYear = 'Crop year must be between 1997 and 2020.';
  }
  if (!SEASONS.includes(data.season)) {
    errors.season = 'Please select a valid season.';
  }
  if (!STATES.includes(data.state)) {
    errors.state = 'Please select a valid state.';
  }

  validateNumber(data, 'area', 'Area', FIELD_RANGES.area.min, FIELD_RANGES.area.max, errors);
  validateNumber(data, 'annualRainfall', 'Annual rainfall', FIELD_RANGES.annualRainfall.min, FIELD_RANGES.annualRainfall.max, errors);
  validateNumber(data, 'fertilizer', 'Fertilizer', FIELD_RANGES.fertilizer.min, FIELD_RANGES.fertilizer.max, errors);
  validateNumber(data, 'pesticide', 'Pesticide', FIELD_RANGES.pesticide.min, FIELD_RANGES.pesticide.max, errors);

  return errors;
}
