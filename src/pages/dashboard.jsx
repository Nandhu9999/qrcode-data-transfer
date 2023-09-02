import React from "react";
import { animated } from "react-spring";
import { useWiggle } from "../hooks/wiggle";
import { Link } from "wouter";
import Navbar from "../components/navbar.jsx";
import QR from "../components/qr.jsx";
import Cam from "../components/cam.jsx";

const DATA = {
  raw: "", 
  frames: []
}

function createTransfer(){
  DATA.frames.length = 0
  let str = ""
  let frameCount = 0;
  let maxStr = 256;
  let maxFrames = Math.round(DATA.raw.length / maxStr);
  for(let i in DATA.raw){
    str += DATA.raw[i]
    if(str.length == maxStr){
      if(str.startsWith("data:")){
        DATA.frames.push(str);
      }else{
        DATA.frames.push( frameCount + "/" + maxFrames + "id:" + str);
      }
      str = "";
      frameCount += 1;
    }
  }
      DATA.frames.push(frameCount + "/" + maxFrames + "id:" + str);
      str = "";
  console.log(DATA)
}

export default function Home() {
  const [userType, setUserType] = React.useState(0) // 0 = SEND, 1 = RECV
  const [qrmsg, setQRmsg] = React.useState("hello world")
  
  const fileInputElem = React.useRef(null)
  
  function setQRmsgFromCam(msg){
    setQRmsg(msg)
  }
  
  function fileInput(evt){
    const selectedFile = fileInputElem.current.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.addEventListener('load', function(event) {
          const dataURL = event.target.result;
          DATA.raw = dataURL
          createTransfer()
        });
      reader.readAsDataURL(selectedFile);
    }
  }
  
  function playFrames(){
    console.log("playing all frames..")
    let DELAY = 200
    for(let fid in DATA.frames){
      setTimeout(()=>{setQRmsg(DATA.frames[fid])}, fid * DELAY)
    }
  }
  

  return (
    <div style={{height:"100%",width:"100%",overflow:"hidden",display:"grid", gap:"5px",
                gridTemplateRows:"min-content min-content min-content auto", padding:"5px"}}>
      
      <Navbar>
        <button onClick={(evt)=>{setUserType(0)}}>SEND</button>
        <button onClick={(evt)=>{setUserType(1)}}>RECV</button>
      </Navbar>
      
      <div>
        {userType == 0 && <QR message={qrmsg}/>}
        {userType == 1 && <Cam setMessage={setQRmsgFromCam}/>}
      </div>
      
      <div>
        {userType == 0 && (
          <div style={{height:"40px", textAlign:"center"}}>
            <button onClick={playFrames}>PLAY file</button>
          </div>)
        }
      </div>
      
      <div style={{display:"flex", justifyContent:"center"}}>
        
        {userType == 0 && (
          <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <textarea 
              style={{width:"calc(100% - 10px)", maxWidth:"500px",fontSize:"1.2rem",padding:"10px", resize:"none", marginBottom:"10px"}}
              onInput={(e)=>setQRmsg(e.target.value)}
              value={qrmsg}>
            </textarea>
            <input type="file" ref={fileInputElem} onChange={fileInput} />
          </div>)
        }
        
        {userType == 1 && (
          <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <textarea
              disabled={true}
              style={{width:"calc(100% - 10px)", maxWidth:"500px",fontSize:"1.2rem",padding:"10px", resize:"none",
                      marginBottom:"10px",background:"black", color:"white"}}
              value={qrmsg}>
            </textarea>
          </div>)
        }
      </div>
      
    </div>
  );
}
