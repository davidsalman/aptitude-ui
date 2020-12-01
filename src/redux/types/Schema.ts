export interface IGame {
  alive: boolean;
  completed_at: number;
  max_score: number;
  max_strikes: number;
  name: string;
  score: number;
  started_at: number;
  status: string;
  strikes: number;
};

export interface IBox {
  company: string;
  game_collection: string[];
  location: string;
  name: string;
};

export interface ISchema {
  boxes: IBox;
  games: IGame;
};