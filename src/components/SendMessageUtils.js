import { db, auth } from "../firebase";
import firebase from "firebase";
import { storage } from "../firebase";
import {
  analyzeSentiment,
  keyPhraseExtraction,
  getOCR,
  getImageFeatures,
} from "./AzureTextUtils";

// const fileURL = ''

async function SendMessage({ selectedFrd, msg, files, setFiles }) {
  if (!msg && !files) return;
  const { uid, photoURL, displayName, email } = auth.currentUser;
  let data = [];
  console.log('test2')
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const storageRef = storage.ref();
      const filesRef = storageRef.child(files[i].name);
      await filesRef.put(files[i]);
      const fileURL = await filesRef.getDownloadURL();

      // const texts = await getOCR(fileURL);
      // const extractedText = texts[0].lines.map((line) => line.text).join(" ");
      // const tagsTexts = await getImageFeatures(fileURL);
      console.log("test")
      console.log(fileURL)
      const extractedText = "";
      const tagsTexts = "";
      data.push({
        url: fileURL,
        filename: files[i].name,
        text: extractedText.concat(" ", tagsTexts),
      });
      console.log('test')
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
