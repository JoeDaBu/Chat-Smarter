import { db, auth } from "../firebase";
import firebase from "firebase";
import { analyzeSentiment, keyPhraseExtraction } from "./AzureTextUtils";

async function SendMessage({ selectedFrd, msg }) {
  const { uid, photoURL, displayName, email } = auth.currentUser;

  const keywords = await keyPhraseExtraction(msg);
  const sentiment = await analyzeSentiment(msg);

  await db.collection("msgs").add({
    text: msg,
    photoURL,
    uid,
    sentByName: displayName,
    keywords,
    sentiment,
    sentByEmail: email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    sentToName: selectedFrd.name,
    sentToEmail: selectedFrd.email,
  });
}

export default SendMessage;
