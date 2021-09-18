import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { summarize } from "./AzureTextUtils";
import styled from "styled-components";

const StyledSummary = styled.div``;

const StyledLink = styled.a`
  text-decoration: None;
`;

const StyledLinkContainer = styled.div`
  margin: 10px 0;
`;

const StyledImg = styled.img`
  width: 300px;
`;

const StyledImgContainer = styled.div`
  margin: auto;
  padding: 20px;
`;

const StyledContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
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
  summarize(extract).then((res) => setSummary(`${res.substr(0, 500)}...`));

  const handleClose = () => setIsOpen(false);
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <StyledContent>
        <StyledImgContainer>
          <StyledImg src={imageSrc} />
        </StyledImgContainer>
        <StyledSummary>{summary ? summary : `Loading`}</StyledSummary>
        <StyledLinkContainer>
          <StyledLink href={fullurl}>{`See Wikipedia`}</StyledLink>
        </StyledLinkContainer>
      </StyledContent>
    </Dialog>
  );
}

export default DefinitionDialog;
