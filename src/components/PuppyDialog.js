import Puppy1 from "../assets/puppy1.gif";
import Puppy2 from "../assets/puppy2.gif";
import Puppy3 from "../assets/puppy3.gif";

import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { summarize } from "./AzureTextUtils";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { DialogContent } from "@material-ui/core";

const StyledImg = styled.img``;

function PuppyDialog({ isPuppyOpen, setIsPuppyOpen }) {
  const handleClose = () => setIsPuppyOpen(false);

  const Pup = [Puppy1, Puppy2, Puppy3];
  return (
    <Dialog open={isPuppyOpen} onClose={handleClose}>
      <DialogContent>
        <StyledImg src={Pup[parseInt(Math.random(1) * 3)]} />
      </DialogContent>
    </Dialog>
  );
}

export default PuppyDialog;
