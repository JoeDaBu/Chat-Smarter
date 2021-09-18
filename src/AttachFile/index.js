import React from 'react'
import './styles.css'
import { StyledPicButton } from './AttachFile.styles'
import ImageIcon from "@mui/icons-material/Image";

export const AttachFile = ({callback}) => {
  return (
    <div>
        <div className="form-group files">
          <input type="file"
                onChange = {callback}
                className="form-control" 
                multiple=""
                accept="image/x-png,image/jpeg" />
        </div>
        <button>Submit</button>
      {/* <StyledPicButton onClick = {callback} >
       
        <ImageIcon>
          
        </ImageIcon>
      </StyledPicButton> */}
    </div>
  )
}
