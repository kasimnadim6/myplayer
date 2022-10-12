import { useDispatch } from "react-redux";
import { songActions } from "../../store/slices/song-slice";
import styles from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const onLibraryClick = () => {
    dispatch(songActions.setLibraryVisibility());
  };
  return (
    <nav className={styles.nav}>
      <h1 className={styles.name}>My Player</h1>
      <button className="btn btn-primary btn-animated" onClick={onLibraryClick}>
        Library
      </button>
    </nav>
  );
};

export default Header;
