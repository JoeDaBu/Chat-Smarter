import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import sendMessageUtils from "./SendMessageUtils";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import { StyledButton } from "./StyledStuff";

const StyledPicButton = styled(StyledButton)`
  border-radius: 25px;
  height: 50px;
  width: 50px;
`;

const StyledSendButton = styled(StyledButton)`
  position: absolute;
  right: 70px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  @media (max-width: 900px) {
    right: 50px;
  }
`;

function SendMessageBlock({ selectedFrd }) {
  const [msg, setMsg] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    await sendMessageUtils({ selectedFrd, msg });
    setMsg("");
  }

  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className="sendMsg">
          <StyledPicButton>
            <ImageIcon />
          </StyledPicButton>
          <Input
            style={{
              width: "calc(90% - 100px)",
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              marginRight: '50px',
              marginBottom: "-3px",
            }}
            placeholder="Message..."
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <StyledSendButton type="submit">
            <SendIcon />
          </StyledSendButton>
        </div>
      </form>
    </div>
  );
}

export default SendMessageBlock;
