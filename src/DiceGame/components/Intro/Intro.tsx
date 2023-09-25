import DesignElementBottom from "../DesigneElements/DesignElementBottom";
import DesignElementTopLeft from "../DesigneElements/DesignElementTopLeft";

interface IIntroProps {
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const Intro = ({ setStartGame }: IIntroProps): JSX.Element => {
  const handleClick = () => {
    setStartGame(true);
  };

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <DesignElementTopLeft />

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Jeu de Dés 🎲{" "}
              <span className="logo">
                Cela<b>neo</b>
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleClick}
              >
                Jouer
              </button>
            </div>
          </div>
        </div>

        <DesignElementBottom />
      </div>
    </div>
  );
};

export default Intro;
