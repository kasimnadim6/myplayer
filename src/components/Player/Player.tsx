import styles from './Player.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { ISong } from '../../interfaces/ISong';

type PlayerProps = {
  audioRef: any;
};
const Player = ({ audioRef }: PlayerProps) => {
  const playerDragHandler = () => {};
  return (
    <section className={styles.player}>
      <div className={styles['time-control']}>
        <p>0.00</p>
        <div className={styles.track}>
          <input
            className={styles['player-progress-bar']}
            type="range"
            min={0}
            max={100}
            value={60}
            onChange={playerDragHandler}
          />
          <div className={styles['track-animation']}></div>
        </div>
        <p>0.00</p>
      </div>
      <div className={styles['play-control']}>
        <FontAwesomeIcon
          className={styles['skip-backward']}
          size="2x"
          icon={faAngleLeft}
          // onClick={() => skipTrackHandler('skip-backward')}
        />
        <FontAwesomeIcon
          // onClick={playSongHandler}
          className={styles.play}
          size="2x"
          icon={faPlay}
          // icon={isSongPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className={styles['skip-forward']}
          size="2x"
          icon={faAngleRight}
          // onClick={() => skipTrackHandler('skip-forward')}
        />
      </div>
    </section>
  );
};

export default Player;
