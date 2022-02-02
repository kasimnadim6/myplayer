import { useEffect } from 'react';
import Header from './components/Header/Header';
import styles from './App.module.scss';
import Song from './components/Song/Song';
import Player from './components/Player/Player';
import { useDispatch, useSelector } from 'react-redux';
import { loadSongs } from './store/Actions/song-action';
import { IStore } from './interfaces/IStore';
import Library from './components/Library/Library';

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: IStore) => state.ui);
  const { isLibraryVisible } = useSelector(
    (state: IStore) => state.songDetails
  );

  useEffect(() => {
    dispatch(loadSongs());
  }, [dispatch]);
  return (
    <>
      <div
        className={`${styles.app} ${
          isLibraryVisible ? styles['library-visible'] : ''
        }`}
      >
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
      <Library />
    </>
  );
};

export default App;
