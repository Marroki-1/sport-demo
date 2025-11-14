import { useState } from "react";
import "./Events.css";
import { events as eventsData } from "../data/fakeEvents";

function Events() {
  const [selectedActivity, setSelectedActivity] = useState("Tous");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const activities = ["Tous", "Running", "Marche", "Randonnée"];

  // Filtre
  const filteredEvents =
    selectedActivity === "Tous"
      ? eventsData
      : eventsData.filter((e) => e.activity === selectedActivity);

  return (
    <div className="events-page">

      {/* HEADER */}
      <header className="events-header glass-card">
        <h1>Événements</h1>
        <p>Participe aux activités autour de toi 📅🔥</p>

        {/* FILTERS */}
        <div className="event-filters">
          {activities.map((act) => (
            <button
              key={act}
              className={`filter-btn ${
                selectedActivity === act ? "active" : ""
              }`}
              onClick={() => setSelectedActivity(act)}
            >
              {act}
            </button>
          ))}
        </div>
      </header>

      {/* MINI CALENDRIER */}
      <section className="calendar-section glass-card">
        <h2>Calendrier</h2>

        <div className="calendar-grid">
          {Array.from({ length: 30 }).map((_, i) => {
            const day = i + 1;
            const hasEvent = eventsData.some((e) => e.day === day);

            return (
              <div
                key={day}
                className={`calendar-day ${hasEvent ? "event-day" : ""}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </section>

      {/* ÉVÉNEMENTS À VENIR */}
      <section className="events-list-section">
        <h2>À venir</h2>

        <div className="events-list">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="event-card glass-card"
              onClick={() => setSelectedEvent(event)}
            >
              <img src={event.image} alt="" className="event-img" />

              <div className="event-info">
                <h3>{event.title}</h3>
                <p>
                  📍 {event.location} • 🕒 {event.time}
                </p>
                <span className="event-tag">{event.activity}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POPUP EVENT */}
      {selectedEvent && (
        <div className="event-popup">
          <div className="event-popup-content glass-card">
            <img
              src={selectedEvent.image}
              className="popup-img"
              alt=""
            />

            <h2>{selectedEvent.title}</h2>
            <p className="popup-sub">
              📍 {selectedEvent.location} • 🕒 {selectedEvent.time}
            </p>

            <p>
              <b>Organisé par :</b> {selectedEvent.organizer}
            </p>
            <p>
              <b>Participants :</b> {selectedEvent.participants}
            </p>

            <button className="join-btn">
              S’inscrire à l’événement
            </button>

            <button
              className="popup-close"
              onClick={() => setSelectedEvent(null)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
