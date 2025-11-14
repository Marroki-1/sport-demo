import { useState } from "react";
import { challenges, badges, xpStats as initialXP } from "../data/fakeChallenges";
import "./DefisBadges.css";
import { applyXP, updateStreak, calculateHabitXP } from "../engine/xpEngine";

function DefisBadges() {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [xp, setXp] = useState(initialXP);

  // HABITS
  const [habits, setHabits] = useState([
    { id: 1, name: "Boire 3L d’eau", week: [false, false, false, false, false, false, false] },
    { id: 2, name: "Ne pas dépasser 2500 kcal", week: [false, false, false, false, false, false, false] },
    { id: 3, name: "Faire un entraînement", week: [false, false, false, false, false, false, false] },
    { id: 4, name: "10 min de méditation", week: [false, false, false, false, false, false, false] },
    { id: 5, name: "Pas de grignotage", week: [false, false, false, false, false, false, false] },
  ]);

  const [dailyProgress, setDailyProgress] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [newHabit, setNewHabit] = useState("");

  const days = ["L", "M", "M", "J", "V", "S", "D"];

  // -----------------------------------
  // 🔥 HABITS → XP + GRAPH ENGINE
  // -----------------------------------
  function toggleHabit(habitId, dayIndex) {
    const updated = habits.map((h) =>
      h.id === habitId
        ? { ...h, week: h.week.map((d, i) => (i === dayIndex ? !d : d)) }
        : h
    );

    setHabits(updated);

    // % du jour
    const completed = updated.filter((h) => h.week[dayIndex]).length;
    const pct = completed / updated.length;

    const newDaily = [...dailyProgress];
    newDaily[dayIndex] = pct;
    setDailyProgress(newDaily);

    // XP gagné
    const habitXP = calculateHabitXP(updated);
    let newXP = applyXP(xp, habitXP);

    const todayDone = pct > 0;
    newXP = updateStreak(newXP, todayDone);

    setXp(newXP);
  }

  // -----------------------------------
  // ➕ Add Habit
  // -----------------------------------
  function addHabit() {
    if (!newHabit.trim()) return;
    setHabits([
      ...habits,
      { id: habits.length + 1, name: newHabit, week: [false, false, false, false, false, false, false] },
    ]);
    setNewHabit("");
  }

  // -----------------------------------
  // 🟣 Mini circle graph
  // -----------------------------------
  function MiniCircle({ pct }) {
    const deg = pct * 360;
    const color = pct === 1 ? "#10b981" : pct > 0 ? "#6366f1" : "#d1d5db";
    return (
      <div
        className="mini-circle"
        style={{ background: `conic-gradient(${color} ${deg}deg, #e5e7eb 0deg)` }}
      >
        <span className="mini-circle-label">{Math.round(pct * 100)}%</span>
      </div>
    );
  }

  return (
    <div className="defis-page">

      {/* HEADER */}
      <header className="defis-header glass-card">
        <h1>Défis & Badges</h1>
        <p>Progresse chaque jour et débloque des récompenses 🔥</p>

        <div className="xp-box">
          <div className="xp-level">
            <span>Niveau</span>
            <h2>{xp.level}</h2>
          </div>

          <div className="xp-progress">
            <div className="xp-bar">
              <div
                className="xp-fill"
                style={{ width: `${(xp.xp / xp.xpToNext) * 100}%` }}
              ></div>
            </div>
            <small>
              {xp.xp} / {xp.xpToNext} XP
            </small>
          </div>

          <div className="xp-streak">
            🔥 Série : <b>{xp.streak} jours</b>
          </div>
        </div>
      </header>

      {/* CHALLENGES */}
      <section className="challenges-section">
        <h2>Défis en cours</h2>

        <div className="challenges-grid">
          {challenges.map((c) => (
            <div key={c.id} className="challenge-card glass-card">
              <div className="challenge-header">
                <span className="challenge-icon">{c.icon}</span>
                <h3>{c.title}</h3>
              </div>
              <p className="difficulty">{c.difficulty}</p>

              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${c.progress}%` }}></div>
              </div>

              <p className="progress-values">
                {c.current} / {c.goal}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BADGES */}
      <section className="badges-section">
        <h2>Badges</h2>

        <div className="badges-grid">
          {badges.map((b) => (
            <div key={b.id} className={`badge-card glass-card ${b.earned ? "earned" : "locked"}`}>
              <span className="badge-icon">{b.icon}</span>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>

              <button className="unlock-btn" onClick={() => setSelectedBadge(b)}>
                Voir comment débloquer
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* BADGE POPUP */}
      {selectedBadge && (
        <div className="badge-popup">
          <div className="badge-popup-content glass-card">
            <h2>{selectedBadge.title}</h2>

            <p>
              <b>Conditions :</b><br />
              🎯 Compléter {selectedBadge.id * 5} défis<br />
              🔥 Participer à {selectedBadge.id} événements<br />
              👥 Rejoindre {selectedBadge.id + 1} communautés
            </p>

            <p>
              XP gagné : <b>{selectedBadge.id * 150} XP</b>
            </p>

            <button className="popup-close-btn" onClick={() => setSelectedBadge(null)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* ---------------------- */}
      {/* HABIT TRACKER */}
      {/* ---------------------- */}
      <section className="habits-section">
        <h2>Suivi d’habitudes</h2>

        <div className="habits-table glass-card">
          <div className="table-header">
            <span>Habitude</span>
            {days.map((d, i) => (
              <span key={i}><MiniCircle pct={dailyProgress[i]} /></span>
            ))}
          </div>

          {habits.map((h) => (
            <div key={h.id} className="table-row">
              <span className="habit-name">{h.name}</span>

              {h.week.map((checked, i) => (
                <span
                  key={i}
                  className={`habit-check2 ${checked ? "checked" : ""}`}
                  onClick={() => toggleHabit(h.id, i)}
                >
                  {checked ? "✓" : ""}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* ADD HABIT */}
        <div className="add-habit glass-card">
          <input
            type="text"
            placeholder="Nouvelle habitude..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <button onClick={addHabit}>Ajouter</button>
        </div>
      </section>

      {/* ---------------------------------- */}
      {/* CLASSEMENT DES UTILISATEURS */}
      {/* ---------------------------------- */}
      <section className="leaderboard-section">
        <h2>Classement des utilisateurs — Brest</h2>

        <div className="leaderboard-container glass-card">
          {[
            { id:1, name:"Sophie Martin", city:"Brest", level:12, xp:4200, badges:8, challenges:34, avatar:"https://i.pravatar.cc/150?img=1" },
            { id:2, name:"Karim Benali", city:"Brest", level:11, xp:3950, badges:7, challenges:29, avatar:"https://i.pravatar.cc/150?img=5" },
            { id:3, name:"Lina Dupont", city:"Brest", level:10, xp:3600, badges:6, challenges:25, avatar:"https://i.pravatar.cc/150?img=12" },
            { id:4, name:"Omar L.", city:"Brest", level:10, xp:3550, badges:5, challenges:23, avatar:"https://i.pravatar.cc/150?img=33" },
            { id:5, name:"Julie T.", city:"Brest", level:9, xp:3300, badges:5, challenges:22, avatar:"https://i.pravatar.cc/150?img=49" },
            { id:6, name:"Maxime V.", city:"Brest", level:9, xp:3250, badges:4, challenges:20, avatar:"https://i.pravatar.cc/150?img=21" },
            { id:7, name:"Nadia A.", city:"Brest", level:8, xp:2980, badges:4, challenges:18, avatar:"https://i.pravatar.cc/150?img=44" },
            { id:8, name:"Tom R.", city:"Brest", level:8, xp:2890, badges:3, challenges:17, avatar:"https://i.pravatar.cc/150?img=14" },
            { id:9, name:"Lucas M.", city:"Brest", level:7, xp:2600, badges:3, challenges:14, avatar:"https://i.pravatar.cc/150?img=10" },
            { id:10, name:"Maya K.", city:"Brest", level:7, xp:2450, badges:2, challenges:13, avatar:"https://i.pravatar.cc/150?img=31" },
          ].map((u, index) => (
            <div className="leaderboard-row2" key={u.id}>
              
              <span className={`rank-badge rank-${index + 1}`}>
                {index + 1}
              </span>

              <img className="lb-avatar" src={u.avatar} alt="" />

              <div className="lb-info">
                <strong>{u.name}</strong>
                <small>Niveau {u.level} — {u.xp} XP</small>
              </div>

              <div className="lb-stats">
                <span>🏅 {u.badges}</span>
                <span>🔥 {u.challenges}</span>
              </div>

              <div className="lb-progress">
                <div
                  className="lb-fill"
                  style={{ width: `${(u.xp % 1000) / 10}%` }}
                ></div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default DefisBadges;
