import React, { useEffect, useState } from 'react'
import Loader from './components/Loader'
import './App.css';

const App=() => {

  const [originalImageUrl, setOriginalImageUrl]= useState('')
  const [filteredImageUrl, setFilteredImageUrl]= useState(false)
  const [uploadedImg, setUploadedImg]= useState('')

  const uploadImg= (e) => {
    setUploadedImg(e.target.files[0])
  }

  const closeModal= () => {
      setFilteredImageUrl(false)
      const modal= document.querySelector('.modal')
      const overlay= document.querySelector('.overlay')
      modal.classList.remove('show')
      overlay.classList.remove('show')
  }

  const convertToBase64String= (file, cb) => {
    let myReader = new FileReader()
    if (file && file.type.match('image.*')) {
      myReader.readAsDataURL(file);
    }
    myReader.onloadend = function (e) {
        cb(myReader.result);
    };
  }

  const filterImage= async (file) => {
    setOriginalImageUrl(file)
    let image= await fetch('/cartoon', {
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
    setFilteredImageUrl(objectURL)
  }

  useEffect(()=>{
    const uploadFileHandler= () => {
      convertToBase64String(uploadedImg, filterImage)
    }
    if(uploadedImg){
      const modal= document.querySelector('.modal')
      const overlay= document.querySelector('.overlay')
      uploadFileHandler()
      modal.classList.add('show')
      overlay.classList.add('show')
    }
  }, [uploadedImg])

  return (
    <div className="App">
      <div className='overlay' onClick={closeModal}></div>
      <div className="main">
          <>
              <div className='title'>Cartoon Filter</div>
              <button className="upload" onClick={()=>document.getElementById('uploadImage').click()}>Upload Image</button>
          </>
          <input type="file" id="uploadImage" onChange={uploadImg}
            accept="image/x-png,image/gif,image/jpeg,image/jpg,image/png" style={{display:'none'}}></input>
          <div className="modal">
            {
              filteredImageUrl ?
              <>
                <div className='closeButton' onClick={closeModal}>
                  <i class="fas fa-times"></i>
                  </div>
                <div className='modal-title'>Converted Successfully!</div>
                <div className='images'>
                  <div className='originalImageContainer'>
                    <img src={originalImageUrl} id='original' className='original-image' />
                    <button><a className='downloadLink' href={filteredImageUrl} download='original.png'>Download Original <i class="fas fa-arrow-circle-down"></i></a></button>
                  </div>
                  <img src={'img/convert.png'} className='convertIcon' />
                  <div className='cartoonImageContainer'>
                    <img src={filteredImageUrl} id='cartoon' className='cartoon-image' />
                    <button><a className='downloadLink' href={filteredImageUrl} download='cartoon-filter.png'>Download <i class="fas fa-arrow-circle-down"></i></a></button>
                  </div>
                </div>
              </> : <Loader />
            }
          </div>
      </div>
    </div>
  );
}

export default App;
