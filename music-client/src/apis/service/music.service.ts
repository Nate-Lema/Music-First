import http from "../axios";

const getAllSongs = () => {
  return http.get("/api/music");
};

const getPlayList = async () => {
  return http.get("/api/playlist");
};

const addSongToPlaylist = (id: string) => {
  return http.post("/api/playlist/add", {
    songId: id,
  });
};

const removeSongFromPlaylist = (songId: string) => {
  return http.post("/api/playlist/remove", {
    songId,
  });
};
type User = {
  username: string;
  password: string;
};
const toLogin = async (user: User) => {
  return await http.post("/api/auth/login", user);
};

const searchSongs = (query: string) => {
  return http.get(`/api/music?search=${query}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllSongs,
  addSongToPlaylist,
  removeSongFromPlaylist,
  toLogin,
  searchSongs,
  getPlayList,
};

