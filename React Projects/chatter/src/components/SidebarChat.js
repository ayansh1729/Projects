import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "../firebase";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function SidebarChat({ id, addNewChat, name }) {
  const [seed, setseed] = useState("");
  const [messages, setMessages] = useState("");
  const [{ togglerState }, dispatch] = useStateValue();

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Enter room name: ");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  const handleChat = () => {
    dispatch({
      type: actionTypes.SET_TOGGLER,
      togglerState: togglerState + 1,
    });
  };

  return !addNewChat ? (
    <div className="sidebar_chat">
      <Link to={`/rooms/${id}`} onClick={handleChat}>
        <div className="sidebar_chat">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="sidebar_chat_info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      </Link>
    </div>
  ) : (
    <div className="sidebar_chat new_chat" onClick={createChat}>
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
