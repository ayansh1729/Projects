//End point is from where authorization happens
//spotify will take care of that

export const authEndpoint = "https://accounts.spotify.com/authorize";
let redirectUri = "https://munplay-5bec2.web.app/";
if (window.location.hostname === "localhost") {
  redirectUri = "http://localhost:3000/";
}
const clientId = "4de7895a1b2a48ee90862fe41701c7f5";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
