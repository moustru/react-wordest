import type { LetterType } from "@/types/Word";
import "./Letter.css";

type LetterProps = LetterType & {
  letterClick: (letter: LetterType) => void;
};

export default function Letter(props: LetterProps) {
  const { literal, id, bgClass, letterClick } = props;

  return (
    <div
      className={`letter ${bgClass ?? "letter--default"}`}
      onClick={() => letterClick({ literal, id })}
    >
      {literal}
    </div>
  );
}
