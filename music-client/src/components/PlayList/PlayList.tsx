import PlaylistItem from "../../types/Playlist";
import "./PlayList.css";

interface PlaylistProps {
  playlist: PlaylistItem[];
  onRemoveSong: (id: string) => void;
  onPlaySong: (index:number) => void;
}

const PlayList = (props: PlaylistProps) => {
  const { playlist, onRemoveSong, onPlaySong } = props;
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-secondary text-white">
              <h2>My Playlist</h2>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {playlist.map((song,index) => (
                  <li
                    key={song.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{song.title}</span>
                    <div className="button-container">
                      <button
                        className="btn btn-danger btn-sm circular-button red-button"
                        onClick={() => onRemoveSong(song.songId)}
                        title="Remove Song"
                      >
                        -
                      </button>
                      <button
                        className="btn btn-success btn-sm circular-button play-button"
                        onClick={() => onPlaySong(index)}
                        title="Play Song"
                      >
                        <i className="fas fa-play"></i>
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

export default PlayList;
