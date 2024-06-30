import React, { useState } from "react";
import musicService from "../apis/service/music.service";
import Song from "../types/Song";

interface SearchSongProps {
  setSongs: (songs: Song[]) => void;
}

const SearchSong = (props: SearchSongProps) => {
  const { setSongs } = props;
  const [searchSong, setSearchSong] = useState("");
  const [error, setError] = useState("");

  const fetchSongsBySearch = async (query: string) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) throw new Error("Token not found");

      const response = await musicService.searchSongs(query);
      if (response.status !== 200) {
        throw new Error("Failed to fetch songs");
      }

      setSongs(response.data);
    } catch (error) {
      setError("Error fetching songs");
    }
  };

  const handleSearch = () => {
    fetchSongsBySearch(searchSong);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {error && <p className="error-message">{error}</p>}
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control mr-2"
              placeholder="Search for songs..."
              value={searchSong}
              onChange={(e) => setSearchSong(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSearch}
              style={{ height: "3rem" }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSong;
