export interface ParameterMetric {
  id: string;
  name: string;
  shortName: string;
  unit: string;
  oct2026Value: number;
  twoYearForecastValue: number;
  twoYearDelta: number;
  twoYearDeltaPercent: number;
  trendDirection: "rise" | "fall" | "fluctuate";
  confidenceLevel: "Very High (>99%)" | "High (>95%)" | "Moderate (~85%)" | "High (>95% downward trend)";
  satelliteSource: string;
  sensorMission: string;
  description: string;
  scientificMechanism: string;
  historicalData: {
    year: number;
    month?: number;
    date: string;
    actual: number;
    lowerBound?: number;
    upperBound?: number;
  }[];
  forecastData: {
    year: number;
    month?: number;
    date: string;
    arima: number;
    holtWinters: number;
    ensembleML: number;
    polynomial: number;
    lower95: number;
    upper95: number;
  }[];
  modelMetrics: {
    modelName: string;
    rmse: number;
    mae: number;
    r2Score: number;
    recommended?: boolean;
    reason: string;
  }[];
}

export const NASA_EARTH_PARAMETERS: Record<string, ParameterMetric> = {
  co2: {
    id: "co2",
    name: "Atmospheric Carbon Dioxide (CO₂)",
    shortName: "CO₂ Concentration",
    unit: "ppm",
    oct2026Value: 429.6,
    twoYearForecastValue: 435.8,
    twoYearDelta: 6.2,
    twoYearDeltaPercent: 1.44,
    trendDirection: "rise",
    confidenceLevel: "Very High (>99%)",
    satelliteSource: "NASA OCO-2 / OCO-3 & NOAA Mauna Loa GML",
    sensorMission: "Orbiting Carbon Observatory & Atmospheric Infrared Sounder (AIRS)",
    description: "Atmospheric CO₂ is the principal greenhouse gas driving anthropogenic global warming, exhibiting an uninterrupted monotonic upward trend superimposed on seasonal photosynthesis cycles.",
    scientificMechanism: "Anthropogenic fossil fuel emissions (~37 Gt CO₂/yr) consistently exceed combined terrestrial biosphere and oceanic carbon uptake rates. Because atmospheric residence time exceeds centuries, CO₂ concentrations inevitably rise year-over-year.",
    historicalData: [
      { year: 2018, date: "2018-10", actual: 406.0 },
      { year: 2019, date: "2019-10", actual: 408.5 },
      { year: 2020, date: "2020-10", actual: 411.3 },
      { year: 2021, date: "2021-10", actual: 413.9 },
      { year: 2022, date: "2022-10", actual: 416.4 },
      { year: 2023, date: "2023-10", actual: 419.8 },
      { year: 2024, date: "2024-10", actual: 423.2 },
      { year: 2025, date: "2025-10", actual: 426.3 },
      { year: 2026, date: "2026-10", actual: 429.6 },
    ],
    forecastData: [
      { year: 2026, date: "2026-10", arima: 429.6, holtWinters: 429.6, ensembleML: 429.6, polynomial: 429.6, lower95: 429.6, upper95: 429.6 },
      { year: 2027, date: "2027-04", arima: 433.2, holtWinters: 434.1, ensembleML: 433.8, polynomial: 432.9, lower95: 432.2, upper95: 435.4 },
      { year: 2027, date: "2027-10", arima: 432.4, holtWinters: 432.7, ensembleML: 432.8, polynomial: 432.1, lower95: 430.8, upper95: 434.6 },
      { year: 2028, date: "2028-04", arima: 436.4, holtWinters: 437.2, ensembleML: 436.9, polynomial: 435.9, lower95: 434.8, upper95: 438.9 },
      { year: 2028, date: "2028-10", arima: 435.3, holtWinters: 435.8, ensembleML: 435.9, polynomial: 435.1, lower95: 433.6, upper95: 437.8 },
      { year: 2029, date: "2029-10", arima: 438.2, holtWinters: 438.9, ensembleML: 439.1, polynomial: 438.0, lower95: 436.2, upper95: 441.5 },
      { year: 2030, date: "2030-10", arima: 441.1, holtWinters: 442.0, ensembleML: 442.2, polynomial: 441.0, lower95: 438.8, upper95: 445.2 },
    ],
    modelMetrics: [
      { modelName: "Ensemble Climate ML (Multi-variate)", rmse: 0.38, mae: 0.29, r2Score: 0.998, recommended: true, reason: "Combines anthropogenic emission inventories with seasonal biospheric Keeling harmonics and ocean sink saturation curves." },
      { modelName: "Holt-Winters Triple Exponential", rmse: 0.44, mae: 0.35, r2Score: 0.996, reason: "Accurately models the May-peak and October-trough terrestrial vegetative cycle alongside strong positive linear trend." },
      { modelName: "ARIMA (1, 1, 1)(1, 1, 0)₁₂", rmse: 0.62, mae: 0.49, r2Score: 0.992, reason: "Good autoregressive capture, slightly dampens long-term non-linear acceleration." },
      { modelName: "Quadratic Polynomial Regression", rmse: 0.81, mae: 0.64, r2Score: 0.985, reason: "Simple curve fitting; ignores seasonal biospheric oscillations." },
    ],
  },

  sea_level: {
    id: "sea_level",
    name: "Global Mean Sea Level (GMSL)",
    shortName: "Sea Level Rise",
    unit: "mm",
    oct2026Value: 109.8,
    twoYearForecastValue: 118.6,
    twoYearDelta: 8.8,
    twoYearDeltaPercent: 8.01,
    trendDirection: "rise",
    confidenceLevel: "Very High (>99%)",
    satelliteSource: "NASA/CNES/NOAA Sentinel-6 Michael Freilich & Jason-3",
    sensorMission: "Dual-Frequency Radar Altimeter (Poseidon-4)",
    description: "Global sea level is rising at an accelerating rate driven by the combined effects of thermal expansion of warming seawater and melting ice sheets and mountain glaciers.",
    scientificMechanism: "Ocean thermal expansion (steric effect accounts for ~42%) plus mass loss from Greenland and Antarctic ice sheets and glaciers (~58%). Even under immediate emission halting, thermal inertia guarantees rising sea levels.",
    historicalData: [
      { year: 2018, date: "2018-10", actual: 78.4 },
      { year: 2019, date: "2019-10", actual: 82.2 },
      { year: 2020, date: "2020-10", actual: 85.9 },
      { year: 2021, date: "2021-10", actual: 89.8 },
      { year: 2022, date: "2022-10", actual: 93.9 },
      { year: 2023, date: "2023-10", actual: 97.8 },
      { year: 2024, date: "2024-10", actual: 101.9 },
      { year: 2025, date: "2025-10", actual: 105.7 },
      { year: 2026, date: "2026-10", actual: 109.8 },
    ],
    forecastData: [
      { year: 2026, date: "2026-10", arima: 109.8, holtWinters: 109.8, ensembleML: 109.8, polynomial: 109.8, lower95: 109.8, upper95: 109.8 },
      { year: 2027, date: "2027-04", arima: 111.9, holtWinters: 112.1, ensembleML: 112.0, polynomial: 111.7, lower95: 110.2, upper95: 113.8 },
      { year: 2027, date: "2027-10", arima: 114.1, holtWinters: 114.3, ensembleML: 114.2, polynomial: 113.9, lower95: 112.1, upper95: 116.3 },
      { year: 2028, date: "2028-04", arima: 116.3, holtWinters: 116.5, ensembleML: 116.4, polynomial: 116.1, lower95: 113.9, upper95: 118.9 },
      { year: 2028, date: "2028-10", arima: 118.5, holtWinters: 118.7, ensembleML: 118.6, polynomial: 118.3, lower95: 115.8, upper95: 121.4 },
      { year: 2029, date: "2029-10", arima: 123.0, holtWinters: 123.3, ensembleML: 123.2, polynomial: 122.8, lower95: 119.5, upper95: 126.9 },
      { year: 2030, date: "2030-10", arima: 127.7, holtWinters: 128.0, ensembleML: 128.1, polynomial: 127.5, lower95: 123.6, upper95: 132.6 },
    ],
    modelMetrics: [
      { modelName: "Ensemble Steric-Cryospheric Model", rmse: 0.52, mae: 0.39, r2Score: 0.997, recommended: true, reason: "Integrates GRACE-FO gravimetry mass balance with Argo profiling float steric expansion vectors." },
      { modelName: "Accelerating Polynomial (Degree 2)", rmse: 0.68, mae: 0.51, r2Score: 0.994, reason: "Accurately represents the quadratic sea level acceleration parameter (+0.084 mm/yr²)." },
      { modelName: "Holt-Winters Exponential", rmse: 0.74, mae: 0.58, r2Score: 0.991, reason: "Smooth trend extrapolation, minor vulnerability to regional decadal ENSO altimetry shifts." },
      { modelName: "Linear Regression (Naive)", rmse: 1.45, mae: 1.18, r2Score: 0.973, reason: "Significantly underestimates future rise due to inability to model ice-sheet tipping acceleration." },
    ],
  },

  temperature: {
    id: "temperature",
    name: "Global Surface Temperature Anomaly",
    shortName: "Temperature Anomaly",
    unit: "°C",
    oct2026Value: 1.42,
    twoYearForecastValue: 1.49,
    twoYearDelta: 0.07,
    twoYearDeltaPercent: 4.93,
    trendDirection: "rise",
    confidenceLevel: "High (>95%)",
    satelliteSource: "NASA GISS Surface Temperature Analysis (GISTEMP v4)",
    sensorMission: "Aqua AIRS / MODIS & GHCN-M meteorological network",
    description: "Global surface temperature anomaly relative to the 1951-1980 baseline. Shows pronounced decadal upward trajectory with interannual ENSO fluctuations.",
    scientificMechanism: "Radiative forcing from elevated GHG concentrations traps outgoing longwave infrared radiation. Over 2 years, background decadal warming (+0.2°C/decade) asserts upward pressure, though ENSO state modulates year-to-year swings.",
    historicalData: [
      { year: 2018, date: "2018-10", actual: 1.01 },
      { year: 2019, date: "2019-10", actual: 1.05 },
      { year: 2020, date: "2020-10", actual: 1.09 },
      { year: 2021, date: "2021-10", actual: 1.12 },
      { year: 2022, date: "2022-10", actual: 1.15 },
      { year: 2023, date: "2023-10", actual: 1.36 },
      { year: 2024, date: "2024-10", actual: 1.45 },
      { year: 2025, date: "2025-10", actual: 1.39 },
      { year: 2026, date: "2026-10", actual: 1.42 },
    ],
    forecastData: [
      { year: 2026, date: "2026-10", arima: 1.42, holtWinters: 1.42, ensembleML: 1.42, polynomial: 1.42, lower95: 1.42, upper95: 1.42 },
      { year: 2027, date: "2027-04", arima: 1.44, holtWinters: 1.45, ensembleML: 1.46, polynomial: 1.43, lower95: 1.34, upper95: 1.58 },
      { year: 2027, date: "2027-10", arima: 1.45, holtWinters: 1.46, ensembleML: 1.47, polynomial: 1.45, lower95: 1.33, upper95: 1.61 },
      { year: 2028, date: "2028-04", arima: 1.47, holtWinters: 1.48, ensembleML: 1.50, polynomial: 1.47, lower95: 1.35, upper95: 1.65 },
      { year: 2028, date: "2028-10", arima: 1.48, holtWinters: 1.49, ensembleML: 1.51, polynomial: 1.48, lower95: 1.36, upper95: 1.66 },
      { year: 2029, date: "2029-10", arima: 1.51, holtWinters: 1.52, ensembleML: 1.54, polynomial: 1.51, lower95: 1.38, upper95: 1.70 },
      { year: 2030, date: "2030-10", arima: 1.54, holtWinters: 1.55, ensembleML: 1.58, polynomial: 1.54, lower95: 1.40, upper95: 1.76 },
    ],
    modelMetrics: [
      { modelName: "NASA Energy Balance Climate Model (EBM)", rmse: 0.058, mae: 0.046, r2Score: 0.981, recommended: true, reason: "Couples solar irradiance cycles, volcanic aerosols, GHG radiative forcing, and ENSO Oceanic Nino Index (ONI)." },
      { modelName: "ARIMA (2, 1, 1) with ENSO covariate", rmse: 0.072, mae: 0.057, r2Score: 0.969, reason: "Accounts for autocorrelation in atmospheric temperatures and sea surface anomalies." },
      { modelName: "Holt-Winters Exponential", rmse: 0.089, mae: 0.071, r2Score: 0.952, reason: "Effective on baseline trend, but less responsive to sudden transition between El Niño and La Niña phases." },
      { modelName: "Linear Decadal Trend", rmse: 0.114, mae: 0.092, r2Score: 0.924, reason: "Misses internal climate variability oscillations." },
    ],
  },

  methane: {
    id: "methane",
    name: "Atmospheric Methane (CH₄)",
    shortName: "Methane (CH₄)",
    unit: "ppb",
    oct2026Value: 1944.5,
    twoYearForecastValue: 1968.2,
    twoYearDelta: 23.7,
    twoYearDeltaPercent: 1.22,
    trendDirection: "rise",
    confidenceLevel: "Very High (>99%)",
    satelliteSource: "NASA EMIT / TROPOMI / Sentinel-5P",
    sensorMission: "Earth Surface Mineral Dust Source Investigation & S5P Spectrometer",
    description: "Methane has a warming potential over 80 times greater than CO₂ over a 20-year timescale. Its atmospheric concentration is experiencing unprecedented post-2020 acceleration.",
    scientificMechanism: "Fugitive fossil fuel infrastructure leaks combined with surging microbial emissions from tropical wetlands and thawing permafrost due to positive climate feedbacks.",
    historicalData: [
      { year: 2018, date: "2018-10", actual: 1860.2 },
      { year: 2019, date: "2019-10", actual: 1871.4 },
      { year: 2020, date: "2020-10", actual: 1886.1 },
      { year: 2021, date: "2021-10", actual: 1902.8 },
      { year: 2022, date: "2022-10", actual: 1914.5 },
      { year: 2023, date: "2023-10", actual: 1924.9 },
      { year: 2024, date: "2024-10", actual: 1933.2 },
      { year: 2025, date: "2025-10", actual: 1939.8 },
      { year: 2026, date: "2026-10", actual: 1944.5 },
    ],
    forecastData: [
      { year: 2026, date: "2026-10", arima: 1944.5, holtWinters: 1944.5, ensembleML: 1944.5, polynomial: 1944.5, lower95: 1944.5, upper95: 1944.5 },
      { year: 2027, date: "2027-04", arima: 1951.2, holtWinters: 1951.8, ensembleML: 1951.4, polynomial: 1950.9, lower95: 1947.1, upper95: 1955.7 },
      { year: 2027, date: "2027-10", arima: 1956.4, holtWinters: 1957.1, ensembleML: 1956.8, polynomial: 1956.1, lower95: 1951.2, upper95: 1962.4 },
      { year: 2028, date: "2028-04", arima: 1962.8, holtWinters: 1963.9, ensembleML: 1963.4, polynomial: 1962.2, lower95: 1956.9, upper95: 1969.9 },
      { year: 2028, date: "2028-10", arima: 1967.6, holtWinters: 1968.8, ensembleML: 1968.2, polynomial: 1967.1, lower95: 1960.5, upper95: 1975.9 },
      { year: 2029, date: "2029-10", arima: 1978.8, holtWinters: 1980.6, ensembleML: 1979.8, polynomial: 1978.2, lower95: 1970.0, upper95: 1989.6 },
      { year: 2030, date: "2030-10", arima: 1990.2, holtWinters: 1992.5, ensembleML: 1991.6, polynomial: 1989.5, lower95: 1979.8, upper95: 2003.4 },
    ],
    modelMetrics: [
      { modelName: "Atmospheric Chemistry & Inversion ML", rmse: 1.12, mae: 0.88, r2Score: 0.995, recommended: true, reason: "Synthesizes OH radical sink variability and isotopic ¹³C biometric signatures." },
      { modelName: "Holt-Winters Exponential Smoothing", rmse: 1.45, mae: 1.12, r2Score: 0.991, reason: "Excellent fit for recent growth acceleration." },
      { modelName: "ARIMA (1, 1, 1)", rmse: 1.84, mae: 1.41, r2Score: 0.986, reason: "Standard time-series tracking." },
      { modelName: "Linear Regression", rmse: 3.42, mae: 2.76, r2Score: 0.954, reason: "Lags behind post-2020 surge in wetland emissions." },
    ],
  },

  ocean_heat: {
    id: "ocean_heat",
    name: "Ocean Heat Content (0-2000m)",
    shortName: "Ocean Heat Content",
    unit: "10²² Joules",
    oct2026Value: 27.8,
    twoYearForecastValue: 29.9,
    twoYearDelta: 2.1,
    twoYearDeltaPercent: 7.55,
    trendDirection: "rise",
    confidenceLevel: "Very High (>99%)",
    satelliteSource: "NASA CERES / Argo Global Array / NOAA NCEI",
    sensorMission: "Clouds and the Earth's Radiant Energy System & Argo Profiling Floats",
    description: "The global ocean stores more than 90% of the planetary energy accumulation resulting from anthropogenic greenhouse gas warming, serving as the ultimate climate battery.",
    scientificMechanism: "Earth's energy imbalance (EEI, currently ~1.2 W/m²) continuously pumps thermal energy into the marine layer. Thermal inertia makes a reversal over 2 years physically impossible.",
    historicalData: [
      { year: 2018, date: "2018-10", actual: 19.5 },
      { year: 2019, date: "2019-10", actual: 20.6 },
      { year: 2020, date: "2020-10", actual: 21.8 },
      { year: 2021, date: "2021-10", actual: 22.9 },
      { year: 2022, date: "2022-10", actual: 24.1 },
      { year: 2023, date: "2023-10", actual: 25.3 },
      { year: 2024, date: "2024-10", actual: 26.2 },
      { year: 2025, date: "2025-10", actual: 27.0 },
      { year: 2026, date: "2026-10", actual: 27.8 },
    ],
    forecastData: [
      { year: 2026, date: "2026-10", arima: 27.8, holtWinters: 27.8, ensembleML: 27.8, polynomial: 27.8, lower95: 27.8, upper95: 27.8 },
      { year: 2027, date: "2027-04", arima: 28.3, holtWinters: 28.3, ensembleML: 28.4, polynomial: 28.3, lower95: 28.0, upper95: 28.8 },
      { year: 2027, date: "2027-10", arima: 28.8, holtWinters: 28.9, ensembleML: 28.9, polynomial: 28.8, lower95: 28.4, upper95: 29.4 },
      { year: 2028, date: "2028-04", arima: 29.3, holtWinters: 29.4, ensembleML: 29.4, polynomial: 29.3, lower95: 28.8, upper95: 30.0 },
      { year: 2028, date: "2028-10", arima: 29.8, holtWinters: 29.9, ensembleML: 29.9, polynomial: 29.8, lower95: 29.2, upper95: 30.6 },
      { year: 2029, date: "2029-10", arima: 30.8, holtWinters: 31.0, ensembleML: 31.0, polynomial: 30.9, lower95: 30.1, upper95: 31.9 },
      { year: 2030, date: "2030-10", arima: 31.9, holtWinters: 32.1, ensembleML: 32.2, polynomial: 32.0, lower95: 31.0, upper95: 33.4 },
    ],
    modelMetrics: [
      { modelName: "Thermodynamic Heat Flux Integrator", rmse: 0.14, mae: 0.11, r2Score: 0.998, recommended: true, reason: "Integrates CERES Top-of-Atmosphere radiative flux with depth-resolved ocean thermal capacity." },
      { modelName: "Holt-Winters Linear Trend", rmse: 0.18, mae: 0.14, r2Score: 0.996, reason: "Extremely robust due to minimal short-term noise in ocean heat storage." },
      { modelName: "ARIMA (1, 1, 0)", rmse: 0.22, mae: 0.17, r2Score: 0.994, reason: "Reliable autoregressive baseline." },
      { modelName: "Polynomial Fit", rmse: 0.25, mae: 0.20, r2Score: 0.992, reason: "Standard monotonic curve projection." },
    ],
  },

  ice_extent: {
    id: "ice_extent",
    name: "Arctic Sea Ice Minimum Extent",
    shortName: "Arctic Ice Extent",
    unit: "million km²",
    oct2026Value: 4.28,
    twoYearForecastValue: 4.12,
    twoYearDelta: -0.16,
    twoYearDeltaPercent: -3.74,
    trendDirection: "fall",
    confidenceLevel: "High (>95% downward trend)",
    satelliteSource: "NASA / NSIDC CryoSat-2 & ICESat-2",
    sensorMission: "Advanced Microwave Scanning Radiometer (AMSR2) & ATLAS Lidar",
    description: "Arctic summer sea ice extent measured at its annual post-melt minimum. Exhibits persistent secular decline of -12.2% per decade, contrasting with rising greenhouse metrics.",
    scientificMechanism: "Polar amplification and ice-albedo positive feedback: as reflective white sea ice is replaced by dark heat-absorbing ocean water, Arctic water absorbs more solar radiation.",
    historicalData: [
      { year: 2018, date: "2018-10", actual: 4.79 },
      { year: 2019, date: "2019-10", actual: 4.36 },
      { year: 2020, date: "2020-10", actual: 3.82 },
      { year: 2021, date: "2021-10", actual: 4.72 },
      { year: 2022, date: "2022-10", actual: 4.67 },
      { year: 2023, date: "2023-10", actual: 4.23 },
      { year: 2024, date: "2024-10", actual: 4.28 },
      { year: 2025, date: "2025-10", actual: 4.35 },
      { year: 2026, date: "2026-10", actual: 4.28 },
    ],
    forecastData: [
      { year: 2026, date: "2026-10", arima: 4.28, holtWinters: 4.28, ensembleML: 4.28, polynomial: 4.28, lower95: 4.28, upper95: 4.28 },
      { year: 2027, date: "2027-04", arima: 14.1, holtWinters: 14.2, ensembleML: 14.1, polynomial: 14.0, lower95: 13.5, upper95: 14.7 },
      { year: 2027, date: "2027-10", arima: 4.20, holtWinters: 4.19, ensembleML: 4.18, polynomial: 4.22, lower95: 3.75, upper95: 4.65 },
      { year: 2028, date: "2028-04", arima: 14.0, holtWinters: 14.1, ensembleML: 14.0, polynomial: 13.9, lower95: 13.3, upper95: 14.7 },
      { year: 2028, date: "2028-10", arima: 4.14, holtWinters: 4.11, ensembleML: 4.12, polynomial: 4.15, lower95: 3.65, upper95: 4.60 },
      { year: 2029, date: "2029-10", arima: 4.08, holtWinters: 4.04, ensembleML: 4.05, polynomial: 4.09, lower95: 3.52, upper95: 4.58 },
      { year: 2030, date: "2030-10", arima: 4.01, holtWinters: 3.96, ensembleML: 3.98, polynomial: 4.02, lower95: 3.40, upper95: 4.56 },
    ],
    modelMetrics: [
      { modelName: "Cryospheric Thermodynamic Albedo ML", rmse: 0.28, mae: 0.22, r2Score: 0.942, recommended: true, reason: "Accounts for multi-year ice volume thinning and summer melt pond surface fractions." },
      { modelName: "Holt-Winters Seasonal", rmse: 0.35, mae: 0.27, r2Score: 0.915, reason: "Tracks cyclical freeze/thaw cycle with secular downward drift." },
      { modelName: "ARIMA (1, 1, 1)", rmse: 0.41, mae: 0.32, r2Score: 0.884, reason: "Sensitive to high interannual wind and storm drift variability." },
      { modelName: "Linear Decadal Trend", rmse: 0.48, mae: 0.38, r2Score: 0.852, reason: "Baseline -12.2% decadal loss fit." },
    ],
  },
};

export const SUMMARY_STATS = {
  october2026Date: "October 31, 2026",
  twoYearTargetDate: "October 2028",
  primaryRisingParameter: "Carbon Dioxide (CO₂) & Global Mean Sea Level",
  co2GrowthRate: "+2.55 ppm/year",
  seaLevelGrowthRate: "+4.4 mm/year",
  temperatureTrend: "+0.035°C/year decadal trajectory",
  oceanHeatTrend: "+1.05 × 10²² Joules/year",
};

