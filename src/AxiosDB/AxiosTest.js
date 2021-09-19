
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



const AxiosDB = () => {


  useEffect(() => {

      fetchData().then(async (files) => {

        if (files.length === 0) {
          return
        }
        const names = []
        for (let i = 0; i < files.length; i++) {
          // console.log(files[i])
          const name = files[i].key
          if (!(names.includes(name))) {
            names.push(name)
          }

         
        } 
        const dbNames = await downloadDB()
        const toUpload = await upload(names, dbNames)
        console.log('test', toUpload)
      });


  }, [])
  
  // console.log(fileNames)

  const downloadDB = async () => {
    // setIsDBLoading(true)
        // setdbFiles([])
        let dbNames = []
        const listRef = storage.ref()
        const refs = await listRef.listAll()
          for (let i = 0; i < refs.items.length; i++) {
            const url = await refs.items[i].getDownloadURL()
            dbNames.push(url)
          }
          // return dbNames
        return dbNames
  }

  // useEffect(() => {
  //   // storage.ref().listAll().then( res => {
  //   //   res.items.forEach( item => item.getDownloadURL().then(
  //   //     (downloadURLs) => {
  //   //       setdbFiles(...{ download: downloadURLs, itemList: res.items });
  //   //       // console.log(dbFiles)
  //   //     })
  //   //   )
  //   // // })
  //   // setTimeout(() => {
  //   // if (isApiLoading) {
  //   //   return
  //   // }
  //   // console.log('test2')
  //   // console.log(fileNames)
  //   // console.log(fileNames)
    
  //   // }, 1000)
    
  //     // res.items.forEach((itemRef) =>{
  //     //   itemRef.getDownloadURL().then((link) => {
  //         // console.log(link)
  //         // console.log(typeof link)
          
  //   //     })
  //   //   })
  //   // })
  // }, [])

  // console.log("db", dbFiles)

  const upload = async (fileNames, dbFiles) => {
    // console.log('wrrk')
    // setToAdd([])
    let toUpload = []
    for (let i = 0; i < dbFiles.length; i++) {
      const start = dbFiles[i].indexOf('/o/')
      const end = dbFiles[i].indexOf('?')
      let filesApi = ''
      if (start !== -1 && end !== -1) {
        filesApi = dbFiles[i].substring(start+3, end)
        console.log(filesApi)
        // console.log(filesApi)
        // console.log('test')
        if (!fileNames.includes(filesApi)) {
          toUpload.push(filesApi)
          // setToAdd(old => [...old, filesApi])
        }
      }
      
    }
    return toUpload
  }

  // useEffect(() => {
  //   // setTimeout(() => {
      
  //     // setTimeout(() => {
  //     //   console.log(toAdd.length, dbFiles.length, fileNames.length)
  //     //   console.log(fileNames)
  //     // }, 5000)
      

  //   // }, 1000)

  // }, [isApiLoading, isDBLoading])
 
  // const test = listRef.listAll().then((res) => {
  //   res.items.map((itemRef) =>{
  //     itemRef.getDownloadURL()
  //   }
  // };
  // console.log(compareFiles(fileNames, dbFiles))
  // console.log("start test")
  // // console.log(dbFiles.length)
  // // console.log(typeof dbFiles.every)
  // // console.log(dbFiles)
  // console.log(fileNames)
  // console.log(files[0])
  // console.log(dbFiles)
  // console.log(typeof dbFiles)
  // console.
  // let toAdd = []
  // let filesApi = ''


  // console.log("2", dbFiles)


  // console.log(test)
  // for (file in files) {
  //   for ()
  //   if file.key
  // }

  // console.log(test.toString())
  return (
    <div>
      <p>
        hi
      </p>

    </div>
  )
}

export default AxiosDB  
