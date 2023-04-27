import "./MistakesBlock.css";

type MistakesBlockProps = {
  mistakesCount: number;
};

export default function MistakesBlock(props: MistakesBlockProps) {
  const { mistakesCount } = props;

  return <div className="mistakes-block">Mistakes: {mistakesCount}</div>;
}
