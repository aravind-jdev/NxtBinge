export const getRandomPage = () => {
  return Math.floor(Math.random() * 500) + 1;
};

export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};