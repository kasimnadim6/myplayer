import { useEffect, useRef, useState } from 'react';
import Header from './components/Header/Header';
import styles from './App.module.scss';
import Song from './components/Song/Song';
import Player from './components/Player/Player';
import data from './data';

const App = () => {
  const audioRef: any = useRef();
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);

  useEffect(() => {
    const songsList = data();
    // console.log(songsList);
    setSongs(songsList);
  }, []);
  useEffect(() => {
    setCurrentSong(songs[0]);
    setLoading(false);
  }, [songs]);

  return (
    <div className={styles.app}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <header>
            <Header />
          </header>
          <main>
            <Song currentSong={currentSong} />
            <Player audioRef={audioRef} />
            <audio ref={audioRef} src={currentSong.audio}></audio>
          </main>
        </>
      )}
    </div>
  );
};

export default App;
