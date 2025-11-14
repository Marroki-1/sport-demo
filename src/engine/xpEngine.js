// xpEngine.js — moteur XP global

export function applyXP(xpStats, amount) {
  let updated = { ...xpStats };
  updated.xp += amount;

  // Gestion du level up
  while (updated.xp >= updated.xpToNext) {
    updated.xp -= updated.xpToNext;
    updated.level += 1;
    updated.xpToNext = Math.floor(updated.xpToNext * 1.25); // progression
  }

  return updated;
}

// Séries (habit streak)
export function updateStreak(xpStats, didCompleteHabits) {
  let updated = { ...xpStats };

  if (didCompleteHabits) {
    updated.streak += 1;
  } else {
    updated.streak = 0;
  }

  return updated;
}

// Gagner des XP selon habitudes daily
export function calculateHabitXP(habits) {
  const total = habits.length;
  const completed = habits.filter((h) => h.done).length;
  const ratio = completed / total;

  // XP basé sur la complétion du jour
  return Math.round(50 * ratio); // ex: 50 XP max/jour
}
