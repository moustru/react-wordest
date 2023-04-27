import type { LetterType } from "@/types/Word";
import Letter from "../Letter/Letter";
import "./AnswerBlock.css";

type AnswerBlockProps = {
  answer: LetterType[];
};

export default function AnswerBlock(props: AnswerBlockProps) {
  const { answer } = props;

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
