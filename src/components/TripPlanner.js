import React, { useState } from "react";

import { Dialog, DialogTitle, DialogActions, TextField } from '@mui/material';

import styled from "styled-components";
import { Button, DialogContent } from "@material-ui/core";
import AddBox from "@mui/icons-material/Image";
import DateTimePicker from 'react-datetime-picker'
import { StyledButton } from "./StyledStuff";


export const StyledAddButton = styled(StyledButton)`
  border-radius: 25px;
  height: 50px;
  width: 50px;
`;

function TripPlanner({ isOpen, setIsOpen, callback }) {
  const handleClose = () => setIsOpen(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState("");
  
  function handlePlan(e) {
    e.stopPropagation();
   
    callback("Trip name: " + this.state.name + "\nTime: " + this.state.time + "\nLocation: " + this.state.location);

    setName("");
    setTime(new Date());
    setLocation("");
    setIsOpen(false);
  }
  return (
    // <div 
    // onClick={() => {
    //   onButtonClick()
    //   // callback()
    // }}>
    <div>

      <StyledAddButton>
        <AddBox />
      </StyledAddButton>
      <Dialog open={isOpen} onClose={handleClose} modal={true}>
      <DialogTitle>Plan a Trip</DialogTitle>
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
          <DateTimePicker
            required
            margin="dense"
            id="time"
            label="Date and Time"
            fullWidth
            variant="standard"
            onChange={(e) => setTime(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="location"
            label="Location"
            fullWidth
            variant="standard"
            onChange={(e) => setLocation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePlan}>Plan the trip!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TripPlanner;
