import axios from 'axios'
import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import sendMessageUtils from "./SendMessageUtils";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import { StyledButton } from "./StyledStuff";
import { AttachFile } from "../AttachFile";
import { Preview } from '../Preview';

// const StyledPicButton = styled(StyledButton)`
//   border-radius: 25px;
//   height: 50px;
//   width: 50px;
// `;

const StyledSendButton = styled(StyledButton)`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

function SendMessageBlock({ selectedFrd }) {
  const [msg, setMsg] = useState("");
  const [files, setFiles] = useState(null)


  async function sendMessage(e) {
    e.preventDefault();
    await sendMessageUtils({ selectedFrd, msg, files });
    setMsg("");
  }
  const onInputChange = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const files = e.target.files
    console.log(files)
    setFiles(files)

  }

  // const onSubmit = (e) => {
  //   e.preventDefault()
  //   const data = new FormData()
  //   data.append('file', file)
  //   axios.post('//localhost:3000/upload', data)
  //     .then((e) => {
  //       console.log('success')
  //     })
  //     .catch(e => {
  //       console.error('Error', e)
  //     })
  //   sendMessage(e)
  // }

  return (
    <div>
      <form method = "post" action='#' onSubmit={sendMessage}>
        <div className="sendMsg">
          <AttachFile callback = {onInputChange} />
          <Preview files={files}/>
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
        </div>
      </form>
    </div>
  );
}

export default SendMessageBlock;
