import styles from './Header.module.scss';

const Header = () => {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.name}>Sim Player</h1>
      <button className="btn btn-primary btn-animated">Library</button>
    </nav>
  );
};

export default Header;
