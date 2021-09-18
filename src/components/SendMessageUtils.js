import { db, auth } from "../firebase";
import firebase from "firebase";
import { storage } from '../firebase';
import { analyzeSentiment, keyPhraseExtraction } from "./AzureTextUtils";



async function SendMessage({ selectedFrd, msg, files }) {
  const { uid, photoURL, displayName, email } = auth.currentUser;
  let data = []
  console.log(files)
  if (files) {
      for (let i = 0; i<files.length; i++) {
        const storageRef = storage.ref()
        const filesRef = storageRef.child(files[i].name)
        console.log('working')
        console.log(storageRef, filesRef)
        data.push(filesRef.toString())
        filesRef.put(files[i])
        // .then(()=> {
        //   alert("Image uploaded")
        // })
      }

  }


  // const data = new FormData()
  // data.append('file', file)

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
    files: data,
  });
}

export default SendMessage;
