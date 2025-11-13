import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Correction des icônes Leaflet
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

// Données fictives : utilisateurs en activité
const fakeUsers = [
  {
    id: 1,
    name: "Sophie",
    activity: "Running",
    lat: 48.8566,
    lng: 2.3522
  },
  {
    id: 2,
    name: "Karim",
    activity: "Marche",
    lat: 48.8606,
    lng: 2.3376
  },
  {
    id: 3,
    name: "Lina",
    activity: "Randonnée",
    lat: 48.853,
    lng: 2.3499
  }
];

// Icônes custom selon activité
const icons = {
  Running: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/55/55348.png",
    iconSize: [35, 35],
  }),
  Marche: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/7837/7837810.png",
    iconSize: [35, 35],
  }),
  Randonnée: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
    iconSize: [35, 35],
  }),
};

function MapPage() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h2 style={{ padding: "10px" }}>Carte des activités</h2>

      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={13}
        style={{ height: "80%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {fakeUsers.map((user) => (
          <Marker
            key={user.id}
            position={[user.lat, user.lng]}
            icon={icons[user.activity]}
          >
            <Popup>
              <b>{user.name}</b><br />
              Activité : {user.activity}<br />
              <button style={{
                marginTop: "10px",
                padding: "5px 10px",
                background: "#111",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer"
              }}>
                Rejoindre
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapPage;
