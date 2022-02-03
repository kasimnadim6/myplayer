import { songActions } from '../slices/song-slice';
// import data from '../../data';
import { uiActions } from '../slices/ui-slice';
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

export const loadSongs = () => (dispatch: any) => {
  axios
    .get(`https://simplayer-2db8a-default-rtdb.firebaseio.com/songs.json`)
    .then((resp) => {
      dispatch(songActions.loadSongs(resp.data));
      dispatch(uiActions.setLoadingState(false));
    });
};
