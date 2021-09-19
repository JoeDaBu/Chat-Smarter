import styled from "styled-components";

const StyledButton = styled.button`
  border: 0;
  background-color: transparent;
  transition: 0.2s;
  :hover {
    background-color: #d9d9d9;
  }
`;

const StyledChatImg = styled.img`
  height: 150px;
`;

export { StyledButton, StyledChatImg };
