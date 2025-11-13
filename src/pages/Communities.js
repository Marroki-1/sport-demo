import { communities } from "../data/fakeData";

function Communities() {
  return (
    <div style={{ padding: "20px", paddingBottom: "80px" }}>
      <h2>Communautés</h2>

      {communities.map((community) => (
        <div
          key={community.id}
          style={{
            background: "#f4f4f4",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          {/* Titre et infos */}
          <h3 style={{ marginBottom: "5px" }}>{community.name}</h3>
          <p style={{ margin: "0 0 10px 0" }}>
            Activité : <b>{community.activity}</b> <br />
            Membres : <b>{community.members}</b>
          </p>

          {/* Règles */}
          <div style={{ marginBottom: "10px" }}>
            <h4 style={{ margin: "10px 0 5px 0" }}>Règles :</h4>
            <ul>
              {community.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>

          {/* Chat */}
          <div
            style={{
              background: "#fff",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <h4 style={{ marginBottom: "10px" }}>Chat</h4>
            {community.chat.map((msg, index) => (
              <div key={index} style={{ marginBottom: "8px" }}>
                <b>{msg.user} :</b> {msg.message}
              </div>
            ))}
          </div>

          {/* Bouton rejoindre */}
          <button
            style={{
              width: "100%",
              padding: "12px",
              background: "#111",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Rejoindre la communauté
          </button>
        </div>
      ))}
    </div>
  );
}

export default Communities;
