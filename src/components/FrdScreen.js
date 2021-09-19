import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import styled from "styled-components";

const EachFriend = styled.div`
  margin: 5px;
  padding: 5px;
  border-bottom: #dbdbdb 1px solid;
  display: flex;
`;

const Message = styled.div``;
const UnreadMessage = styled.div`
  font-weight: bold;
`;

const ProfilePhoto = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const RightSide = styled.div`
  padding: 0 5px;
`;

const StyledName = styled.div`
  font-size: 20px;
`;

function FrdScreen({ setSelectedFrd, messages, selectedFrd }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const tempFriends = [];
    const allUniqueEmails = [
      ...new Set(
        messages
          .map((msg) => msg.sentByEmail)
          .filter((email) => email !== auth.currentUser.email)
          .concat(
            messages
              .map((msg) => msg.sentToEmail)
              .filter((email) => email !== auth.currentUser.email)
          )
      ),
    ];

    allUniqueEmails.forEach((email) => {
      const newestMsgOverall = messages
        .filter(
          (msg) =>
            (msg.sentByEmail === email &&
              msg.sentToEmail === auth.currentUser.email) ||
            (msg.sentToEmail === email &&
              msg.sentByEmail === auth.currentUser.email)
        )
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        });

      const newestMsg = newestMsgOverall
        .filter((msg) => msg.sentByEmail === email)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })[0];
      if (newestMsg) {
        const tempFriend = {
          name: newestMsg.sentByName,
          email: newestMsg.sentByEmail,
          createdAt: newestMsg.createdAt,
          photoURL: newestMsg.photoURL,
          message:
            newestMsgOverall[0].sentToEmail === email
              ? `You: ${newestMsgOverall[0].text}`
              : newestMsgOverall[0].text,
          read: newestMsg.read,
          id: newestMsg.id,
          uid: newestMsg.uid,
        };
        tempFriends.push({ ...tempFriend });
      }
    });

    if (!selectedFrd) {
      setSelectedFrd(tempFriends[0]);
    }

    setFriends(
      tempFriends.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );
  }, [messages]);

  function handleFriendClick(friend) {
    db.collection("msgs")
      .where("sentByEmail", "==", friend.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("msgs").doc(doc.id).update({ read: true });
        });
      });

    setSelectedFrd(friend);
  }

  return (
    <div>
      {friends.map((friend, index) => {
        console.log(friend);
        const msg = friend.read ? (
          <Message>{friend.message}</Message>
        ) : (
          <UnreadMessage>{friend.message}</UnreadMessage>
        );
        return (
          <EachFriend
            key={`friend${index}`}
            onClick={() => handleFriendClick(friend)}
          >
            <ProfilePhoto src={friend.photoURL} />
            <RightSide>
              <StyledName>{friend.name}</StyledName>
              {msg}
            </RightSide>
          </EachFriend>
        );
      })}
    </div>
  );
}

export default FrdScreen;
