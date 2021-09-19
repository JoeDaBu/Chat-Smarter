import "./App.css";
import Chat from "./components/Chat";
import SignIn from "./components/SignIn";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import AxiosDB from "./AxiosDB/AxiosTest";

const StyledChat = styled(Chat)`
  overflow: hidden;
`;

function App() {
  const [user] = useAuthState(auth);
  AxiosDB();
  return <>{user ? <StyledChat /> : <SignIn />}</>;
}

export default App;
