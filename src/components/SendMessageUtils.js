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
import { v4 as uuidv4 } from "uuid";

async function SendMessage({ selectedFrd, msg, files, setFiles }) {
  if (!msg && !files) return;
  const { uid, photoURL, displayName, email } = auth.currentUser;
  let data = [];
  let landmark = "";
  const FILENAME = uuidv4().concat(".", files[0].name.split(".")[1]);
  console.log(FILENAME);
  if (files) {
    for (let i = 0; i < files.length; i++) {
      // await uploadData(files[i].name)
      const storageRef = storage.ref();
      const filesRef = storageRef.child(FILENAME);
      await filesRef.put(files[i]);
      const fileURL = await filesRef.getDownloadURL();
      // const start = files[i].name.indexOf(".jpg");
      // const end = files[i].name.indexOf(".png");
      landmark = await uploadData(FILENAME);
      landmark = landmark.data.result;
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
        filename: FILENAME,
        tagsTexts,
        text: extractedText,
        landmark: landmark,
      });
    }
  }

  const keywords = await keyPhraseExtraction(msg);
  const sentiment = await analyzeSentiment(msg);
  const passMsg = msg ? msg : landmark ? landmark : "";
  await db.collection("msgs").add({
    text: passMsg,
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
