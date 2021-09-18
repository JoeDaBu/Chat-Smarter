import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { summarize } from "./AzureTextUtils";
import styled from "styled-components";

const StyledSummary = styled.div``;
const StyledLink = styled.a``;
const StyledImg = styled.img`
  width: 300px;
`;

function DefinitionDialog({ info, isOpen, setIsOpen }) {
  const [summary, setSummary] = useState("");
  if (!info) return <></>;
  const { extract, fullurl, title, thumbnail, images } = info;

  let imageSrc = "";
  if (thumbnail) {
    imageSrc = thumbnail.source;
  } else if (images) {
    imageSrc = `https://commons.wikimedia.org/wiki/Special:FilePath/${images[0].title
      .split(":")[1]
      .split(" ")
      .join("_")}`;
  }
  summarize(extract).then((res) => setSummary(res));

  const handleClose = () => setIsOpen(false);
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <StyledImg src={imageSrc} />
        <StyledSummary>{summary ? summary : `Loading`}</StyledSummary>
        <StyledLink href={fullurl}>{`See Wikipedia`}</StyledLink>
      </DialogContent>
    </Dialog>
  );
}

export default DefinitionDialog;
