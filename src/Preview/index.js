import React from "react";
import styled from "styled-components";

const PreviewContainer = styled.div`
  position: absolute;
  bottom: 100px;
  display: flex;
`;

const StyledImg = styled.img`
  height: 100px;
`;

export const Preview = ({ files }) => {
  if (!files) {
    return null;
  }
  let images = [];
  for (let i = 0; i < files.length; i++) {
    images.push(
      <StyledImg
        key={i}
        src={URL.createObjectURL(files[i])}
        alt={files[i].originalname}
      />
    );
  }
  return <PreviewContainer>{images}</PreviewContainer>;
};
