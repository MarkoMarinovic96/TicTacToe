export interface Player {
  id: number;
  username: string;
}

export interface Game {
  id: number;
  board: number[][];
  winner?: { id: string; username: string } | null;
  first_player: { id: string; username: string };
  second_player: { id: string; username: string };
  created: string;
  status: string;
}

export interface GamesApiResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Game[];
}

export interface SingleGameApiResponse {
  id: number;
  board: number[][];
  winner?: { id: string; username: string } | null;
  first_player: { id: string; username: string };
  second_player: { id: string; username: string };
  created: string;
  status: string;
}
