import React from 'react';

/**
 * InputSummary — displays the field values used for the prediction.
 */
export function InputSummary({ formData }) {
  const rows = [
    { key: 'Crop',             value: formData.crop },
    { key: 'Crop Year',        value: formData.cropYear },
    { key: 'Season',           value: formData.season },
    { key: 'State',            value: formData.state },
    { key: 'Area',             value: formData.area },
    { key: 'Annual Rainfall',  value: `${formData.annualRainfall} mm` },
    { key: 'Fertilizer',       value: formData.fertilizer },
    { key: 'Pesticide',        value: formData.pesticide },
  ];

  return (
    <div className="summary-card" aria-label="Prediction input summary">
      <div className="summary-header">
        <h3>Prediction Summary</h3>
      </div>
      <div className="summary-grid">
        {rows.map(({ key, value }) => (
          <div key={key} className="summary-row">
            <span className="summary-key">{key}</span>
            <span className="summary-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
