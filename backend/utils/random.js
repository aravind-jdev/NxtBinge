// 🎲 Get a random item from an array
export const getRandomItem = (arr) => {
  if (!arr || arr.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};