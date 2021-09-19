import { db, auth } from "../firebase";
import firebase from "firebase";
import { storage } from "../firebase";
import {
  analyzeSentiment,
  keyPhraseExtraction,
  getOCR,
  getImageFeatures,
} from "./AzureTextUtils";
import { uploadData } from "../AxiosDB/AxiosTest";

async function SendMessage({ selectedFrd, msg, files, setFiles }) {
  if (!msg && !files) return;
  const { uid, photoURL, displayName, email } = auth.currentUser;
  let data = [];
  if (files) {
    for (let i = 0; i < files.length; i++) {
      // await uploadData(files[i].name)
      const storageRef = storage.ref();
      const filesRef = storageRef.child(files[i].name);
      await filesRef.put(files[i]);
      const fileURL = await filesRef.getDownloadURL();
      const start = files[i].name.indexOf(".jpg");
      const end = files[i].name.indexOf(".png");

      let landmark = "";
      if (!(start !== -1 && end !== -1)) {
        landmark = await uploadData(files[i].name);
        landmark = landmark.data.result;
      }

      const texts = await getOCR(fileURL);

      let extractedText = texts[0].lines.map((line) => line.text).join(" ");
      let tagsTexts = await getImageFeatures(fileURL);
      console.log(landmark, extractedText, tagsTexts);
      if (!landmark || typeof landmark !== "string") landmark = "";
      if (!extractedText) extractedText = "";
      if (!tagsTexts) tagsTexts = "";
      // const extractedText = "";
      // const tagsTexts = "";
      data.push({
        url: fileURL,
        filename: files[i].name,
        tagsTexts,
        text: extractedText,
        landmark,
      });
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
  // await AxiosDB()
  // return <AxiosDB />
}

export default SendMessage;
