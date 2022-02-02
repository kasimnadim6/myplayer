import { createSlice } from '@reduxjs/toolkit';
import { ISongState } from '../../interfaces/ISongState';

const initialState: ISongState = {
  songs: [],
  currentSong: {
    id: 0,
    name: '',
    artist: '',
    audio: '',
    color: [],
    cover: '',
    active: false,
  },
  isSongPlaying: false,
};
const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    loadSongs(state, { payload }) {
      state.songs = payload;
      state.currentSong = payload[0];
    },
    setCurrentSong(state, { payload }) {
      state.currentSong = payload;
    },
    setPlayStatus(state, { payload }) {
      state.isSongPlaying = payload;
    },
  },
});

export const songActions = songSlice.actions;
export default songSlice.reducer;
