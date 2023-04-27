import type { WordObject } from "@/types/Word";
import { nanoid } from "nanoid";
import { shuffleLetters } from "./letters";
import WORDS from "@/data/words";

/**
 * @exports
 * Функция набора случайных слов из БД
 *
 * @returns Массив набранных слов
 */
export function setWordsArray(): WordObject[] {
  const wordArray: WordObject[] = [];

  while (wordArray.length < 6) {
    const relatedIndex = Math.round(Math.random() * (WORDS.length - 1));

    if (
      !wordArray
        .map((wordObject) => wordObject.literal)
        .includes(WORDS[relatedIndex])
    ) {
      wordArray.push({
        id: nanoid(),
        literal: WORDS[relatedIndex],
        shuffled: shuffleLetters(WORDS[relatedIndex]).map((letter) => ({
          literal: letter,
          id: nanoid(8),
          bgClass: "letter--default",
        })),
        currentLetter: 0,
        mistakes: 0,
        isFinished: false,
      });
    }
  }

  return wordArray;
}
