import { events } from "../data/fakeData";

function Events() {
  const today = new Date();

  // Séparation des événements
  const upcoming = events.filter(
    (e) => new Date(e.date) > today
  );
  const past = events.filter(
    (e) => new Date(e.date) < today
  );
  const ongoing = []; // On pourra remplir plus tard

  return (
    <div style={{ padding: "20px", paddingBottom: "80px" }}>
      <h2>Événements</h2>

      {/* En cours */}
      <h3 style={{ marginTop: "20px" }}>🔥 En cours</h3>
      {ongoing.length === 0 && (
        <p style={{ color: "#888" }}>Aucun événement en cours.</p>
      )}

      {/* À venir */}
      <h3 style={{ marginTop: "20px" }}>📅 À venir</h3>
      {upcoming.map((event) => (
        <div
          key={event.id}
          style={{
            background: "#e9f7ff",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px"
          }}
        >
          <h4 style={{ margin: 0 }}>{event.title}</h4>
          <p style={{ margin: "5px 0" }}>
            Date : <b>{event.date}</b> — {event.hour}
          </p>
          <p style={{ margin: "5px 0" }}>
            Participants : {event.participants}
          </p>

          <button
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "10px",
              background: "#111",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Rejoindre
          </button>
        </div>
      ))}

      {/* Passés */}
      <h3 style={{ marginTop: "20px" }}>⏳ Passés</h3>
      {past.map((event) => (
        <div
          key={event.id}
          style={{
            background: "#f4f4f4",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px"
          }}
        >
          <h4 style={{ margin: 0 }}>{event.title}</h4>
          <p style={{ margin: "5px 0" }}>
            Date : <b>{event.date}</b> — {event.hour}
          </p>
          <p style={{ margin: "5px 0" }}>
            Participants : {event.participants}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Events;
