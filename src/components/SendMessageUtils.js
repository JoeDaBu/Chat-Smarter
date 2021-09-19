import { db, auth } from "../firebase";
import firebase from "firebase";
import { storage } from "../firebase";
import {
  analyzeSentiment,
  keyPhraseExtraction,
  getOCR,
  getImageFeatures,
} from "./AzureTextUtils";
import AxiosDB, { uploadData } from "../AxiosDB/AxiosTest";

// const fileURL = ''

async function SendMessage({ selectedFrd, msg, files, setFiles }) {
  if (!msg && !files) return;
  const { uid, photoURL, displayName, email } = auth.currentUser;
  let data = [];
  // console.log('test2')
  if (files) {
    for (let i = 0; i < files.length; i++) {
      // await uploadData(files[i].name)
      const storageRef = storage.ref();
      const filesRef = storageRef.child(files[i].name);
      await filesRef.put(files[i]);
      const fileURL = await filesRef.getDownloadURL();
      const start = files[i].name.indexOf('.jpg')
      const end = files[i].name.indexOf('.png')
      // let filesApi = ''
      if (!(start !== -1 && end !== -1)) {
        await uploadData(files[i].name)
      }
      

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
      // console.log('test')
    }  
    // await AxiosDB(filts={true} data={toUpload})
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
