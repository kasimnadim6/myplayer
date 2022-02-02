import styles from './Player.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { SyntheticEvent, useRef, BaseSyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { songActions } from '../../store/slices/song-slice';
import { IStore } from '../../interfaces/IStore';

const Player = () => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songCurrentPlayTime, setSongCurrentPlayTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  const [animationPercentage, setAnimationPercentage] = useState(0);

  const { currentSong, isSongPlaying } = useSelector(
    (state: IStore) => state.songDetails
  );
  const playSongHandler = () => {
    if (null !== audioRef.current) {
      if (isSongPlaying) {
        audioRef.current.pause();
        dispatch(songActions.setPlayStatus(false));
      } else {
        audioRef.current.play();
        dispatch(songActions.setPlayStatus(true));
      }
    }
  };
  const getSongTime = (time: number) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };
  const onTimeUpdateHandler = (e: BaseSyntheticEvent) => {
    const currentPlayTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongCurrentPlayTime(currentPlayTime);
    setSongDuration(duration);
    setAnimationPercentage(
      (Math.round(currentPlayTime) / Math.round(duration)) * 100
    );
  };
  const updateTrackAnimation = {
    transform: `translateX(${animationPercentage}%)`,
  };
  const playerDragHandler = () => {};

  return (
    <section className={styles.player}>
      <div className={styles['time-control']}>
        <p>{getSongTime(songCurrentPlayTime)}</p>
        <div className={styles.track}>
          <input
            className={styles['player-progress-bar']}
            type="range"
            min={0}
            max={100}
            value={60}
            onChange={playerDragHandler}
          />
          <div
            style={updateTrackAnimation}
            className={styles['track-animation']}
          ></div>
        </div>
        <p>{getSongTime(songDuration)}</p>
      </div>
      <div className={styles['play-control']}>
        <FontAwesomeIcon
          className={styles['skip-backward']}
          size="2x"
          icon={faAngleLeft}
          // onClick={() => skipTrackHandler('skip-backward')}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className={styles.play}
          size="2x"
          icon={isSongPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className={styles['skip-forward']}
          size="2x"
          icon={faAngleRight}
          // onClick={() => skipTrackHandler('skip-forward')}
        />
      </div>
      <audio
        ref={audioRef}
        onLoadedMetadata={onTimeUpdateHandler}
        onTimeUpdate={onTimeUpdateHandler}
        src={currentSong?.audio}
      ></audio>
    </section>
  );
};

export default Player;
