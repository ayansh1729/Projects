import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  MoreVert,
  AttachFile,
  SearchOutlined,
  MessageSharp,
} from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Picker from "emoji-picker-react";
import { actionTypes } from "../reducer";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import UseWindowDimensions from "../UseWindowDimensions";
import SendIcon from "@material-ui/icons/Send";

function Chat() {
  const [seed, setseed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [Emoji, setEmoji] = useState(false);
  const [toggler, setToggler] = useState(true);

  const [{ user, togglerState }, dispatch] = useStateValue();
  const { width } = UseWindowDimensions();
  const [showSend, setshowSend] = useState(false);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const show_send = () => {
    setshowSend(true);
  };

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const onEmojiClick = (event, emojiObject) => {
    setInput(input + emojiObject.emoji);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        message: input,
        name: user?.multiFactor?.user?.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: localStorage.getItem("photoURL"),
      });
    setInput("");
    setEmoji(false);
    setshowSend(false);
  };
  const handleDrawerToggle = () => {
    setToggler(!toggler);
    dispatch({
      type: actionTypes.SET_TOGGLER,
      togglerState: togglerState + 1,
    });
    setshowSend(false);
  };
  return (
    <>
      {width < 629 ? (
        <div className={togglerState % 2 === 0 ? "chat" : "chat hide_chat"}>
          <div className="chat_header">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <ArrowBackIcon />
            </IconButton>
            <Avatar
              src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
            />
            <div className="chat_headerInfo">
              <h3>{roomName}</h3>
              <p>
                last seen{" "}
                {new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()}
              </p>
            </div>
            <div className="chat_headerRight">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          </div>
          <div className="chat_body">
            {messages.map((message) => (
              <p
                className={`chat_message ${
                  message.name == user?.multiFactor?.user?.displayName &&
                  "chat_receiver"
                }`}
              >
                <span className="chat_name">{message.name}</span>
                {message.message}
                <span className="chat_time">
                  {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
              </p>
            ))}
          </div>
          <div className="chat_footer">
            <IconButton>
              <div
                className="emoji"
                onClick={() => {
                  setEmoji(!Emoji);
                }}
              >
                <InsertEmoticonIcon />
              </div>
              {Emoji && <Picker onEmojiClick={onEmojiClick} />}
            </IconButton>
            <form>
              <input
                type="text"
                value={input}
                onClick={show_send}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
              />
              <button type="submit" onClick={sendMessage}>
                Send
              </button>
            </form>
            <IconButton>
              {!showSend && <MicIcon />}
              {showSend && <SendIcon onClick={sendMessage} />}
            </IconButton>
          </div>
        </div>
      ) : (
        <div className="chat">
          <div className="chat_header">
            <Avatar
              src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
            />
            <div className="chat_headerInfo">
              <h3>{roomName}</h3>
              <p>
                last seen{" "}
                {new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()}
              </p>
            </div>
            <div className="chat_headerRight">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          </div>
          <div className="chat_body">
            {messages.map((message) => (
              <p
                className={`chat_message ${
                  message.name == user?.multiFactor?.user?.displayName &&
                  "chat_receiver"
                }`}
              >
                <span className="chat_name">{message.name}</span>
                {message.message}
                <span className="chat_time">
                  {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
              </p>
            ))}
          </div>
          <div className="chat_footer">
            <IconButton>
              <div
                className="emoji"
                onClick={() => {
                  setEmoji(!Emoji);
                }}
              >
                <InsertEmoticonIcon />
              </div>
              {Emoji && <Picker onEmojiClick={onEmojiClick} />}
            </IconButton>
            <form>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
              />
              <button type="submit" onClick={sendMessage}>
                Send
              </button>
            </form>
            <IconButton>
              <MicIcon />
            </IconButton>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
