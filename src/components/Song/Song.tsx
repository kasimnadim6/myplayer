import styles from './Song.module.scss';
import { ISong } from '../../interfaces/ISong';

type SongsProps = {
  currentSong: ISong;
};
const Song = ({ currentSong }: SongsProps) => {
  const { name, artist, cover } = currentSong;
  return (
    <section className={styles['song-container']}>
      <figure className={styles['song-image']}>
        <img src={cover} alt={name} />
        <figcaption>
          <h2 className={styles['song-name']}>{name}</h2>
          <h3 className={styles['song-artist']}>{artist}</h3>
        </figcaption>
      </figure>
    </section>
  );
};

export default Song;
