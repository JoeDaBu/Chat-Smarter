import React, { useState } from "react";
import { auth } from "../firebase.js";
import { Button, InputLabel } from "@material-ui/core";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import sendMessage from "./SendMessageUtils";
import { StyledButton } from "./StyledStuff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";

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

const StyledOutButton = styled(StyledButton)`
  padding: 10px;
  font-size: 15px;
  border-radius: 0;
  font-weight: 600;
  position: absolute;
  right: 50px;
  width: 100px;
  top: 15px;
`;

const StyledFriendName = styled.div`
  padding-top: 23px;
`;

const StyledIconButton = styled(StyledButton)`
  position: absolute;
  left: 0;
  border-radius: 25px;
  height: 40px;
  width: 40px;
  margin-top: 10px;
`;

const StyledForm = styled.div`
  position: relative;
  top: 13px;
  margin-left: 15px;
  padding-left: 10px;
`;

function TopBar({
  friend,
  setSelectedFrd,
  searchWords,
  setSearchWords,
  setIsSearchOpen,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  function handleClose() {
    setIsOpen(false);
  }

  function handleChat(e) {
    e.stopPropagation();
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

  function handleSearch(e) {
    e.stopPropagation();
    setIsSearchOpen(true);
  }

  return (
    <TopBarContainer>
      <StyledIconButton onClick={() => setIsOpen(true)}>
        <AddIcon />
      </StyledIconButton>
      <StyledOutButton onClick={() => auth.signOut()}>Log Out</StyledOutButton>
      <StyledFriendName>
        {friend ? friend.name : `No friend chosen`}
      </StyledFriendName>
      <StyledForm>
        <Input
          type={"text"}
          value={searchWords}
          onChange={(e) => setSearchWords(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="search" onClick={handleSearch} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Search"
        />
      </StyledForm>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Add Friend</DialogTitle>
        <DialogContent>
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
