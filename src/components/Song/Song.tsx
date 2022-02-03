import styles from './Song.module.scss';
import { useSelector } from 'react-redux';
import { IStore } from '../../interfaces/IStore';

const Song = () => {
  const { currentSong } = useSelector((state: IStore) => state.songDetails);

  return (
    <section className={styles['song-container']}>
      <figure className={styles['song-image']}>
        <img src={currentSong?.cover} alt={currentSong?.name} />
        <figcaption>
          <h2 className={styles['song-name']}>{currentSong?.name}</h2>
          <h3 className={styles['song-artist']}>{currentSong?.artist}</h3>
        </figcaption>
      </figure>
    </section>
  );
};

export default Song;
