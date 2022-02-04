import { useDispatch, useSelector } from "react-redux";
import styles from "./Library.module.scss";
import { IStore } from "../../interfaces/IStore";
import { updateActiveSong } from "../../store/Actions/song-action";
import { ISong } from "../../interfaces/ISong";
import { songActions } from "../../store/slices/song-slice";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Library = () => {
  const dispatch = useDispatch();
  const { isLibraryVisible, songs, currentSong } = useSelector((state: IStore) => state.songDetails);
  const onSongSelect = (songToPlay: ISong) => {
    dispatch(songActions.changeSong(songToPlay.id));
    dispatch(songActions.setCurrentSong());
  };
  const closePlaylistHandler = () => {
    dispatch(songActions.setLibraryVisibility());
  };
  useEffect(() => {
    if (songs.length > 0) {
      dispatch(updateActiveSong(songs));
    }
  }, [dispatch, songs]);

  return (
    <section className={`${styles.library} ${isLibraryVisible ? styles["library-visible"] : ""}`}>
      <div className={styles["playlist-header"]}>
        <h2 className={styles["playlist-name"]}>Playlist</h2>
        <FontAwesomeIcon onClick={closePlaylistHandler} size="2x" icon={faTimes} />
      </div>
      {songs.map((song) => (
        <figure
          key={song.id}
          onClick={() => onSongSelect(song)}
          className={`${styles["song-info-container"]} ${
            currentSong.id === song.id ? styles["active-song"] : ""
          }`}
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
