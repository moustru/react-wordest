import { useAppSelector } from "@/store/hooks";
import "./MistakesBlock.css";
import { selectCurrentWordObject } from "@/store/slices/wordsSlice";

export default function MistakesBlock() {
  const currentWordMistakes = useAppSelector(
    (state) => selectCurrentWordObject(state.wordsState).mistakes
  );

  return <div className="mistakes__block">Mistakes: {currentWordMistakes}</div>;
}
