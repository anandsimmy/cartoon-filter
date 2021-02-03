import React, { useEffect, useState } from 'react'
import './App.css';

const App=() => {

  const [imgSrc, setImgSrc]= useState('')
  const [uploadedImg, setUploadedImg]= useState('')

  const uploadImg= (e) => {
    setUploadedImg(e.target.files[0])
  }

  useEffect(()=> {
    const fetchImage= async () => {
      let image= await fetch('/filter')
      image= await image.blob()
      const objectURL = URL.createObjectURL(image)
      setImgSrc(objectURL)
    }
    // fetchImage()
  }, [])

  const convertToBase64String= (file, cb) => {
    let myReader = new FileReader()
    if (file && file.type.match('image.*')) {
      myReader.readAsDataURL(file);
    }
    myReader.onloadend = function (e) {
        cb(myReader.result);
    };
  }

  const filterFile= async (file) => {
    let image= await fetch('/filter', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        img: file
      })
    })
    image= await image.blob()
    const objectURL = URL.createObjectURL(image)
    setImgSrc(objectURL)
  }

  const uploadFileHandler= (e) => {
    convertToBase64String(uploadedImg, filterFile)
  }

  return (
    <div className="App">
      <div className="main">
          <div>Cartoon Filter</div>
          <input id='url' placeholder='Paste image url'></input>
          <input type="file" id="myFile" onChange={uploadImg} accept="image/x-png,image/gif,image/jpeg,image/jpg,image/png"></input>
          <button onClick={uploadFileHandler}>Convert</button>
          {
            imgSrc && <img src={imgSrc} id='cartoon' className='filter-image' />
          }
      </div>
    </div>
  );
}

export default App;
