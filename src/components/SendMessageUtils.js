import { db, auth } from "../firebase";
import firebase from "firebase";

async function SendMessage({ selectedFrd, msg }) {
  const { uid, photoURL, displayName, email } = auth.currentUser;

  await db.collection("msgs").add({
    text: msg,
    photoURL,
    uid,
    sentByName: displayName,
    sentByEmail: email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    sentToName: selectedFrd.name,
    sentToEmail: selectedFrd.email,
  });
}

export default SendMessage;
