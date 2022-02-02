import { useEffect } from 'react';
import Header from './components/Header/Header';
import styles from './App.module.scss';
import Song from './components/Song/Song';
import Player from './components/Player/Player';
import { useDispatch, useSelector } from 'react-redux';
import { loadSongs } from './store/Actions/song-action';
import { IStore } from './interfaces/IStore';

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: IStore) => state.ui);

  useEffect(() => {
    dispatch(loadSongs());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <header>
            <Header />
          </header>
          <main>
            <Song />
            <Player />
          </main>
        </>
      )}
    </div>
  );
};

export default App;
