import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchSong from "../../components/SearchSong";
import SongList from "../../components/SongList/SongList";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import PlayList from "../../components/PlayList/PlayList";
import musicService from "../../apis/service/music.service";
import PlaylistItem from "../../types/Playlist";
import Song from "../../types/Song";
import "./HomePage.css";

const HomePage = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [playIndex, setPlayIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const fetchSongs = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) throw new Error("Token not found");

      const response = await musicService.getAllSongs();
      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch songs");
      }

      setSongs(response.data);
    } catch (error) {
      setError("Error fetching songs");
    }
  };

  const fetchPlaylist = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) throw new Error("Token not found");

      const response = await musicService.getPlayList();
      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch songs");
      }

      setPlaylist(response.data);
    } catch (error) {
      setError("Error fetching playlist");
    }
  };

  const playSong = (index:number) => {
  setPlayIndex(index)
  setIsPlaying(true)
  };

  useEffect(() => {
    const accessToken=sessionStorage.getItem("accessToken");
    if(!accessToken){
      navigate("/login")
    }
    fetchSongs();
    fetchPlaylist();
  }, []);

  const handleRemoveSong = async (songId: string) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) throw new Error("Token not found");

      const response = await musicService.removeSongFromPlaylist(songId);

      if (!response || response.status !== 200) {
        throw new Error("Failed to remove song from playlist");
      }
      setPlaylist(response.data);
    } catch (error) {
      setError("Error removing song from playlist");
    }
  };

  const addToPlaylist = async (id: string) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) throw new Error("Token not found");

      const response = await musicService.addSongToPlaylist(id);
      if (!response || response.status !== 200) {
        throw new Error("Failed to add song to playlist");
      }
      setPlaylist(response.data);
    } catch (error) {
      setError("Error adding song to playlist");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="flex-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/music-first">
            Music First
          </Link>
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="container-fluid bg-dark text-white py-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="text-center mb-4">Music First</h1>
              {/* Search Song */}
              <div className="mb-4">
                <SearchSong setSongs={setSongs} />
              </div>
              {/* Song List */}
              <div className="mb-4">
                <SongList songs={songs} onAddToPlaylist={addToPlaylist} />
              </div>
              {/* Playlist */}
              <div>
                <PlayList
                  playlist={playlist}
                  onRemoveSong={handleRemoveSong}
                  onPlaySong={playSong}
                />
              </div>

              {isPlaying && (
                <div className="audio-player">
                  <AudioPlayer playlist={playlist} playIndex={playIndex} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <span>© 2024 Music First. All rights reserved.</span>
          </div>
          <div className="footer-links mt-3">
            <Link to="#" className="link">
              Contact Us
            </Link>
            <Link to="#" className="link">
              Privacy Policy
            </Link>
            <Link to="#" className="link">
              Terms of Service
            </Link>
          </div>
          <div className="footer-social mt-3">
            <span>Follow us on:</span>
            <a href="#" className="link">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
