// --------------------------------------------------------------
// XP SYSTEME
// --------------------------------------------------------------

export const xpStats = {
  level: 12,
  xp: 340,
  xpToNext: 500,
  streak: 7, // jours d'affilée
};


// --------------------------------------------------------------
// DÉFIS (Challenges)
// --------------------------------------------------------------

export const challenges = [
  {
    id: 1,
    title: "Courir 20 km cette semaine",
    icon: "🏃‍♂️",
    difficulty: "Intermédiaire",
    goal: 20,
    current: 12,
    progress: (12 / 20) * 100,
    rewardXP: 120,
  },
  {
    id: 2,
    title: "3 entraînements en groupe",
    icon: "👥",
    difficulty: "Facile",
    goal: 3,
    current: 1,
    progress: (1 / 3) * 100,
    rewardXP: 80,
  },
  {
    id: 3,
    title: "Participer à 1 événement",
    icon: "📅",
    difficulty: "Facile",
    goal: 1,
    current: 0,
    progress: 0,
    rewardXP: 100,
  },
  {
    id: 4,
    title: "Atteindre 300 minutes d’activité",
    icon: "🔥",
    difficulty: "Difficile",
    goal: 300,
    current: 180,
    progress: (180 / 300) * 100,
    rewardXP: 200,
  },
];


// --------------------------------------------------------------
// BADGES
// --------------------------------------------------------------

export const badges = [
  {
    id: 1,
    title: "Débutant 🥉",
    desc: "Pour les premiers pas dans l'app",
    icon: "🥉",
    earned: true,
    conditions: {
      challengesCompleted: 1,
      eventsParticipated: 0,
      communitiesJoined: 1,
    },
    xpReward: 150,
  },

  {
    id: 2,
    title: "Intermédiaire 🥈",
    desc: "Continue sur ta lancée !",
    icon: "🥈",
    earned: false,
    conditions: {
      challengesCompleted: 5,
      eventsParticipated: 2,
      communitiesJoined: 2,
    },
    xpReward: 300,
  },

  {
    id: 3,
    title: "Expert 🥇",
    desc: "Niveau impressionnant !",
    icon: "🥇",
    earned: false,
    conditions: {
      challengesCompleted: 12,
      eventsParticipated: 4,
      communitiesJoined: 4,
    },
    xpReward: 500,
  },

  {
    id: 4,
    title: "Marathonien",
    desc: "Atteindre 42 km en une semaine",
    icon: "🏅",
    earned: false,
    conditions: {
      challengesCompleted: 8,
      eventsParticipated: 1,
      communitiesJoined: 2,
    },
    xpReward: 400,
  },

  {
    id: 5,
    title: "Sociable",
    desc: "Créer ou rejoindre plusieurs groupes",
    icon: "💬",
    earned: false,
    conditions: {
      challengesCompleted: 3,
      eventsParticipated: 0,
      communitiesJoined: 5,
    },
    xpReward: 250,
  },

  {
    id: 6,
    title: "Mental Warrior",
    desc: "Réaliser 50 séances de méditation",
    icon: "🧘‍♂️",
    earned: false,
    conditions: {
      challengesCompleted: 10,
      eventsParticipated: 3,
      communitiesJoined: 1,
    },
    xpReward: 350,
  },
];
