import { THistory } from "../../../types";

interface IHistoryProps {
  history: THistory;
}

const History = ({ history }: IHistoryProps): JSX.Element => {
  return (
    <div className="mt-5">
      <ul>
        {history.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;
