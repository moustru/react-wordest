import type { WordObject } from "./Word";

export interface StorageObject {
  question: number;
  letter: number;
  words: WordObject[];
}

export type QuestionStep = 1 | -1;