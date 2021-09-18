import { auth } from "../firebase";
import React, { useState } from "react";
import styled from "styled-components";
import RenderReceivedMessage from "./ReceivedMessage";
import DefinitionDialog from "./DefinitionDialog";

export const PersonPic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin: 5px;
`;

export const SenderBubble = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ReceiverBubble = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const MessageTxt = styled.div`
  border-radius: 5px;
  padding: 10px 15px;
  box-shadow: 1px 1px 2px 0 #0000002b;
`;

function ChatMessages({ selectedFrd, messages }) {
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      {selectedKeyword && (
        <DefinitionDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          info={selectedKeyword}
        />
      )}
      {getMessagesFromFriend(selectedFrd.email).map(
        ({ text, photoURL, uid, keywords }) => {
          if (uid === auth.currentUser.uid) {
            return (
              <SenderBubble>
                <MessageTxt>{text}</MessageTxt>
                <PersonPic src={photoURL} alt="" />
              </SenderBubble>
            );
          } else {
            return (
              <RenderReceivedMessage
                keywords={keywords}
                setIsOpen={setIsOpen}
                text={text}
                photoURL={photoURL}
                setSelectedKeyword={setSelectedKeyword}
              />
            );
          }
        }
      )}
    </>
  );
}

export default ChatMessages;
