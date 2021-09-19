import React, { useEffect } from 'react'
import axios from 'axios'
// http://34.130.173.179/trip/ 

const fetchData = () => {
  return axios.get('http://34.130.173.179/trip/')
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err)
  })
}

const AxiosDB = () => {
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div>
      
    </div>
  )
}

export default AxiosDB  
