// Predictive Modeling & Statistical Computation Utilities

export interface ScenarioAdjustment {
  sspScenario: "ssp119" | "ssp126" | "ssp245" | "ssp370" | "ssp585";
  emissionModifierPercent: number; // e.g. -20% or +15%
  solarCycleModifier: number; // Solar cycle 25 sunspot index flux
  oceanAerosolDamping: number; // 0 to 1
}

export const SSP_SCENARIOS = {
  ssp126: {
    id: "ssp126",
    name: "SSP1-2.6: Sustainability & Net Zero (Paris 1.5°C Goal)",
    description: "Aggressive decarbonization, rapid transition to renewables, reaching global net-zero emissions around 2050.",
    co2Multiplier: 0.65,
    tempMultiplier: 0.70,
    seaLevelMultiplier: 0.88, // Sea level has high inertia, responds more slowly
    tagColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
  ssp245: {
    id: "ssp245",
    name: "SSP2-4.5: Middle of the Road (Current Policies Baseline)",
    description: "Current global energy pledges, moderate emission reductions starting late 2020s, emissions peak around 2030.",
    co2Multiplier: 1.0,
    tempMultiplier: 1.0,
    seaLevelMultiplier: 1.0,
    tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  },
  ssp585: {
    id: "ssp585",
    name: "SSP5-8.5: Fossil-Fueled Development (High Emissions)",
    description: "Intensive fossil fuel consumption, unconstrained growth, accelerated permafrost and wetland carbon release.",
    co2Multiplier: 1.45,
    tempMultiplier: 1.40,
    seaLevelMultiplier: 1.25,
    tagColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
  },
};

/**
 * Calculates Holt-Winters Triple Exponential Smoothing for seasonal time series
 * α = data smoothing factor, β = trend smoothing factor, γ = seasonal smoothing factor
 */
export function calculateHoltWintersForecast(
  series: number[],
  period = 2,
  horizon = 4,
  alpha = 0.6,
  beta = 0.2,
  gamma = 0.3
): number[] {
  if (series.length < period * 2) {
    // Fallback to linear extrapolation if series is too short
    const slope = (series[series.length - 1] - series[0]) / (series.length - 1);
    return Array.from({ length: horizon }, (_, i) => series[series.length - 1] + slope * (i + 1));
  }

  let level = series[0];
  let trend = (series[period] - series[0]) / period;
  const seasonals: number[] = [];

  for (let i = 0; i < period; i++) {
    seasonals.push(series[i] - level);
  }

  for (let i = 0; i < series.length; i++) {
    const val = series[i];
    const prevLevel = level;
    const seasonIdx = i % period;

    level = alpha * (val - seasonals[seasonIdx]) + (1 - alpha) * (prevLevel + trend);
    trend = beta * (level - prevLevel) + (1 - beta) * trend;
    seasonals[seasonIdx] = gamma * (val - level) + (1 - gamma) * seasonals[seasonIdx];
  }

  const forecast: number[] = [];
  for (let m = 1; m <= horizon; m++) {
    const seasonIdx = (series.length + m - 1) % period;
    const pred = level + m * trend + seasonals[seasonIdx];
    forecast.push(Number(pred.toFixed(2)));
  }

  return forecast;
}

/**
 * Calculate statistical accuracy metrics: RMSE, MAE, R²
 */
export function computeAccuracyMetrics(actuals: number[], predictions: number[]) {
  const n = Math.min(actuals.length, predictions.length);
  if (n === 0) return { rmse: 0, mae: 0, r2: 0 };

  let sumSquaredError = 0;
  let sumAbsoluteError = 0;
  let sumActual = 0;

  for (let i = 0; i < n; i++) {
    const err = actuals[i] - predictions[i];
    sumSquaredError += err * err;
    sumAbsoluteError += Math.abs(err);
    sumActual += actuals[i];
  }

  const meanActual = sumActual / n;
  let totalSumOfSquares = 0;

  for (let i = 0; i < n; i++) {
    totalSumOfSquares += Math.pow(actuals[i] - meanActual, 2);
  }

  const rmse = Math.sqrt(sumSquaredError / n);
  const mae = sumAbsoluteError / n;
  const r2 = totalSumOfSquares > 0 ? 1 - sumSquaredError / totalSumOfSquares : 1;

  return {
    rmse: Number(rmse.toFixed(3)),
    mae: Number(mae.toFixed(3)),
    r2: Number(r2.toFixed(3)),
  };
}

