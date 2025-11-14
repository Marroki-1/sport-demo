import { useState } from "react";
import { groups } from "../data/fakeCommunities";
import { fakeUsers } from "../data/fakeUsers";
import "./Communities.css";

function Communities() {
  const [friends, setFriends] = useState([]);
  const [activeChat, setActiveChat] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  function addFriend(user) {
    if (!friends.find((f) => f.id === user.id)) {
      setFriends((prev) => [...prev, user]);
    }
  }

  return (
    <div className="communities-page">

      {/* SIDEBAR AMIS */}
      <aside className="friends-sidebar">
        <h3>Mes amis</h3>

        {friends.length === 0 && (
          <p className="empty-friends">Aucun ami ajouté.</p>
        )}

        {friends.map((f) => (
          <div key={f.id} className="friend-item">
            <img src={f.avatar} alt="" />
            <span>{f.name}</span>
          </div>
        ))}
      </aside>

      {/* CONTENU PRINCIPAL */}
      <div className="communities-content">

        {/* TITRE */}
        <h1 className="title">Communautés</h1>

        {/* CARROUSEL GROUPES */}
        <div className="groups-carousel-section">
          <h2 className="section-title">Groupes recommandés</h2>

          <div className="groups-carousel">
            {groups.map((g) => (
              <div
                key={g.id}
                className="group-card"
                onClick={() => setSelectedGroup(g)}
              >
                <img src={g.img} alt="" className="group-img" />

                <div className="group-info">
                  <h3>{g.name}</h3>
                  <p className="activity">
                    🏷️ {g.activity} • 👥 {g.members} membres
                  </p>

                  <div className="tags">
                    {g.tags.map((t, i) => (
                      <span key={i} className="tag">{t}</span>
                    ))}
                  </div>

                  <p className="preview-chat">💬 {g.previewChat}</p>

                  <button className="join-group-btn">Rejoindre</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUGGESTIONS MEMBRES — CARROUSEL */}
        <div className="carousel-block">
          <h2 className="section-title">Suggestions de membres</h2>

          <div className="carousel">
            {fakeUsers.slice(0, 12).map((u) => (
              <div className="carousel-user" key={u.id}>
                <img src={u.avatar} alt="" />
                <p>{u.name}</p>
                <small>{u.activity}</small>

                <button onClick={() => addFriend(u)}>Ajouter</button>
              </div>
            ))}
          </div>
        </div>

        {/* LEADERBOARD */}
        <div className="leaderboard-block">
          <h2 className="section-title">Leaderboard</h2>

          <div className="leaderboard">
            {fakeUsers.slice(0, 15).map((u, i) => (
              <div className="leaderboard-row" key={u.id}>
                <span className="rank">{i + 1}</span>
                <img src={u.avatar} alt="" />
                <span className="name">{u.name}</span>
                <span className="activity">{u.activity}</span>

                <b className="score">{u.score} pts</b>

                <button className="add-btn" onClick={() => addFriend(u)}>
                  +
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CHAT FLOATING BUTTON */}
      <button className="chat-fab" onClick={() => setActiveChat(!activeChat)}>
        💬
      </button>

      {/* CHATBOX */}
      {activeChat && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>Chat Communauté</h3>
            <button onClick={() => setActiveChat(false)}>✖</button>
          </div>

          <div className="chatbox-messages">
            {selectedGroup ? (
              selectedGroup.chat.map((m, i) => (
                <div key={i} className="chat-msg">
                  <b>{m.user}: </b> {m.message}
                </div>
              ))
            ) : (
              <p className="empty-chat">
                Sélectionne un groupe pour voir le chat 💬
              </p>
            )}
          </div>

          <input
            className="chatbox-input"
            placeholder="Écrire un message..."
          />
        </div>
      )}
    </div>
  );
}

export default Communities;
