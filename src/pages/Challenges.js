import { challenges, badges } from "../data/fakeData";

function Challenges() {
  return (
    <div style={{ padding: "20px", paddingBottom: "80px" }}>
      <h2>Défis & Badges</h2>

      {/* Défis en cours */}
      <h3 style={{ marginTop: "20px" }}>🔥 Défis en cours</h3>
      {challenges.map((challenge) => (
        <div
          key={challenge.id}
          style={{
            background: "#f4f4f4",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <p style={{ margin: "0 0 5px 0" }}>
            <b>{challenge.title}</b>
          </p>

          {/* Barre de progression */}
          <div
            style={{
              height: "10px",
              background: "#ddd",
              borderRadius: "5px",
              marginTop: "5px",
            }}
          >
            <div
              style={{
                width: `${challenge.progress}%`,
                height: "100%",
                background: "#4CAF50",
                borderRadius: "5px",
              }}
            ></div>
          </div>

          <p style={{ fontSize: "12px", marginTop: "5px" }}>
            {challenge.progress}% complété
          </p>
        </div>
      ))}

      {/* Badges */}
      <h3 style={{ marginTop: "20px" }}>🏅 Badges</h3>

      {badges.map((badge) => (
        <div
          key={badge.id}
          style={{
            background: badge.earned ? "#d4ffd6" : "#eee",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "10px",
            opacity: badge.earned ? 1 : 0.5,
          }}
        >
          {badge.earned ? "🏅 " : "🔒 "}
          {badge.title}
        </div>
      ))}
    </div>
  );
}

export default Challenges;
