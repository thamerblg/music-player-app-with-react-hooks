import { tracks } from "./data";
import Dashboard from "./components/Dashboard";
import PlayList from "./components/PlayList";
import { useState } from "react";

function App() {
  const [currentSongIndex, setcurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(tracks[currentSongIndex]);
  const [playing, setPlaying] = useState(false);
  return (
    <div className="player">
      {/*<!-- Dashboard -->*/}
      <Dashboard
        tracks={tracks}
        currentSongIndex={currentSongIndex}
        setcurrentSongIndex={setcurrentSongIndex}
        playing={playing}
        setPlaying={setPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />

      {/*<!-- Playlist -->*/}
      <PlayList
        tracks={tracks}
        playing={playing}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
    </div>
  );
}

export default App;
