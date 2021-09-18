import React, {useRef} from 'react'
import { StyledPicButton } from './AttachFile.styles'
import ImageIcon from "@mui/icons-material/Image";

export const AttachFile = ({callback}) => {
  const inputFile = useRef(null)
  const onButtonClick = () => {
    inputFile.current.click()
  }
  return (
    <div onClick={() => {
      onButtonClick()
      // callback()
    }}>
      {/* <div className="form-group files">
          <input type="file"
                onChange = {callback}
                className="form-control" 
                accept="image/x-png,image/jpeg" 
                multiple />
        </div> */}
      {/* <button>Submit</button> */}
      <StyledPicButton>
        <input
          type="file"
          onChange={callback}
          className="form-control"
          accept="image/x-png,image/jpeg"
          multiple
          ref={inputFile}
          style={{display: 'none'}}
        />
        <ImageIcon></ImageIcon>
      </StyledPicButton>
    </div>
  );
}
