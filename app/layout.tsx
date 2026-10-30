import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NASA Geo-Predict | Earth Parameter Predictive Intelligence Dashboard",
  description:
    "Predictive intelligence dashboard based on NASA October 2026 real-time statistics, modeling 2-year parameter trajectories (CO2, Sea Level, Temperature) with ensemble machine learning.",
  keywords: [
    "NASA",
    "Climate Change",
    "Earth Vital Signs",
    "Predictive Dashboard",
    "Carbon Dioxide",
    "Sea Level Rise",
    "Machine Learning",
    "Vercel",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-cyan-500 selection:text-space-950 font-sans">
        {children}
      </body>
    </html>
  );
}

