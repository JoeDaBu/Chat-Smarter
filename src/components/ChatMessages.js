import { auth } from "../firebase";
import React from "react";
import styled from "styled-components";

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

function ChatMessages({ selectedFrd, messages }) {
  function getMessagesFromFriend(friendEmail) {
    const selectedMessages = messages.filter(
      (msg) =>
        (msg.sentByEmail === friendEmail &&
          msg.sentToEmail === auth.currentUser.email) ||
        (msg.sentByEmail === auth.currentUser.email &&
          msg.sentToEmail === friendEmail)
    );
    return selectedMessages.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
  }

  return getMessagesFromFriend(selectedFrd.email).map(
    ({ text, photoURL, uid }) => {
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
  );
}

export default ChatMessages;
