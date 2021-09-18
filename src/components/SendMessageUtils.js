import { db, auth } from "../firebase";
import firebase from "firebase";
import { storage } from '../firebase';
  // const uploadToFirebase = () => {
  //   if (file) {
  //     const storageRef = storage.ref()
  //     const fileRef = storageRef.child(file.name)
  //     fileRef.put(file)
  //     .then(()=> {
  //       alert("Image uploaded")
  //     })
  //   }
  // }


async function SendMessage({ selectedFrd, msg, file }) {
  const { uid, photoURL, displayName, email } = auth.currentUser;
  let data = null
  if (file) {
    const storageRef = storage.ref()
    const fileRef = storageRef.child(file.name)
    console.log('working')
    console.log(storageRef, fileRef)
    data = fileRef.toString()
    fileRef.put(file)
    .then(()=> {
      alert("Image uploaded")
    })
  }
  // const data = new FormData()
  // data.append('file', file)

  await db.collection("msgs").add({
    text: msg,
    photoURL,
    uid,
    sentByName: displayName,
    sentByEmail: email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    sentToName: selectedFrd.name,
    sentToEmail: selectedFrd.email,
    files: data,
  });
}

export default SendMessage;
