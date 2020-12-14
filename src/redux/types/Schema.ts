export interface IBox {
  company: string;
  location: string;
  name: string;
  taken: boolean;
};

export interface IGame {
  alive: boolean;
  box_id: string;
  completed_at: number;
  max_score: number;
  max_strikes: number;
  name: string;
  score: number;
  started_at: number;
  status: string;
  strikes: number;
};

export interface ISession {
  active: boolean;
  box_id: string;
  completed_at: number;
  started_at: number;
  user_id: string;
};

export interface ISchema {
  boxes: IBox;
  games: IGame;
  sessions: ISession;
};