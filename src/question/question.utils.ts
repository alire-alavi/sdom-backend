export function getRandomElements<T>(array: T[], count: number): T[] {
  if (count > array.length) {
    throw new Error('Count cannot be greater than the array length');
  }

  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled.slice(0, count);
}
