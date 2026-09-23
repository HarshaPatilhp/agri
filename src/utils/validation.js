/**
 * Validation utilities for the prediction form.
 * Returns an object where each key is a field name and each value is an error string.
 * An empty object means the form is valid.
 */

export function validatePredictionForm(data) {
  const errors = {};

  // Crop Type
  if (!data.cropType) {
    errors.cropType = 'Please select a crop type.';
  }

  // Rainfall
  if (data.rainfall === '' || data.rainfall === null || data.rainfall === undefined) {
    errors.rainfall = 'Rainfall is required.';
  } else if (isNaN(Number(data.rainfall))) {
    errors.rainfall = 'Rainfall must be a valid number.';
  } else if (Number(data.rainfall) < 0) {
    errors.rainfall = 'Rainfall cannot be negative.';
  }

  // Temperature
  if (data.temperature === '' || data.temperature === null || data.temperature === undefined) {
    errors.temperature = 'Temperature is required.';
  } else if (isNaN(Number(data.temperature))) {
    errors.temperature = 'Temperature must be a valid number.';
  }

  // Humidity
  if (data.humidity === '' || data.humidity === null || data.humidity === undefined) {
    errors.humidity = 'Humidity is required.';
  } else if (isNaN(Number(data.humidity))) {
    errors.humidity = 'Humidity must be a valid number.';
  } else if (Number(data.humidity) < 0 || Number(data.humidity) > 100) {
    errors.humidity = 'Humidity must be between 0 and 100%.';
  }

  // Soil Type
  if (!data.soilType) {
    errors.soilType = 'Please select a soil type.';
  }

  // Fertilizer Usage
  if (data.fertilizerUsage === '' || data.fertilizerUsage === null || data.fertilizerUsage === undefined) {
    errors.fertilizerUsage = 'Fertilizer usage is required.';
  } else if (isNaN(Number(data.fertilizerUsage))) {
    errors.fertilizerUsage = 'Fertilizer usage must be a valid number.';
  } else if (Number(data.fertilizerUsage) < 0) {
    errors.fertilizerUsage = 'Fertilizer usage cannot be negative.';
  }

  // Cultivated Area
  if (data.cultivatedArea === '' || data.cultivatedArea === null || data.cultivatedArea === undefined) {
    errors.cultivatedArea = 'Cultivated area is required.';
  } else if (isNaN(Number(data.cultivatedArea))) {
    errors.cultivatedArea = 'Cultivated area must be a valid number.';
  } else if (Number(data.cultivatedArea) <= 0) {
    errors.cultivatedArea = 'Cultivated area must be greater than 0.';
  }

  // Irrigation - must be explicitly set (true or false)
  if (data.irrigation === null || data.irrigation === undefined || data.irrigation === '') {
    errors.irrigation = 'Please select an irrigation option.';
  }

  return errors;
}
