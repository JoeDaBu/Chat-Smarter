import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import SendMessageBlock from "./SendMessageBlock";
import TopBar from "./TopBar";
import FrdScreen from "./FrdScreen";

import styled from "styled-components";
import ChatMessages from "./ChatMessages";
import SearchDialog from "./SearchDialog";

const ChatContainer = styled.div`
  display: flex;
  overflow: hidden;
`;
const RightChatWindow = styled.div`
  width: 100%;
  overflow-y: hidden;
`;

const LeftWindow = styled.div`
  margin-top: 67px;
  width: 30vw;
  height: 90vh;
  overflow-y: scroll;
`;

const JustChats = styled.div`
  margin-top: 67px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [selectedFrd, setSelectedFrd] = useState(null);
  const [searchWords, setSearchWords] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    db.collection("msgs")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs
            .map((doc) => doc.data())
            .filter(
              (msg) =>
                msg.sentToEmail === auth.currentUser.email ||
                msg.sentByEmail === auth.currentUser.email
            )
        );
      });
  }, []);

  return (
    <ChatContainer>
      <SearchDialog
        selectedFrd={selectedFrd}
        messages={messages}
        searchWords={searchWords}
        setIsSearchOpen={setIsSearchOpen}
        isSearchOpen={isSearchOpen}
        setSearchWords={setSearchWords}
      />
      <TopBar
        friend={selectedFrd}
        setSelectedFrd={setSelectedFrd}
        searchWords={searchWords}
        setSearchWords={setSearchWords}
        setIsSearchOpen={setIsSearchOpen}
      />
      <LeftWindow>
        <FrdScreen
          setSelectedFrd={setSelectedFrd}
          messages={messages}
          selectedFrd={selectedFrd}
        />
      </LeftWindow>
      <RightChatWindow>
        <JustChats>
          {selectedFrd ? (
            <ChatMessages selectedFrd={selectedFrd} messages={messages} />
          ) : (
            <div>No Friend Chosen</div>
          )}
        </JustChats>
        <SendMessageBlock selectedFrd={selectedFrd} />
      </RightChatWindow>
    </ChatContainer>
  );
}

export default Chat;
