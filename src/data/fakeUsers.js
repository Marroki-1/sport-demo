export const fakeUsers = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  name: ["Sophie", "Karim", "Lina", "Nadia", "Alex", "Tom", "Maya", "Omar", "Ines", "Lucas"][i % 10],
  activity: ["Running", "Marche", "Randonnée"][i % 3],
  performance: (40 + Math.random() * 60).toFixed(1),
  score: Math.floor(Math.random() * 1000),
  level: Math.floor(Math.random() * 50),
  avatar: `https://i.pravatar.cc/150?img=${i + 4}`
}));
