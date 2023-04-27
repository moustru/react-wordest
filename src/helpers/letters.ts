/**
 * @exports
 * Тасование букв в слове согласно алгоритму Фишера-Йетса
 *
 * @param word Входное слово
 * @returns Массив тасованных букв слова
 */
export function shuffleLetters(word: string) {
  const wordArray = word.split("");

  let m = wordArray.length;
  let t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = wordArray[m];
    wordArray[m] = wordArray[i];
    wordArray[i] = t;
  }

  return wordArray;
}
