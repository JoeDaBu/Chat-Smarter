
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { storage } from '../firebase'
// http://34.130.173.179/trip/ 
// http://34.130.173.179/runeresult/
const fetchData = () => {
  return axios.get('http://34.130.173.179/runeresult/')
  .then((res) => {
    console.log('data', res.data)
    console.log(typeof res)
    return res.data
  })
  .catch((err) => {
    console.error(err)
  })
}

export const uploadData = (data) => {
  for (let i = 0; i < data.length; i++) {
    axios.post('http://34.130.173.179/runeresult/', {
      id: '',
      key: data[i],
      result: '',
    })
    .then(res => {
      console.log(res)
    })
  }

}

// export const filteredUploadData = (data) => {
//   for (let i = 0; i < data.length; i++) {
//       const start = data[i].indexOf('/o/')
//       const end = data[i].indexOf('?')
//       let filesApi = ''
//       if (start !== -1 && end !== -1) {
//         filesApi = d[i].substring(start+3, end)
//         console.log(filesApi)
//         if (!fileNames.includes(filesApi)) {
//           toUpload.push(filesApi)
//         }
//       }
//   }
// }

const AxiosDB = () => {
  // let [fileNames, setFileNames] = useState([])

  useEffect(() => {
    console.log('running')
      fetchData().then(async (files) => {

        if (files.length === 0) {
          return
        }
        const names = []
        for (let i = 0; i < files.length; i++) {
          const name = files[i].key
          if (!(names.includes(name))) {
            names.push(name)
          }

         
        }
        const dbNames = await downloadDB()
        // cosole.log(dbNames)
        const toUpload = await upload(names, dbNames)
        uploadData(toUpload)
        // console.log('test', toUpload[0])
        // // console.log(typeof Object.values(toUpload))
        // for (let i = 0; i < toUpload.length; i++) {
        //   console.log(toUpload[i])
        // }
        // console.log(typeof toUpload)
      });


  }, [])
  
  // const filter = async (data) => {
  //   const names = fileNames
  //   for (let i = 0; i < data.length; i++) {
  //     const name = data[i].key
  //     if (!(names.includes(name))) {
  //       names.push(name)
  //       await uploadData(name)
  //     }
  //   }
  //   await setFileNames(names)
  // }


  const downloadDB = async () => {
        let dbNames = []
        const listRef = storage.ref()
        const refs = await listRef.listAll()
          for (let i = 0; i < refs.items.length; i++) {
            const url = await refs.items[i].getDownloadURL()
            dbNames.push(url)
          }
        return dbNames
  }


  const upload = async (fileNames, dbFiles) => {
    let toUpload = []
    for (let i = 0; i < dbFiles.length; i++) {
      const start = dbFiles[i].indexOf('/o/')
      const end = dbFiles[i].indexOf('?')
      let filesApi = ''
      if (start !== -1 && end !== -1) {
        filesApi = dbFiles[i].substring(start+3, end)
        console.log(filesApi)
        if (!fileNames.includes(filesApi)) {
          toUpload.push(filesApi)
        }
      }  
    }
    return toUpload
  }

  // if (filts) {
  //   filter(data)
  // }

  return (
    <div>
      <p>
        hi
      </p>

    </div>
  )
}

export default AxiosDB  
