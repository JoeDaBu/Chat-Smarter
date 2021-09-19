import React, { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "../firebase";

// http://34.130.173.179/trip/
// http://34.130.173.179/runeresult/
const fetchData = () => {
  return axios
    .get("http://34.130.173.179/runeresult/")
    .then((res) => {
      // console.log("data", res.data);
      // console.log(typeof res);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export async function uploadData(filename) {
  console.log(filename);
  const res = await axios.post("http://34.130.89.27/runeresult/", {
    id: "",
    key: filename,
    result: "aaa",
  });
  console.log(res);
  return res;
}

const AxiosDB = () => {
  useEffect(() => {
    fetchData().then(async (files) => {
      if (files.length === 0) {
        return;
      }
      const names = [];
      for (let i = 0; i < files.length; i++) {
        const name = files[i].key;
        if (!names.includes(name)) {
          names.push(name);
        }
      }
      const dbNames = await downloadDB();
      // cosole.log(dbNames)
      const toUpload = await upload(names, dbNames);
      uploadData(toUpload);
    });
  }, []);

  const downloadDB = async () => {
    let dbNames = [];
    const listRef = storage.ref();
    const refs = await listRef.listAll();
    for (let i = 0; i < refs.items.length; i++) {
      const url = await refs.items[i].getDownloadURL();
      dbNames.push(url);
    }
    return dbNames;
  };

  const upload = async (fileNames, dbFiles) => {
    let toUpload = [];
    for (let i = 0; i < dbFiles.length; i++) {
      const start = dbFiles[i].indexOf("/o/");
      const end = dbFiles[i].indexOf("?");
      let filesApi = "";
      if (start !== -1 && end !== -1) {
        filesApi = dbFiles[i].substring(start + 3, end);
        // console.log(filesApi);
        if (!fileNames.includes(filesApi)) {
          toUpload.push(filesApi);
        }
      }
    }
    return toUpload;
  };

  return (
    <div>
      <p>hi</p>
    </div>
  );
};

export default AxiosDB;
