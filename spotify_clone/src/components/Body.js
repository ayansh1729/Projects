import PlayCircleFilledOutlined from "@material-ui/icons/PlayCircleFilledOutlined";
import React from "react";
import { useDataLayerValue } from "../DataLayer";
import "./Body.css";
import Header from "./Header";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:5twcc9zyxN9K5jhfGTzJlc`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body_info">
        {/* <img
          src="https://webneel.com/wallpaper/sites/default/files/images/08-2018/1-nature-wallpaper-grass-hd.preview.jpg"
          alt="sadflajsd"
        /> */}
        <img src={discover_weekly?.images[0].url} alt="sadflajsd" />
        <div className="body_infoText">
          <strong>PLAYLIST</strong>
          <h2> Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
          <p>Description.........</p>
        </div>
      </div>
      <div className="body_songs">
        <div className="body_icons">
          <PlayCircleFilledIcon
            className="body_shuffle"
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>
        <div>
          {discover_weekly?.tracks.items.map((item) => (
            <SongRow track={item.track} playSong={playSong} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Body;
