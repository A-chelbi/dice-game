import GameSettings from "../GameSettings/GameSettings";

import DiceImage1 from "../../../images/dice1.svg";
import DiceImage2 from "../../../images/dice2.svg";
import DiceImage3 from "../../../images/dice3.svg";
import DiceImage4 from "../../../images/dice4.svg";
import DiceImage5 from "../../../images/dice5.svg";
import DiceImage6 from "../../../images/dice6.svg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IFormInput } from "../../../types";

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
  const [dice1, setDice1] = useState(diceImages[0]);
  const [dice2, setDice2] = useState(diceImages[1]);

  const { register, watch } = useForm<IFormInput>({
    defaultValues: {
      numbOfUsers: 2,
      numbOfTurns: 3,
    },
  });

  const numbOfUsersValue = watch("numbOfUsers");
  const numbOfTurnsValue = watch("numbOfTurns");

  const handleRoll = () => {
    // Generate random number
    const firstRandomNum = Math.floor(Math.random() * 6);
    const secondRandomNum = Math.floor(Math.random() * 6);

    setDice1(diceImages[firstRandomNum]);
    setDice2(diceImages[secondRandomNum]);

    setScore(firstRandomNum + secondRandomNum + 2);
    setUserTurn(userTurn + 1);
  };

  const handleReset = () => {
    setScore(0);
  };

  console.log(numbOfUsersValue, "numbOfUsersValue");
  console.log(numbOfTurnsValue, "numbOfTurnsValue");

  // Todo: Set number of users with default values
  // Todo: Set number games with default values
  // Todo: start game for each user and save results
  // Todo: Show results in table
  // Todo: Rest game

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>

      {/* User numbr 4 avatar */}
      {numbOfUsersValue === 4 && (
        <div
          className="absolute inset-x-0 top-10 right-10 -z-10 transform-gpu overflow-hidden"
          aria-hidden="true"
        >
          <img
            className={
              userTurn === 4
                ? `h-20 w-20 flex-none rounded-full bg-gray-50 ml-auto ring-4 mr-1 mt-1`
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
                ? `h-20 w-20 flex-none rounded-full bg-gray-50 ring-4 ml-1 mt-1`
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
            Nombre des joueurs : {numbOfUsersValue}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Nombre de tours : {numbOfTurnsValue}
          </p>
        </div>
        <div className="text-center">
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <img className="rounded-lg" src={dice1} alt="Dice" />
            <img className="rounded-lg" src={dice2} alt="Dice" />
          </div>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Score : {score}{" "}
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleRoll}
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

      <div
        className="absolute inset-x-0 top-[calc(100%-41rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>

      {/* User number 3 */}
      <div
        className="absolute inset-x-0 bottom-0 left-10 -z-10 transform-gpu overflow-hidden"
        aria-hidden="true"
      >
        <img
          className={
            userTurn === 1
              ? `h-20 w-20 flex-none top-0 rounded-full bg-gray-50  ml-1 mt-1 ring-4`
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
              ? `h-20 w-20 flex-none top-0 rounded-full bg-gray-50 ml-auto mr-1 mt-1 ring-4`
              : `h-20 w-20 flex-none top-0 rounded-full bg-gray-50 ml-auto`
          }
          alt="user"
          src="https://source.unsplash.com/random/200x200?sig=4"
        />

        <span className="relative left-[calc(50%-2rem)] ">Joueur 2</span>
      </div>

      {/* Game settings Modal */}
      <GameSettings register={register} />
    </div>
  );
};

export default Dice;
