import GameSettings from "../GameSettings/GameSettings";

import DiceImage1 from "../../../images/dice1.svg";
import DiceImage2 from "../../../images/dice2.svg";
import DiceImage3 from "../../../images/dice3.svg";
import DiceImage4 from "../../../images/dice4.svg";
import DiceImage5 from "../../../images/dice5.svg";
import DiceImage6 from "../../../images/dice6.svg";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IFormInput, THistory, TPlayer } from "../../../types";
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
  const [players, setPlayers] = useState<TPlayer[]>([]);

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [score, setScore] = useState(0);

  const [round, setRound] = useState(1);
  const [currentTurn, setCurrentTurn] = useState(1);

  const [isDisabled, setIsDisabled] = useState(false);

  const [dice1, setDice1] = useState(diceImages[0]);
  const [dice2, setDice2] = useState(diceImages[1]);

  const [winnerModalOpen, setwinnerModalOpen] = useState(false);
  const [winners, setWinners] = useState<TPlayer[]>([]);

  const { register, watch } = useForm<IFormInput>({
    defaultValues: {
      numbOfUsers: 2,
      numbOfRounds: 3,
    },
  });

  const numbOfUsersValue = watch("numbOfUsers");
  const numbOfRoundsValue = watch("numbOfRounds");

  // Calculate total number of rolls
  const totalTurns = numbOfRoundsValue * numbOfUsersValue;

  /*
   *  Dice roll logic
   *
   * Generate random numbers from 1 to 6 for each Dice
   * Calculate the current score and append it to the current player
   * Calculate the total score for each player
   */
  const handleRoll = () => {
    // Generate random number
    const firstRandomNum = Math.floor(Math.random() * 6);
    const secondRandomNum = Math.floor(Math.random() * 6);

    // Calculate score
    const currentScore = firstRandomNum + secondRandomNum + 2;

    const newPlayers = [...players]; // Get all players list

    newPlayers[currentPlayer - 1].score = currentScore; // Update current player's score
    newPlayers[currentPlayer - 1].total += currentScore; // Update current player's Total score

    // Set rolled dice images
    setDice1(diceImages[firstRandomNum]);
    setDice2(diceImages[secondRandomNum]);

    setScore(currentScore); // Used mainly for showing current score in the page header

    // Update current player turn and rounds
    if (currentPlayer <= numbOfUsersValue - 1) {
      setCurrentPlayer(currentPlayer + 1);
    } else {
      setCurrentPlayer(1);
      setRound(round + 1);
    }

    // Update current game turn
    setCurrentTurn(currentTurn + 1);

    // Finish the game
    if (currentTurn >= totalTurns) {
      handleFinishGame();
    }
  };

  /* Finish the game Game */
  const handleFinishGame = () => {
    setIsDisabled(true);

    setTimeout(() => {
      const { maxWinners } = getWinner(players);

      setwinnerModalOpen(true);
      setWinners(maxWinners);
    }, 1000);
  };

  /* Rest Game */
  const handleReset = () => {
    setScore(0);
    setIsDisabled(false);

    setCurrentPlayer(1);
    setCurrentTurn(1);
    setRound(1);

    for (let i = 0; i < numbOfUsersValue; ++i) {
      players[i].score = 0;
      players[i].total = 0;
    }
  };

  const getWinner = (players: TPlayer[]) => {
    let maxWinners = [];
    let max = -13;

    for (let i = 0; i < players.length; ++i) {
      if (players[i].total < max) continue;
      if (players[i].total > max) {
        maxWinners = [];
        max = players[i].total;
      }
      maxWinners.push(players[i]);
    }

    return { maxWinners };
  };

  // Set players list
  useEffect(() => {
    let players = [];

    for (let i = 0; i < numbOfUsersValue; ++i) {
      players.push({ id: i + 1, name: `Joueur ${i + 1}`, score: 0, total: 0 });
    }

    setPlayers(players);
  }, [numbOfUsersValue]);

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
              currentPlayer === 4
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
              currentPlayer === 3
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
            Joueur : {currentPlayer}
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

      <History players={players} />

      <DesignElementBottom />

      {/* User number 1 */}
      <div
        className="absolute inset-x-0 bottom-0 left-10 -z-10 transform-gpu overflow-hidden"
        aria-hidden="true"
      >
        <img
          className={
            currentPlayer === 1
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
            currentPlayer === 2
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
