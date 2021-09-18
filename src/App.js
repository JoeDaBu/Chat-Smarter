import "./App.css";
import Chat from "./components/Chat";
import SignIn from "./components/SignIn";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";

const StyledChat = styled(Chat)`
  overflow: hidden;
`;

function App() {
  const [user] = useAuthState(auth);
  return <>{user ? <StyledChat /> : <SignIn />}</>;
}

export default App;
