import { users } from "../data/fakeData";

function Profile() {
  const currentUser = users[0]; // On utilise Sophie comme utilisateur connecté

  return (
    <div style={{ padding: "20px", paddingBottom: "80px" }}>
      <h2>Profil</h2>

      {/* Carte Profil */}
      <div
        style={{
          background: "#f4f4f4",
          padding: "15px",
          borderRadius: "10px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src={currentUser.avatar}
          alt="avatar"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <div>
          <h3 style={{ margin: "0" }}>{currentUser.name}</h3>
          <p style={{ margin: "5px 0" }}>
            Activité principale : <b>{currentUser.activity}</b>
            <br />
            Niveau : <b>{currentUser.level}</b>
            <br />
            Ville : <b>{currentUser.city}</b>
          </p>
        </div>
      </div>

      {/* Abonnement */}
      <div
        style={{
          background: "#e9f7ff",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h3>Abonnement</h3>
        <p style={{ margin: 0 }}>
          Statut : <b>Premium (démo)</b>
        </p>
        <p style={{ margin: "5px 0 0 0" }}>
          Renouvellement : <b>13/11/2026</b>
        </p>
      </div>

      {/* Paramètres */}
      <div
        style={{
          background: "#fff3cd",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h3>Paramètres</h3>
        <ul>
          <li>Modifier profil</li>
          <li>Langue</li>
          <li>Confidentialité</li>
          <li>Notifications</li>
          <li>Support</li>
        </ul>
      </div>

      {/* Bouton déconnexion */}
      <button
        style={{
          width: "100%",
          padding: "15px",
          background: "crimson",
          color: "white",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Se déconnecter
      </button>
    </div>
  );
}

export default Profile;
