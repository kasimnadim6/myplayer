import { useSelector } from 'react-redux';
import styles from './Library.module.scss';
import { IStore } from '../../interfaces/IStore';

const Library = () => {
  const { isLibraryVisible, songs } = useSelector(
    (state: IStore) => state.songDetails
  );
  const onSongSelect = () => {
    alert('clicked');
  };
  return (
    <section
      className={`${styles.library} ${
        isLibraryVisible ? styles['library-visible'] : ''
      }`}
    >
      <h2 className={styles['playlist-name']}>Playlist</h2>
      {songs.map((song) => (
        <figure
          key={song.id}
          onClick={onSongSelect}
          className={styles['song-info-container']}
        >
          <img src={song.cover} alt={song.name} />
          <figcaption>
            <h3>{song.name}</h3>
            <p>{song.artist}</p>
          </figcaption>
        </figure>
      ))}
    </section>
  );
};

export default Library;
