import React, { useEffect } from 'react'
import './App.css';

const App=() => {

  useEffect(() => {
    const imageFilter= () => {
      let mat = window.cv.imread('#cartoonimg');
      window.cv.imshow('canvasOutput', mat);
      mat.delete();
    }
    imageFilter()
  }, [])

  return (
    <div className="App">
      <div className="main">
          <div>Cartoon Filter</div>
          <img id='cartoonimg' src='https://robohash.org/65.60.11.210.png'></img>
          <input placeholder='Paste image url'></input>
      </div>
    </div>
  );
}

export default App;
