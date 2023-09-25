import GameSettings from "../GameSettings/GameSettings";

import DiceImage1 from "../../../images/dice1.svg";
import DiceImage2 from "../../../images/dice2.svg";
import DiceImage3 from "../../../images/dice3.svg";
import DiceImage4 from "../../../images/dice4.svg";
import DiceImage5 from "../../../images/dice5.svg";
import DiceImage6 from "../../../images/dice6.svg";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IFormInput, THistory } from "../../../types";
import DesignElementTopLeft from "../DesigneElements/DesignElementTopLeft";
import DesignElementBottom from "../DesigneElements/DesignElementBottom";
import History from "../History/History";
import WinnerModal from "../WinnerModal/WinnerModal";

const diceImages = [
  DiceImage1,
  DiceImage2,
  DiceImage3,
  DiceImage4,
  DiceImage5,
  DiceImage6,
];

const Dice: React.FC = (): JSX.Element => {
  const [userTurn, setUserTurn] = useState(1);
  const [score, setScore] = useState(0);

  const [round, setRound] = useState(1);
  const [currentTurn, setCurrentTurn] = useState(1);

  const [isDisabled, setIsDisabled] = useState(false);

  const [history, setHistory] = useState<THistory>([]);

  const [dice1, setDice1] = useState(diceImages[0]);
  const [dice2, setDice2] = useState(diceImages[1]);

  const [winnerModalOpen, setwinnerModalOpen] = useState(false);
  const [winners, setWinners] = useState<THistory>([]);

  const { register, watch } = useForm<IFormInput>({
    defaultValues: {
      numbOfUsers: 2,
      numbOfRounds: 3,
    },
  });

  const numbOfUsersValue = watch("numbOfUsers");
  const numbOfRoundsValue = watch("numbOfRounds");

  /* Dice roll logic */
  const handleRoll = () => {
    // Generate random number
    const firstRandomNum = Math.floor(Math.random() * 6);
    const secondRandomNum = Math.floor(Math.random() * 6);

    // Calculate score
    const currentScore = firstRandomNum + secondRandomNum + 2;

    // Calculate total number of rolls
    const totalTurns = numbOfRoundsValue * numbOfUsersValue;

    // Set rolled dice images
    setDice1(diceImages[firstRandomNum]);
    setDice2(diceImages[secondRandomNum]);

    setScore(currentScore);

    // Update current user turn
    if (userTurn <= numbOfUsersValue - 1) {
      setUserTurn(userTurn + 1);
    } else {
      setUserTurn(1);
      setRound(round + 1);
    }

    // Update current game turn
    setCurrentTurn(currentTurn + 1);

    setHistory((prev) => [
      ...prev,
      {
        id: prev.length,
        text: `Joueur ${userTurn} a un score de ${currentScore} points`,
        value: currentScore,
      },
    ]);

    // Finish the game
    if (currentTurn >= totalTurns) {
      handleFinishGame();
    }
  };

  /* Finish the game Game */
  const handleFinishGame = () => {
    setIsDisabled(true);

    setTimeout(() => {
      const { maxWinners } = getWinner(history);
      console.log(maxWinners, "max");
      // alert(`Felicitation : ${winner?.text}`);
      setwinnerModalOpen(true);
      setWinners(maxWinners);
    }, 1000);
  };

  /* Rest Game */
  const handleReset = () => {
    setScore(0);
    setIsDisabled(false);

    setUserTurn(1);
    setCurrentTurn(1);
    setRound(1);

    setHistory([]);
  };

  const getWinner = (history: THistory) => {
    let maxWinners = [];
    let max = -13;

    for (let i = 0; i < history.length; ++i) {
      if (history[i].value < max) continue;
      if (history[i].value > max) {
        maxWinners = [];
        max = history[i].value;
      }
      maxWinners.push(history[i]);
    }

    return { maxWinners };
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <DesignElementTopLeft />

      {/* User numbr 4 avatar */}
      {numbOfUsersValue === 4 && (
        <div
          className="absolute inset-x-0 top-10 right-10 -z-10 transform-gpu overflow-hidden"
          aria-hidden="true"
        >
          <img
            className={
              userTurn === 4
                ? `h-20 w-20 flex-none rounded-full bg-gray-50 ml-auto ring-4 ring-red-600 mr-1 mt-1`
                : `h-20 w-20 flex-none rounded-full bg-gray-50 ml-auto`
            }
            alt="user"
            src="https://source.unsplash.com/random/200x200?sig=1"
          />

          <span className="relative left-[calc(50%-2rem)] ">Joueur 4</span>
        </div>
      )}

      {/* User numbr 3 avatar */}
      {numbOfUsersValue >= 3 && (
        <div
          className="absolute inset-x-0 top-10 left-10 -z-10 transform-gpu overflow-hidden"
          aria-hidden="true"
        >
          <img
            className={
              userTurn === 3
                ? `h-20 w-20 flex-none rounded-full bg-gray-50 ring-4 ring-red-600 ml-1 mt-1`
                : `h-20 w-20 flex-none rounded-full bg-gray-50`
            }
            alt="user"
            src="https://source.unsplash.com/random/200x200?sig=2"
          />

          <span className="relative right-[calc(50%-2rem)] ">Joueur 3</span>
        </div>
      )}
      <div className="mx-auto max-w-2xl py-20 sm:py-25 lg:py-35">
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Joueur : {userTurn}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Nombre des joueurs : {numbOfUsersValue}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Nombre du tour :{" "}
            {round >= numbOfRoundsValue ? numbOfRoundsValue : round} /
            {numbOfRoundsValue}
          </p>
        </div>
        <div className="text-center">
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <img className="rounded-lg" src={dice1} alt="Dice" />
            <img className="rounded-lg" src={dice2} alt="Dice" />
          </div>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Score : {score}
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              className="disabled:opacity-50 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleRoll}
              disabled={isDisabled}
            >
              Lancer
            </button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm border border-indigo-600 hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <History history={history} />

      <DesignElementBottom />

      {/* User number 1 */}
      <div
        className="absolute inset-x-0 bottom-0 left-10 -z-10 transform-gpu overflow-hidden"
        aria-hidden="true"
      >
        <img
          className={
            userTurn === 1
              ? `h-20 w-20 flex-none top-0 rounded-full bg-gray-50  ml-1 mt-1 ring-4 ring-red-600`
              : `h-20 w-20 flex-none top-0 rounded-full bg-gray-50 `
          }
          alt="user"
          src="https://source.unsplash.com/random/200x200?sig=3"
        />

        <span className="relative right-[calc(50%-2rem)] ">Joueur 1</span>
      </div>

      {/* User number 2 */}
      <div
        className="absolute inset-x-0 bottom-0 right-10 -z-10 transform-gpu overflow-hidden"
        aria-hidden="true"
      >
        <img
          className={
            userTurn === 2
              ? `h-20 w-20 flex-none top-0 rounded-full bg-gray-50 ml-auto mr-1 mt-1 ring-4 ring-red-600`
              : `h-20 w-20 flex-none top-0 rounded-full bg-gray-50 ml-auto`
          }
          alt="user"
          src="https://source.unsplash.com/random/200x200?sig=4"
        />

        <span className="relative left-[calc(50%-2rem)] ">Joueur 2</span>
      </div>

      {/* Game settings Modal */}
      <GameSettings register={register} />

      {/* Winner(s) Modal */}
      <WinnerModal
        open={winnerModalOpen}
        setOpen={setwinnerModalOpen}
        winners={winners}
      />
    </div>
  );
};

export default Dice;
