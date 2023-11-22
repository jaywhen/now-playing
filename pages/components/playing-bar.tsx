export default function PlayingBar() {
  return (
    <div className="flex items-center">
      <div className="playing-bar animate-playing bar-left"></div>
      <div className="playing-bar animate-playing bar-mid"></div>
      <div className="playing-bar animate-playing bar-right"></div>
    </div>
  );
}
