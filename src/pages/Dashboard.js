import { users, challenges, badges, events } from "../data/fakeData";

function Dashboard() {
  const currentUser = users[0]; // On affiche Sophie comme utilisateur connecté
  const nextEvent = events[0];  // Prochain événement

  return (
    <div style={{ padding: "20px", paddingBottom: "80px" }}>
      <h2>Dashboard</h2>

      {/* Profil utilisateur */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        marginBottom: "20px",
        background: "#f4f4f4",
        padding: "15px",
        borderRadius: "10px"
      }}>
        <img 
          src={currentUser.avatar} 
          alt="avatar" 
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
        <div>
          <h3 style={{ margin: 0 }}>{currentUser.name}</h3>
          <p style={{ margin: 0 }}>
            Activité : {currentUser.activity} <br/>
            Niveau : {currentUser.level}
          </p>
        </div>
      </div>

      {/* Statistiques */}
      <div style={{
        background: "#e9f5ff",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <h3>Statistiques de la semaine</h3>
        <p>Distance parcourue : <b>{currentUser.weeklyDistance} km</b></p>
      </div>

      {/* Défis en cours */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Défis en cours</h3>
        {challenges.map((c) => (
          <div key={c.id} style={{
            background: "#f2f2f2",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px"
          }}>
            <p><b>{c.title}</b></p>
            <div style={{
              height: "10px",
              background: "#ddd",
              borderRadius: "5px"
            }}>
              <div style={{
                width: `${c.progress}%`,
                height: "100%",
                background: "#4CAF50",
                borderRadius: "5px"
              }}></div>
            </div>
            <p style={{ fontSize: "12px" }}>{c.progress}% complété</p>
          </div>
        ))}
      </div>

      {/* Prochain événement */}
      <div style={{
        background: "#fff3cd",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <h3>Prochain événement</h3>
        <p><b>{nextEvent.title}</b></p>
        <p>Date : {nextEvent.date} — {nextEvent.hour}</p>
        <p>Participants : {nextEvent.participants}</p>
      </div>

      {/* Badges */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Badges</h3>
        {badges.filter(b => b.earned).map((b) => (
          <p key={b.id}>🏅 {b.title}</p>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
