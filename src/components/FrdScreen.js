import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import { db, auth } from "../firebase";
import styled from "styled-components";

const EachFriend = styled(Paper)`
  margin: 5px;
`;

const Message = styled.div``;

function FrdScreen({ setSelectedFrd, messages }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const tempFriends = [];
    const allUniqueEmails = [
      ...new Set(
        messages
          .map((msg) => msg.sentByEmail)
          .filter((email) => email !== auth.currentUser.email)
      ),
    ];

    allUniqueEmails.forEach((email) => {
      const newestMsg = messages
        .filter((msg) => msg.sentByEmail === email)
        .sort((a, b) => {
          return a.createdAt - b.createdAt;
        })[0];
      const tempFriend = {
        name: newestMsg.sentByName,
        email: newestMsg.sentByEmail,
        createdAt: newestMsg.createdAt,
        photoURL: newestMsg.photoURL,
        message: newestMsg.text,
      };
      tempFriends.push({ ...tempFriend });
    });

    setFriends(tempFriends);
  }, [messages]);

  function handleFriendClick(friend) {
    setSelectedFrd(friend);
  }

  return (
    <div>
      {friends.map((friend, index) => {
        return (
          <EachFriend
            key={`friend${index}`}
            onClick={() => handleFriendClick(friend)}
          >
            <div>{friend.name}</div>
            <Message>{friend.message}</Message>
          </EachFriend>
        );
      })}
    </div>
  );
}

export default FrdScreen;
