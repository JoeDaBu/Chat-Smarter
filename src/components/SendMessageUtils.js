import { db, auth } from "../firebase";
import firebase from "firebase";
import { storage } from "../firebase";
import { analyzeSentiment, keyPhraseExtraction } from "./AzureTextUtils";

async function SendMessage({ selectedFrd, msg, files, setFiles }) {
  if (!msg && !files) return;
  const { uid, photoURL, displayName, email } = auth.currentUser;
  let data = [];
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const storageRef = storage.ref();
      const filesRef = storageRef.child(files[i].name);
      await filesRef.put(files[i]);
      data.push({ url: await filesRef.getDownloadURL() });
    }
  }

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
    read: false,
    files: data,
  });
  if (setFiles) {
    setFiles(null);
  }
}

export default SendMessage;
