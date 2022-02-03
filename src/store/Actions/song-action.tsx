import { songActions } from '../slices/song-slice';
// import data from '../../data';
import { uiActions } from '../slices/ui-slice';
import axios from 'axios';
import { ISong } from '../../interfaces/ISong';
import { useSelector } from 'react-redux';
import { IStore } from '../../interfaces/IStore';
// import { v4 as uuidv4 } from 'uuid';
export const loadSongs = () => (dispatch: any) => {
  axios
    .get(`https://simplayer-2db8a-default-rtdb.firebaseio.com/songs.json`)
    .then((resp) => {
      dispatch(songActions.setSongs(resp.data));
      dispatch(songActions.setCurrentSong());
      dispatch(uiActions.setLoadingState(false));
    });
};

export const updateActiveSong = (songs: ISong[]) => (dispatch: any) => {
  axios.put(
    `https://simplayer-2db8a-default-rtdb.firebaseio.com/songs.json`,
    songs
  );
};
