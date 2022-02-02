import { ISong } from './ISong';

export interface ISongState {
  songs: ISong[];
  currentSong: ISong;
  isSongPlaying: boolean;
  isLibraryVisible: boolean;
}
