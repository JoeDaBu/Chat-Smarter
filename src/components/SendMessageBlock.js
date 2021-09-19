import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import sendMessageUtils from "./SendMessageUtils";
import TripPlanner from "./TripPlanner";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import { StyledButton } from "./StyledStuff";
import { AttachFile } from "../AttachFile";
import { Preview } from "../Preview";

const StyledSendButton = styled(StyledButton)`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const StyledForm = styled.form`
  width: 100%;
`;

function SendMessageBlock({ selectedFrd }) {
  const [msg, setMsg] = useState("");
  const [files, setFiles] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    await sendMessageUtils({ selectedFrd, msg, files, setFiles });
    setMsg("");
  }
  const onInputChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const files = e.target.files;
    setFiles(files);
  };

  return (
    <div>
      <div className="sendMsg">
        <AttachFile callback={onInputChange} />
        <TripPlanner isOpen={isOpen} setIsOpen={setIsOpen} callback={setMsg} />
        <Preview files={files} />
        <StyledForm method="post" action="#" onSubmit={sendMessage}>
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
          <StyledSendButton type="submit">
            <SendIcon />
          </StyledSendButton>
        </StyledForm>
      </div>
    </div>
  );
}

export default SendMessageBlock;
