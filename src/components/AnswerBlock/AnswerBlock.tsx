import Letter from "../Letter/Letter";
import { useAppSelector } from "@/store/hooks";
import "./AnswerBlock.css";

export default function AnswerBlock() {
  const answer = useAppSelector((state) => state.answerState.answer);

  return (
    <div className="answer-block">
      {answer.map((letter, i) => (
        <Letter
          {...letter}
          bgClass="letter--success"
          key={i}
          letterClick={(l) => console.log(l)}
        />
      ))}
    </div>
  );
}
