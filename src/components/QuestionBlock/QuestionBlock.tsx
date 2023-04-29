import "./QuestionBlock.css";
import { useAppSelector } from "@/store/hooks";

export default function QuestionBlock() {
  const currentWordNumber = useAppSelector(
    (state) => state.wordsState.currentWordNumber
  );

  return (
    <div className="question__block">Question {currentWordNumber + 1} of 6</div>
  );
}
