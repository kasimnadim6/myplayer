import { createSlice } from '@reduxjs/toolkit';
import { ISongState } from '../../interfaces/ISongState';

const initialState: ISongState = {
  songs: [],
  currentSong: {
    id: '',
    name: '',
    artist: '',
    audio: '',
    color: [],
    cover: '',
    active: false,
  },
  isSongPlaying: false,
  isLibraryVisible: false,
};
const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSongs(state, { payload }) {
      state.songs = payload;
    },
    setCurrentSong(state) {
      const activeSongIndex = state.songs.findIndex((song) => song.active);
      if (activeSongIndex !== -1) {
        state.currentSong = state.songs[activeSongIndex];
      } else {
        state.currentSong = state.songs[0];
      }
    },
    changeSong(state, { payload }) {
      const activeSongIndex = state.songs.findIndex(
        (song) => song.active === true
      );
      const songToPlayIndex = state.songs.findIndex(
        (song) => song.id === payload
      );
      if (activeSongIndex !== -1) {
        state.songs[activeSongIndex].active = false;
      }
      if (activeSongIndex !== -1) {
        state.songs[songToPlayIndex].active = true;
      }
    },
    setPlayStatus(state, { payload }) {
      state.isSongPlaying = payload;
    },
    setLibraryVisibility(state) {
      state.isLibraryVisible = !state.isLibraryVisible;
    },
  },
});

export const songActions = songSlice.actions;
export default songSlice.reducer;
