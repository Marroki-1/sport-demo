import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./MapPage.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// --- LISTE DES ACTIVITÉS ---
const activitiesAvailable = [
  { id: "Running", icon: "🏃‍♂️" },
  { id: "Marche", icon: "🚶‍♂️" },
  { id: "Randonnée", icon: "🥾" },
];

// --- FAKE USERS ---
function generateFakeUsers() {
  const names = [
    "Sophie", "Karim", "Lina", "Nadia", "Alex",
    "Tom", "Maya", "Omar", "Ines", "Lucas",
    "Sarah", "Adam", "Noah", "Chloe", "Zara",
    "Ramy", "Nico", "Samy", "Emma", "Yanis"
  ];

  return Array.from({ length: 20 }).map((_, i) => {
    const activity = activitiesAvailable[Math.floor(Math.random() * 3)].id;
    const status = Math.random() > 0.5 ? "live" : "planned";

    return {
      id: i + 1,
      name: names[i],
      activity,
      status,
      lat: 48.85 + Math.random() * 0.07,
      lng: 2.30 + Math.random() * 0.07,
      distance: (3 + Math.random() * 12).toFixed(1),
      rating: (3 + Math.random() * 2).toFixed(1),
      speed: (7 + Math.random() * 5).toFixed(1),
      startTime: `${Math.floor(Math.random() * 23)}:${Math.floor(Math.random() * 59)
        .toString()
        .padStart(2, "0")}`,
      badges: Math.floor(Math.random() * 6),
      photo: `https://i.pravatar.cc/150?u=${i + 1}`,
    };
  });
}

const initialUsers = generateFakeUsers();

function MapPage() {
  const [selectedActivity, setSelectedActivity] = useState("Running");
  const [users] = useState(initialUsers);

  // --- SIDEBAR ---
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- GPS LOCALISATION ---
  const handleGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        alert(`Votre position : ${latitude}, ${longitude}`);
      });
    } else {
      alert("Géolocalisation non supportée par votre navigateur.");
    }
  };

  // --- MARQUEUR CUSTOM ---
  function createUserIcon(user) {
    const halo = user.status === "live" ? "halo-live" : "halo-planned";

    return L.divIcon({
      className: "",
      html: `
        <div class="marker-wrapper ${halo}">
          <div class="marker-photo" style="background-image:url('${user.photo}')"></div>
        </div>
      `,
      iconSize: [45, 45],
      iconAnchor: [22, 22],
    });
  }

  return (
    <div className="map-page">

      {/* HEADER */}
      <header className="premium-header">
        <h1>Activités autour de vous</h1>
        <p className="subtitle">
          Choisissez une activité, consultez la météo, connectez vos appareils.
        </p>

        {/* ACTIVITÉS SWITCH */}
        <div className="activity-tabs">
          {activitiesAvailable.map((act) => (
            <button
              key={act.id}
              className={`activity-tab ${selectedActivity === act.id ? "active" : ""}`}
              onClick={() => setSelectedActivity(act.id)}
            >
              <span className="tab-icon">{act.icon}</span>
              {act.id}
            </button>
          ))}
        </div>

        {/* INFO CARDS */}
        <div className="info-row">
          <div className="info-glass">🌤 12°C</div>
          <div className="info-glass">🎧 Casque OK</div>
          <div className="info-glass">⌚ Montre connectée</div>
          <div className="info-glass">🏆 12e</div>
        </div>
      </header>

      {/* MAP */}
      <div className="map-wrapper">
        <MapContainer
          center={[48.8566, 2.3522]}
          zoom={13}
          className="premium-map"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* --- BOUTONS FLOTTANTS --- */}
          <div className="floating-buttons">

            {/* FILTRE ACTIVITÉ */}
            <button className="float-btn" onClick={() => alert("Filtres activité bientôt")}>
              🎯
            </button>

            {/* MÉTÉO */}
            <button className="float-btn" onClick={() => alert("Météo en direct bientôt")}>
              ☀️
            </button>

            {/* EXPLORER UTILISATEURS */}
            <button className="float-btn" onClick={() => setSidebarOpen(true)}>
              👥
            </button>

            {/* GPS */}
            <button className="float-btn" onClick={handleGPS}>
              📍
            </button>
          </div>

          {/* MARKERS */}
          {users
            .filter((u) => u.activity === selectedActivity)
            .map((user) => (
              <Marker
                key={user.id}
                position={[user.lat, user.lng]}
                icon={createUserIcon(user)}
              >
                <Popup>
                  <div className="popup-container">
                    <img className="popup-photo" src={user.photo} alt={user.name} />
                    <h3>{user.name}</h3>

                    <p><b>Activité :</b> {user.activity}</p>

                    <p>
                      <b>Statut :</b>{" "}
                      {user.status === "live" ? (
                        <span className="live-text">🟥 En cours</span>
                      ) : (
                        <span className="planned-text">
                          🟩 Programmé ({user.startTime})
                        </span>
                      )}
                    </p>

                    <p><b>Distance :</b> {user.distance} km</p>
                    <p><b>Vitesse :</b> {user.speed} km/h</p>
                    <p><b>Note :</b> ⭐ {user.rating}/5</p>
                    <p><b>Badges :</b> 🏅 {user.badges}</p>

                    <button className="join-btn">Rejoindre</button>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>

      {/* SIDEBAR GAUCHE */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Utilisateurs proches</h3>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>✖</button>
        </div>

        <div className="sidebar-list">
          {users.map((u) => (
            <div key={u.id} className="sidebar-user">
              <img src={u.photo} alt={u.name} className="sidebar-avatar" />
              <div>
                <h4>{u.name}</h4>
                <p>{u.activity} • {u.distance} km</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOUTON FIXE BAS */}
      <button className="floating-start-btn">
        Lancer une activité
      </button>

    </div>
  );
}

export default MapPage;
