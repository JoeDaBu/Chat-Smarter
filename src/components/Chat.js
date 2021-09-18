import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import SendMessageBlock from "./SendMessageBlock";
import TopBar from "./TopBar";
import FrdScreen from "./FrdScreen";

import styled from "styled-components";

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
  width: 20vw;
  height: 90vh;
  overflow-y: scroll;
`;

const PersonPic = styled.img`
  width: 40px;
  border-radius: 25px;
  margin: 5px;
`;

const SenderBubble = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ReceiverBubble = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const MessageTxt = styled.div`
  border-radius: 5px;
  padding: 10px 15px;
  box-shadow: 1px 1px 2px 0px #0000002b;
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

  useEffect(() => {
    db.collection("msgs")
      .orderBy("createdAt")
      .limit(50)
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

  function getMessagesFromFriend(friendEmail) {
    const selectedMessages = messages.filter(
      (msg) =>
        msg.sentByEmail === friendEmail ||
        msg.sentByEmail === auth.currentUser.email
    );
    return selectedMessages;
  }

  return (
    <ChatContainer>
      <TopBar friend={selectedFrd} setSelectedFrd={setSelectedFrd} />
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
            getMessagesFromFriend(selectedFrd.email).map(
              ({ id, text, photoURL, uid }) => {
                if (uid === auth.currentUser.uid) {
                  return (
                    <SenderBubble>
                      <MessageTxt>{text}</MessageTxt>
                      <PersonPic src={photoURL} alt="" />
                    </SenderBubble>
                  );
                } else {
                  return (
                    <ReceiverBubble>
                      <PersonPic src={photoURL} alt="" />
                      <MessageTxt>{text}</MessageTxt>
                    </ReceiverBubble>
                  );
                }
              }
            )
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
