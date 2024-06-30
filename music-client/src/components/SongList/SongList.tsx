import Song from "../../types/Song";


interface SongListProps {
  songs: Song[];
  onAddToPlaylist: (id: string) => Promise<void>;
}

const SongList = ({songs,onAddToPlaylist}:SongListProps) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-secondary text-white">
              <h2>Song List</h2>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {songs.map((song) => (
                  <li
                    key={song.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{song.title}</span>
                    <div className="button-container">
                      <button
                        className="circular-button green-button"
                        onClick={() => onAddToPlaylist(song.id)}
                        title="Add to Playlist"
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongList;
