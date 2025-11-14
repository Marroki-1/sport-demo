// -------------------------------------------------------------
// UTILISATEURS (pour les autres onglets : profil, dashboard…)
// -------------------------------------------------------------
export const users = [
  {
    id: 1,
    name: "Sophie Martin",
    age: 29,
    activity: "Running",
    level: "Intermédiaire",
    weeklyDistance: 23,
    city: "Paris",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Karim Benali",
    age: 34,
    activity: "Marche",
    level: "Débutant",
    weeklyDistance: 8,
    city: "Lyon",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "Lina Dupont",
    age: 26,
    activity: "Randonnée",
    level: "Expert",
    weeklyDistance: 41,
    city: "Marseille",
    avatar: "https://i.pravatar.cc/150?img=12"
  }
];

// -------------------------------------------------------------
// COMMUNAUTÉS (utilisé dans l’onglet Communautés)
// -------------------------------------------------------------
export const communities = [
  {
    id: 1,
    name: "Runners Paris Centre",
    members: 233,
    activity: "Running",
    rules: ["Respect", "Ponctualité", "Bonne humeur"],
    chat: [
      { user: "Alex", message: "On fait un 10km samedi ?" },
      { user: "Sophie", message: "Oui je suis chaude !" },
      { user: "Julien", message: "Je ramène de l’eau !" }
    ]
  },
  {
    id: 2,
    name: "Randonneurs Montagne",
    members: 142,
    activity: "Randonnée",
    rules: ["Sécurité", "Respect de la nature"],
    chat: [
      { user: "Lina", message: "Qui veut faire une rando dimanche ?" },
      { user: "Marc", message: "Moi !" }
    ]
  }
];

// -------------------------------------------------------------
// ÉVÉNEMENTS
// -------------------------------------------------------------
export const events = [
  {
    id: 1,
    title: "Running 5km - Paris",
    date: "2025-01-15",
    hour: "18:00",
    participants: 12,
    activity: "Running"
  },
  {
    id: 2,
    title: "Randonnée Mont-Blanc",
    date: "2025-01-18",
    hour: "09:00",
    participants: 5,
    activity: "Randonnée"
  }
];

// -------------------------------------------------------------
// DÉFIS
// -------------------------------------------------------------
export const challenges = [
  {
    id: 1,
    title: "Atteindre 20 km cette semaine",
    progress: 65
  },
  {
    id: 2,
    title: "Participer à 3 événements ce mois-ci",
    progress: 33
  }
];

// -------------------------------------------------------------
// BADGES
// -------------------------------------------------------------
export const badges = [
  {
    id: 1,
    title: "Débutant 🥉",
    earned: true
  },
  {
    id: 2,
    title: "Intermédiaire 🥈",
    earned: false
  },
  {
    id: 3,
    title: "Expert 🥇",
    earned: false
  }
];
