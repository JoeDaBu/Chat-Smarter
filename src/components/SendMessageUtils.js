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
