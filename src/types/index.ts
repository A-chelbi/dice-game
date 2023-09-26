export interface IFormInput {
  numbOfRounds: number;
  numbOfUsers: number;
}

export type THistory = {
  id: number;
  text: string;
  value: number;
}[];

export type TPlayer = {
  id: number;
  name: string;
  score: number;
  total: number;
};
