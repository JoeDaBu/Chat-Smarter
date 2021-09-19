import { auth } from "../firebase";
import React, { useState } from "react";
import styled from "styled-components";
import RenderReceivedMessage from "./ReceivedMessage";
import DefinitionDialog from "./DefinitionDialog";
import PuppyDialog from "./PuppyDialog";
import { StyledChatImg } from "./StyledStuff";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

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

const IconContainer = styled.div`
  position: relative;
  left: 15px;
  bottom: 10px;
  background: white;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  cursor: pointer;
`;

function ChatMessages({ selectedFrd, messages }) {
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPuppyOpen, setIsPuppyOpen] = useState(false);

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
      <PuppyDialog isPuppyOpen={isPuppyOpen} setIsPuppyOpen={setIsPuppyOpen} />
      {getMessagesFromFriend(selectedFrd.email).map(
        ({ text, photoURL, uid, keywords, sentiment, files }, i) => {
          if (uid === auth.currentUser.uid) {
            return (
              <SenderBubble key={`${i}`}>
                {sentiment === "negative" && (
                  <IconContainer onClick={() => setIsPuppyOpen(true)}>
                    <SentimentDissatisfiedIcon fontSize="large" />
                  </IconContainer>
                )}
                <MessageTxt>
                  {text && text}
                  {files &&
                    files.map((file) => <StyledChatImg src={file.url} />)}
                </MessageTxt>
                <PersonPic src={photoURL} alt="" />
              </SenderBubble>
            );
          } else {
            return (
              <RenderReceivedMessage
                key={`${text} ${i}`}
                files={files}
                setIsPuppyOpen={setIsPuppyOpen}
                sentiment={sentiment}
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
