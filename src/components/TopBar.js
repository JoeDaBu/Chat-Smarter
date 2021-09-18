import React, { useState } from "react";
import { auth } from "../firebase.js";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import sendMessage from "./SendMessageUtils";

const TopBarContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  background-color: #fafafa;
  top: 0;
  border-bottom: solid 1px lightgray;
  z-index: 10;
  height: 67px;
`;

const StyledButton = styled(Button)`
  padding: 20px;
  font-size: 15px;
  border-radius: 0;
  font-weight: 600;
  position: absolute;
  right: 0;
`;

const StyledFriendName = styled.div`
  padding-top: 23px;
`;

const StyledIconButton = styled.button`
  position: absolute;
  left: 0;
  border: 0;
  border-radius: 25px;
  height: 40px;
  width: 40px;
  margin-top: 10px;
  background-color: transparent;
  transition: 0.2s;
  :hover {
    background-color: #d9d9d9;
  }
`;

function TopBar({ friend, setSelectedFrd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  function handleClose() {
    setIsOpen(false);
  }

  function handleChat() {
    const tempFriend = {
      name,
      email,
      photoURL,
    };
    sendMessage({ selectedFrd: tempFriend, msg: `Hey ${name}!` });
    setSelectedFrd(tempFriend);
    setName("");
    setEmail("");
    setPhotoURL("");
    setIsOpen(false);
  }

  return (
    <TopBarContainer>
      <StyledIconButton onClick={() => setIsOpen(true)}>
        <AddIcon />
      </StyledIconButton>
      <StyledButton onClick={() => auth.signOut()}>Log Out</StyledButton>
      <StyledFriendName>
        {friend ? friend.name : `No friend chosen`}
      </StyledFriendName>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Add Friend</DialogTitle>
        <DialogContent>
          <DialogContentText>Blah Bahs fkjaerkjghwfberjhvb</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="photoURL"
            label="Photo URL"
            type="url"
            fullWidth
            variant="standard"
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChat}>Let's Chat!</Button>
        </DialogActions>
      </Dialog>
    </TopBarContainer>
  );
}

export default TopBar;
