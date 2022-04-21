import React, { useEffect, useRef, useState } from "react";
import {
  FaStepBackward,
  FaPlay,
  FaPause,
  FaStepForward,
  FaShare,
  FaDownload,
  FaVolumeMute,
  FaVolumeUp,
  FaRandom,
  FaRetweet,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import Marquee from "react-fast-marquee";
import { tracks } from "../data";

const Dashboard = (props) => {
  const [currentTime, setCurrentTime] = useState("0:00");
  const [seekValue, setSeekValue] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playMode, setPlayMode] = useState("loop");

  const audioPlayer = useRef(null);

  const toggle = () => props.setPlaying(!props.playing);

  useEffect(
    () => {
      if (props.playing) {
        audioPlayer.current.play();

        if (currentTime === props.currentSong.duration) {
          handleNext();
        }
      } else {
        audioPlayer.current.pause();
      }
    }, // eslint-disable-next-line
    [props.playing, currentTime]
  );

  useEffect(() => {
    audioPlayer.current.volume = volume;
  }, [audioPlayer, volume]);

  const handlePrev = () => {
    let newcurrentSongIndex = props.currentSongIndex - 1;
    if (playMode === "random") {
      let randomIndex = Math.floor(Math.random() * tracks.length);
      while (randomIndex === props.currentSongIndex) {
        randomIndex = Math.floor(Math.random() * tracks.length);
      }
      props.setCurrentSong(tracks[randomIndex]);
    } else {
      newcurrentSongIndex < 0
        ? props.setcurrentSongIndex(tracks.length - 1)
        : props.setcurrentSongIndex(newcurrentSongIndex);
      props.setCurrentSong(tracks[props.currentSongIndex]);
    }
  };

  const handleNext = () => {
    let newcurrentSongIndex = props.currentSongIndex + 1;
    if (playMode === "random") {
      let randomIndex = Math.floor(Math.random() * tracks.length);
      while (randomIndex === props.currentSongIndex) {
        randomIndex = Math.floor(Math.random() * tracks.length);
      }
      props.setCurrentSong(tracks[randomIndex]);
    } else {
      newcurrentSongIndex > tracks.length - 1
        ? props.setcurrentSongIndex(0)
        : props.setcurrentSongIndex(newcurrentSongIndex);
      props.setCurrentSong(tracks[props.currentSongIndex]);
    }
  };

  const formatTime = (currentTime) => {
    const minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);

    seconds = seconds >= 10 ? seconds : "0" + (seconds % 60);

    const formatTime = minutes + ":" + seconds;

    return formatTime;
  };

  const onPlaying = () => {
    setCurrentTime(formatTime(audioPlayer.current.currentTime));
    setSeekValue(
      (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
    );
  };

  var percentage = seekValue + "%";

  const volumeValue = volume * 100;

  const handleInputChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  var modeList = ["loop", "random"];
  const handleChangePlayMode = () => {
    let index = modeList.indexOf(playMode);
    index = (index + 1) % modeList.length;
    setPlayMode(modeList[index]);
  };

  return (
    <div className="dashboard">
      {/*<!-- Header -->*/}
      <header>
        <div>
          <a href={props.currentSong.source} download>
            <FaDownload size={20} className="icon" />
          </a>
        </div>
        <div>
          <span>Now playing:</span>
          <h2>
            <Marquee>
              {props.currentSong.name} _ <span>{props.currentSong.artist}</span>
            </Marquee>
          </h2>
        </div>

        <div className="like-it">
          {props.currentSong.favorited ? (
            <FaHeart size={20} color="red" />
          ) : (
            <FaRegHeart size={20} className="icon" />
          )}
        </div>
      </header>

      {/*<!-- CD -->*/}
      <div className="cd">
        <div
          className="cd-thumb"
          style={{ backgroundImage: `url(${props.currentSong.cover})` }}
        ></div>
      </div>

      {/*<!-- Control -->*/}
      <div className="control">
        <div className="btn btn-loop" onClick={handleChangePlayMode}>
          {playMode === "loop" ? (
            <FaRetweet className="icon" size={24} />
          ) : (
            <FaRandom className="icon" size={24} />
          )}
        </div>

        <div className="btn btn-prev" onClick={handlePrev}>
          <FaStepBackward className="icon" size={24} />
        </div>
        <div className="btn btn-toggle-play" onClick={toggle}>
          {props.playing ? <FaPause size={24} /> : <FaPlay size={24} />}
        </div>
        <div className="btn btn-next" onClick={handleNext}>
          <FaStepForward className="icon" size={24} />
        </div>

        <div className="btn btn-share">
          <a
            href={props.currentSong.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaShare className="icon" />
          </a>
        </div>
      </div>
      <div className="time">
        <div className="current-time">{currentTime}</div>
        <div className="end-time">{props.currentSong.duration}</div>
      </div>
      <div className="progress">
        <input
          className="progress-bar"
          type="range"
          value={seekValue}
          step="1"
          min="0"
          max="100"
          onChange={(e) => {
            const seekto =
              audioPlayer.current.duration * (+e.target.value / 100);
            audioPlayer.current.currentTime = seekto;
            setSeekValue(e.target.value);
          }}
          style={{ width: percentage }}
        />
      </div>

      <audio
        id="audio"
        src={props.currentSong.source}
        ref={audioPlayer}
        onTimeUpdate={onPlaying}
      ></audio>

      <div className="volume-container">
        <div className="volume-icon">
          {volumeValue === 0 ? (
            <FaVolumeMute size={24} className="icon" />
          ) : (
            <FaVolumeUp size={24} className="icon" />
          )}
        </div>
        <input
          className="range"
          max={1}
          min={0}
          onChange={handleInputChange}
          step="0.01"
          type="range"
          value={volume}
        />
      </div>
    </div>
  );
};

export default Dashboard;
