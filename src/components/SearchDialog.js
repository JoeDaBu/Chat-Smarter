import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent } from "@material-ui/core";
import ChatMessages from "./ChatMessages";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 500px;
`;

function SearchDialog({
  isSearchOpen,
  setIsSearchOpen,
  searchWords,
  messages,
  setSearchWords,
  selectedFrd,
}) {
  const filteredMessages = messages
    .filter(
      (msg) =>
        msg.text && msg.text.toLowerCase().includes(searchWords.toLowerCase())
    )
    .concat(
      messages.filter(
        (msg) =>
          msg.files &&
          msg.files[0] &&
          msg.files[0].text &&
          msg.files[0].text.toLowerCase().includes(searchWords.toLowerCase())
      )
    );

  function handleClose() {
    setIsSearchOpen(false);
    setSearchWords("");
  }

  return (
    <Dialog open={isSearchOpen} onClose={handleClose}>
      <DialogTitle>{`Search for: ${searchWords}`}</DialogTitle>
      <DialogContent>
        <StyledContainer>
          <ChatMessages selectedFrd={selectedFrd} messages={filteredMessages} />
        </StyledContainer>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
