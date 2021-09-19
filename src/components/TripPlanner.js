import React, { useState } from "react";
import { Dialog, DialogTitle, DialogActions, TextField } from '@mui/material';
import styled from "styled-components";
import { Button, DialogContent } from "@material-ui/core";
import { AddBox } from "@mui/icons-material";
import { DateTimePicker } from '@mui/lab';
import { StyledButton } from "./StyledStuff";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


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
   
    callback("Trip name: " + name + "  Time: " + time.toString() + "  Location: " + location);

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

      <StyledAddButton onClick={() => setIsOpen(true)}>
        <AddBox />
      </StyledAddButton>
      <Dialog open={isOpen} onClose={handleClose} modal={true}>
      <DialogTitle>Plan a Trip</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="normal"
            id="name"
            label="Name"
            fullWidth
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>

          <DateTimePicker
            required
            margin="normal"
            id="time"
            label="Date and Time"
            onChange={(e) => setTime(e.target.value)}
            renderInput={(params) => <TextField {...params} />}
          />
          </LocalizationProvider>
          <TextField
            required
            margin="normal"
            id="location"
            label="Location"
            fullWidth
            variant="outlined"
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
