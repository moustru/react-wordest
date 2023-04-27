export type LetterType = {
  literal: string;
  id: string;
  bgClass?: string;
}

export type WordObject = {
  id: string;
  literal: string;
  shuffled: LetterType[];
  currentLetter: number;
  mistakes: number;
  isFinished: boolean;
};
