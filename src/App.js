import "./App.css";
import Chat from "./components/Chat";
import SignIn from "./components/SignIn";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import AxiosDB from "./AxiosDB";

const StyledChat = styled(Chat)`
  overflow: hidden;
  color: black;
`;

function App() {
  // const [user] = useAuthState(auth);
  // return <>{user ? <StyledChat /> : <SignIn />}</>;
  return <AxiosDB/>
}

export default App;
