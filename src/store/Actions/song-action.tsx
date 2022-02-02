import { songActions } from '../slices/song-slice';
import data from '../../data';
import { uiActions } from '../slices/ui-slice';

export const loadSongs = () => (dispatch: any) => {
  const resp = data();
  dispatch(songActions.loadSongs(resp));
  //   setTimeout(() => {
  dispatch(uiActions.setLoadingState(false));
  //   }, 2000);
};
