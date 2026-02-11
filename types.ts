export interface GameAssets {
  girlfriendHead: string | null;
  couplePhoto: string | null;
  sadMeme: string | null;
  congratsImage: string | null;
  backgroundMusic: string | null;
  successMusic: string | null;
  noJumpSound: string | null;
  yesSound: string | null;
  entrySound: string | null;
}

export type GameState = 'setup' | 'playing' | 'success';