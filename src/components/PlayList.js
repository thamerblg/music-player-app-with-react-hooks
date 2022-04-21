import React from "react";
import { FaEllipsisH } from "react-icons/fa";

const PlayList = (props) => {
  const changeSong = (track) => {
    props.setCurrentSong(track);
  };

  return (
    <div className="playlist">
      {props.tracks.map((track, index) => {
        return (
          <div
            className={`song
          ${props.currentSong === track && props.playing ? "active" : ""}`}
            key={index}
          >
            <div
              className="thumb"
              style={{ backgroundImage: `url(${track.cover})` }}
            ></div>
            <div className="body">
              <h3 className="title">{track.name}</h3>
              <p className="author">{track.artist}</p>
            </div>
            <div className="option" onClick={() => changeSong(track)}>
              <FaEllipsisH className="icon" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayList;
