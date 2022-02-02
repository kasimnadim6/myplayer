import Header from './components/Header/Header';
import styles from './App.module.scss';
import Song from './components/Song/Song';
import Player from './components/Player/Player';

const App = () => {
  return (
    <div className={styles.app}>
      <header>
        <Header />
      </header>
      <main>
        <Song />
        <Player />
      </main>
    </div>
  );
};

export default App;
