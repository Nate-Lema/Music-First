import ReactJkMusicPlayer from "react-jinke-music-player";
import PlaylistItem from "../../types/Playlist";
import musicCover from "../../images/music-icon.png";
import "./AudioPlayer.css";

interface MusicPlayerProps {
  name: string | React.ReactNode;
  musicSrc: string | (() => Promise<string>);
  cover: string;
  singer?: string | React.ReactNode;
  duration?: number;
  lyric?: string;
  [key: string]: any;
}

const converter = (
  playlist: PlaylistItem[]
) => {
  const result: MusicPlayerProps[] = playlist.map((item) => ({
    cover: musicCover,
    musicSrc: `http://localhost:9000/${item.urlPath}`,
    name: item.title,
  }));

  return result;
};

interface PlayerProps {
  playlist: PlaylistItem[];
  playIndex:number
}

export default function AudioPlayer(props: PlayerProps) {
  const audioList = converter(
    props.playlist
  );

  return (
    <ReactJkMusicPlayer
    playIndex={props.playIndex}
      autoPlayInitLoadPlayList={false}
      autoHiddenCover={false}
      showMiniModeCover={false}
      quietUpdate
      clearPriorAudioLists
      mode="full"
      audioLists={audioList}
    />
  );
}
