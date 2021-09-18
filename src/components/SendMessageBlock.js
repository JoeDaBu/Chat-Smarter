import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import sendMessageUtils from "./SendMessageUtils";
import ImageIcon from "@mui/icons-material/Image";
import styled from "styled-components";

const StyledPicButton = styled.button`
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
              width: "70%",
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              marginBottom: "-3px",
            }}
            placeholder="Message..."
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <Button
            style={{
              width: "18%",
              fontSize: "15px",
              fontWeight: "550",
              margin: "4px 0 -13px 0",
              maxWidth: "200px",
            }}
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMessageBlock;
