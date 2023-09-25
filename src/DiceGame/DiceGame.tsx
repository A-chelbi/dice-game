import { useState } from "react";
import Dice from "./components/Dice/Dice";
import Intro from "./components/Intro/Intro";

const DiceGame: React.FC = (): JSX.Element => {
  const [startGame, setStartGame] = useState(false);

  return <>{startGame ? <Dice /> : <Intro setStartGame={setStartGame} />}</>;
};

export default DiceGame;
