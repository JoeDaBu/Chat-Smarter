import React from 'react'
import './styles.css'
import { StyledPicButton } from './AttachFile.styles'
import ImageIcon from "@mui/icons-material/Image";

export const AttachFile = ({callback}) => {
  return (
    <div>
      <form method="post" action="#" id="#">
        <div className="form-group files">
          <input type="file"
                onChange = {callback}
                className="form-control" 
                multiple="" />
        </div>
        <button>Submit</button>
      </form>
      {/* <StyledPicButton onClick = {callback} >
       
        <ImageIcon>
          
        </ImageIcon>
      </StyledPicButton> */}
    </div>
  )
}
