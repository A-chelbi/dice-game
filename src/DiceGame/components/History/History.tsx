import { TPlayer } from "../../../types";

interface IHistoryProps {
  players: TPlayer[];
}

const History = ({ players }: IHistoryProps): JSX.Element => {
  return (
    <div className="mt-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[32rem] m-auto">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead>
            <tr>
              <th>Joueur</th>
              <th>score</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>{player.name} </td>
                <td>{player.score} </td>
                <td>{player.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
