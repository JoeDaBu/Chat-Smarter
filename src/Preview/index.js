import React from 'react'
import image from '../Flag.png'

export const Preview = ({files}) => {
  if (!files) {
    return null
  }
  let images = []
  for (let i = 0; i < files.length; i++) {
    images.push(<img width='200px' height='200px' key={i} src={URL.createObjectURL(files[i])} alt={files[i].originalname}/>)
  }
  console.log(images)
  return (
    // files.map((file) => <img src={file.filename} alt={file.originalname} />
    // Array.from(files).forEach(file => <img src={file.filename} alt={file.originalname}/>)
    
    images
  );
}

