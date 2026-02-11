import { GameAssets } from './types';

/**
 * LOCAL ASSET CONFIGURATION
 * Place your files inside a folder named 'assets' in the root directory.
 * Ensure the filenames match exactly as shown below.
 */
export const INITIAL_ASSETS: GameAssets = {
  // Visuals (Images)
  girlfriendHead: 'assets/girlfriend_head.png', 
  couplePhoto: 'assets/couple_photo.jpg', 
  sadMeme: 'assets/sad_meme.jpg', 
  congratsImage: 'assets/congrats_image.jpg',

  // Audio (Sound effects and music)
  backgroundMusic: 'assets/background_music.mp3', 
  successMusic: 'assets/success_music.mp3',   
  noJumpSound: 'assets/no_jump.mp3', 
  yesSound: 'assets/yes_congrats.mp3',
  entrySound: 'assets/entry_sound.mp3',
};