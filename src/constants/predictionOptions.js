export const CROP_TYPES = [
  'Arecanut', 'Arhar/Tur', 'Castor seed', 'Coconut', 'Cotton(lint)',
  'Dry chillies', 'Gram', 'Jute', 'Linseed', 'Maize', 'Mesta',
  'Niger seed', 'Onion', 'Other Rabi pulses', 'Potato', 'Rapeseed &Mustard',
  'Rice', 'Sesamum', 'Small millets', 'Sugarcane', 'Sweet potato', 'Tapioca',
  'Tobacco', 'Turmeric', 'Wheat', 'Bajra', 'Black pepper', 'Cardamom',
  'Coriander', 'Garlic', 'Ginger', 'Groundnut', 'Horse-gram', 'Jowar',
  'Ragi', 'Cashewnut', 'Banana', 'Soyabean', 'Barley', 'Khesari', 'Masoor',
  'Moong(Green Gram)', 'Other Kharif pulses', 'Safflower', 'Sannhamp',
  'Sunflower', 'Urad', 'Peas & beans (Pulses)', 'other oilseeds',
  'Other Cereals', 'Cowpea(Lobia)', 'Oilseeds total', 'Guar seed',
  'Other Summer Pulses', 'Moth',
];

export const SEASONS = ['Whole Year', 'Kharif', 'Rabi', 'Autumn', 'Summer', 'Winter'];

export const STATES = [
  'Assam', 'Karnataka', 'Kerala', 'Meghalaya', 'West Bengal', 'Puducherry',
  'Goa', 'Andhra Pradesh', 'Tamil Nadu', 'Odisha', 'Bihar', 'Gujarat',
  'Madhya Pradesh', 'Maharashtra', 'Mizoram', 'Punjab', 'Uttar Pradesh',
  'Haryana', 'Himachal Pradesh', 'Tripura', 'Nagaland', 'Chhattisgarh',
  'Uttarakhand', 'Jharkhand', 'Delhi', 'Manipur', 'Jammu and Kashmir',
  'Telangana', 'Arunachal Pradesh', 'Sikkim',
];

export const CROP_YEARS = Array.from({ length: 24 }, (_, index) => 1997 + index);

export const FIELD_RANGES = {
  area: { min: 0.5, max: 50808100 },
  annualRainfall: { min: 301.3, max: 6552.7 },
  fertilizer: { min: 54.17, max: 4835407000 },
  pesticide: { min: 0.09, max: 15750510 },
};
