import styles from "./Player.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useRef, BaseSyntheticEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { songActions } from "../../store/slices/song-slice";
import { IStore } from "../../interfaces/IStore";

const Player = () => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songCurrentPlayTime, setSongCurrentPlayTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  const [animationPercentage, setAnimationPercentage] = useState(0);
  const { songs, currentSong, isSongPlaying } = useSelector((state: IStore) => state.songDetails);
  const updateTrackAnimation = {
    transform: `translateX(${animationPercentage}%)`,
  };
  const trackBgColor = {
    // backgroundImage: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
    // WebkitBackgroundClip: "text",
    // backgroundClip: "text",
    // color: "transparent",
  };

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
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
  };
  const onTimeUpdateHandler = (e: BaseSyntheticEvent) => {
    const currentPlayTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongCurrentPlayTime(currentPlayTime);
    setSongDuration(duration);
    setAnimationPercentage((Math.round(currentPlayTime) / Math.round(duration)) * 100);
  };
  const skipTrackHandler = (direction: string) => {
    let index = songs.indexOf(currentSong);
    if (direction === "skip-backward") {
      index--;
      if (index === 0) {
        dispatch(songActions.changeSong(songs.at(-1)));
      } else {
        dispatch(songActions.changeSong(songs.at(index)?.id));
      }
      dispatch(songActions.setCurrentSong());
    } else if (direction === "skip-forward") {
      index++;
      if (index === songs.length) {
        dispatch(songActions.changeSong(songs.at(0)?.id));
      } else {
        dispatch(songActions.changeSong(songs.at(index)?.id));
      }
      dispatch(songActions.setCurrentSong());
    }
  };
  const playerDragHandler = (e: BaseSyntheticEvent) => {
    const currentTime = e.target.value;
    audioRef.current!.currentTime = currentTime;
    setSongCurrentPlayTime(currentTime);
    setAnimationPercentage((Math.round(currentTime) / Math.round(songDuration)) * 100);
  };
  const songEndHandler = () => {
    const index = songs.indexOf(currentSong);
    dispatch(songActions.changeSong(songs.at((index + 1) % songs.length)?.id));
    dispatch(songActions.setCurrentSong());
  };
  useEffect(() => {
    if (currentSong && isSongPlaying) {
      audioRef.current?.play();
    }
  }, [currentSong, isSongPlaying]);

  return (
    <section className={styles.player}>
      <div className={styles["time-control"]}>
        <p style={trackBgColor}>{getSongTime(songCurrentPlayTime)}</p>
        <div
          className={styles.track}
          // style={{
          //   backgroundImage: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
          // }}
        >
          <input
            className={styles["player-progress-bar"]}
            type="range"
            min={0}
            max={songDuration}
            value={songCurrentPlayTime}
            onChange={playerDragHandler}
          />
          <div style={updateTrackAnimation} className={styles["track-animation"]}></div>
        </div>
        <p style={trackBgColor}>{songDuration ? getSongTime(songDuration) : "0:00"}</p>
      </div>
      <div className={styles["play-control"]}>
        <FontAwesomeIcon
          className={styles["skip-backward"]}
          size="3x"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler("skip-backward")}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className={styles.play}
          size="3x"
          icon={isSongPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className={styles["skip-forward"]}
          size="3x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
      <audio
        ref={audioRef}
        onLoadedMetadata={onTimeUpdateHandler}
        onTimeUpdate={onTimeUpdateHandler}
        onEnded={songEndHandler}
        src={currentSong?.audio}
      ></audio>
    </section>
  );
};

export default Player;
