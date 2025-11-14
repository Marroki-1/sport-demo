import { useState } from "react";
import "./Profile.css";
import { xpStats } from "../data/fakeChallenges";

function Profile() {
  const [darkMode, setDarkMode] = useState(false);
  const [notif, setNotif] = useState(true);
  const [gps, setGps] = useState(true);

  return (
    <div className="profile-page">

      {/* HEADER */}
      <h1 className="profile-title">Mon Profil</h1>

      {/* PROFILE CARD */}
      <div className="profile-card glass-card">
        <img
          src="https://avatars.githubusercontent.com/u/133285228?v=4"
          className="profile-avatar"
          alt=""
        />
        <h2>Rayane Marsli</h2>
        <p className="profile-city">📍 Brest, France</p>

        <div className="profile-stats">
          <div>
            <strong>{xpStats.level}</strong>
            <span>Niveau</span>
          </div>

          <div>
            <strong>{xpStats.xp}</strong>
            <span>XP</span>
          </div>

          <div>
            <strong>8</strong>
            <span>Badges</span>
          </div>

          <div>
            <strong>34</strong>
            <span>Défis</span>
          </div>
        </div>
      </div>

      {/* SETTINGS */}
      <div className="settings-section">

        <h2>Paramètres</h2>

        <div className="setting glass-card">
          <span>Notifications</span>
          <input
            type="checkbox"
            checked={notif}
            onChange={() => setNotif(!notif)}
          />
        </div>

        <div className="setting glass-card">
          <span>Mode sombre</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        <div className="setting glass-card">
          <span>Localisation GPS</span>
          <input
            type="checkbox"
            checked={gps}
            onChange={() => setGps(!gps)}
          />
        </div>

        <div className="setting glass-card">
          <span>Changer mon email</span>
          <button className="setting-btn">Modifier</button>
        </div>

        <div className="setting glass-card">
          <span>Changer mon mot de passe</span>
          <button className="setting-btn">Modifier</button>
        </div>

      </div>

      {/* SECURITY */}
      <div className="security-section">
        <h2>Sécurité</h2>

        <div className="setting glass-card danger">
          <span>Supprimer mon compte</span>
          <button className="delete-btn">Supprimer</button>
        </div>
      </div>

      {/* LOGOUT BUTTON */}
      <button className="logout-btn">Déconnexion</button>
    </div>
  );
}

export default Profile;
