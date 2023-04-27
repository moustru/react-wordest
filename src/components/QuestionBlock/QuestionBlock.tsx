import "./QuestionBlock.css";

type QuestionBlockProps = {
  currentWord: number;
};

export default function QuestionBlock(props: QuestionBlockProps) {
  const { currentWord } = props;

  return <div className="question-block">Question {currentWord + 1} of 6</div>;
}
