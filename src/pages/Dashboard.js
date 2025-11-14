import { useState, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid
} from "recharts";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import AppLogo from "../components/AppLogo";

import "./Dashboard.css";

/* ----------------------------------------------------- */
/* ACTIVITÉS */
/* ----------------------------------------------------- */
const activities = [
  { id: "Running", icon: "🏃‍♂️" },
  { id: "Marche", icon: "🚶‍♂️" },
  { id: "Randonnée", icon: "🥾" },
];

/* ----------------------------------------------------- */
/* DONNÉES FAKE PAR ACTIVITÉ */
/* ----------------------------------------------------- */
const weeklyDataSet = {
  Running: [
    { day: "Lun", distance: 4 },
    { day: "Mar", distance: 6 },
    { day: "Mer", distance: 3 },
    { day: "Jeu", distance: 7 },
    { day: "Ven", distance: 2 },
    { day: "Sam", distance: 10 },
    { day: "Dim", distance: 6 },
  ],
  Marche: [
    { day: "Lun", distance: 2 },
    { day: "Mar", distance: 3 },
    { day: "Mer", distance: 1 },
    { day: "Jeu", distance: 4 },
    { day: "Ven", distance: 2 },
    { day: "Sam", distance: 5 },
    { day: "Dim", distance: 2 },
  ],
  Randonnée: [
    { day: "Lun", distance: 0 },
    { day: "Mar", distance: 5 },
    { day: "Mer", distance: 0 },
    { day: "Jeu", distance: 12 },
    { day: "Ven", distance: 0 },
    { day: "Sam", distance: 18 },
    { day: "Dim", distance: 9 },
  ],
};

const monthlyDataSet = {
  Running: [
    { week: "S1", km: 18 },
    { week: "S2", km: 22 },
    { week: "S3", km: 15 },
    { week: "S4", km: 25 },
  ],
  Marche: [
    { week: "S1", km: 6 },
    { week: "S2", km: 9 },
    { week: "S3", km: 4 },
    { week: "S4", km: 8 },
  ],
  Randonnée: [
    { week: "S1", km: 12 },
    { week: "S2", km: 4 },
    { week: "S3", km: 20 },
    { week: "S4", km: 15 },
  ],
};

const statsByActivity = {
  Running: { distance: 62, speed: 9.3, heart: 150, intensity: 82 },
  Marche: { distance: 28, speed: 4.7, heart: 105, intensity: 55 },
  Randonnée: { distance: 54, speed: 5.8, heart: 135, intensity: 70 },
};

/* ----------------------------------------------------- */
/* HEATMAP — COMPATIBLE REACT 19 */
/* ----------------------------------------------------- */
function HeatmapLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const heatPts = points.map((p) => [p.lat, p.lng, p.intensity]);

    const heat = window.L.heatLayer(heatPts, {
      radius: 28,
      blur: 18,
      maxZoom: 17,
      gradient: {
        0.4: "rgba(255,80,60,0.3)",
        0.65: "rgba(255,40,40,0.7)",
        1.0: "rgba(255,0,0,1)"
      }
    });

    heat.addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
}

/* ----------------------------------------------------- */
/* HEATMAP POINTS */
/* ----------------------------------------------------- */
const heatmapPoints = Array.from({ length: 60 }).map(() => ({
  lat: 48.85 + Math.random() * 0.06,
  lng: 2.29 + Math.random() * 0.06,
  intensity: Math.random() * 0.7 + 0.3,
}));

/* ----------------------------------------------------- */
/* DASHBOARD COMPONENT */
/* ----------------------------------------------------- */
function Dashboard() {
  const [activity, setActivity] = useState("Running");

  const weeklyData = weeklyDataSet[activity];
  const monthlyData = monthlyDataSet[activity];
  const stats = statsByActivity[activity];

  return (
    <div className="dashboard-page">

{/* LOGO EN HAUT À DROITE */}
      <AppLogo />

      {/* HEADER */}
      <header className="dash-header">
        <h1>Tableau de bord — Rayane</h1>
        <p>Suivi de vos performances — {activity}</p>

        {/* ACTIVITÉ TABS */}
        <div className="activity-tabs">
          {activities.map((act) => (
            <button
              key={act.id}
              className={`activity-tab ${activity === act.id ? "active" : ""}`}
              onClick={() => setActivity(act.id)}
            >
              {act.icon} {act.id}
            </button>
          ))}
        </div>
      </header>

      {/* GRID */}
      <div className="dash-grid">

        {/* WEEKLY */}
        <div className="dash-card">
          <h3>Activité hebdomadaire</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="distance" fill="url(#gradVioletBlue)" radius={[8, 8, 8, 8]} />
              <defs>
                <linearGradient id="gradVioletBlue" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* MONTHLY */}
        <div className="dash-card">
          <h3>Progression mensuelle</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyData}>
              <CartesianGrid stroke="#f0f0f0" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="km"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, stroke: "#a855f7", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* STATS */}
        <div className="dash-card stats-card">
          <h3>Statistiques détaillées</h3>

          <div className="stats-list">
            <div className="stat-item">
              <span>Distance totale</span>
              <b>{stats.distance} km</b>
            </div>
            <div className="stat-item">
              <span>Vitesse moyenne</span>
              <b>{stats.speed} km/h</b>
            </div>
            <div className="stat-item">
              <span>Fréquence cardiaque</span>
              <b>{stats.heart} bpm</b>
            </div>
            <div className="stat-item">
              <span>Intensité</span>
              <b>{stats.intensity}%</b>
            </div>
          </div>
        </div>

        {/* OBJECTIFS */}
        <div className="dash-card goals-card">
          <h3>Objectifs</h3>

          <div className="goal">
            <p>Objectif hebdo : <b>40 km</b></p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(stats.distance / 40) * 100}%` }}></div>
            </div>
          </div>

          <div className="goal">
            <p>Objectif mensuel : <b>120 km</b></p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(stats.distance / 120) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* HEATMAP */}
        <div className="dash-card heatmap-card">
          <h3>Zones fréquentées</h3>

          <div className="heatmap-map-wrapper">
            <MapContainer
              center={[48.8566, 2.3522]}
              zoom={13}
              className="heatmap-map"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <HeatmapLayer points={heatmapPoints} />
            </MapContainer>
          </div>
        </div>

        {/* EVENTS */}
        <div className="dash-card">
          <h3>Événements à venir</h3>

          <ul className="events-list">
            <li><b>🏃 10km Paris</b> — Dimanche 9h00</li>
            <li><b>🥾 Rando Versailles</b> — Samedi 14h</li>
            <li><b>🚶 Marche solidaire</b> — 18 Février</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <button
        className="dash-map-btn"
        onClick={() => (window.location.href = "/map")}
      >
        Voir la carte
      </button>
    </div>
  );
}

export default Dashboard;
