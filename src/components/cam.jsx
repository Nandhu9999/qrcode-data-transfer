import * as React from "react";
import QrcodeDecoder from 'qrcode-decoder';
var qr = new QrcodeDecoder;

const videoConstraints = {
  audio:false,
  video:{
    width:720,
    height:720,
    facingMode: "environment"
  }
}


const RECORD_DATA = {
  raw: "",
  frames: [],
  ids: []
}


async function init(){
  try{
    const stream = await navigator.mediaDevices.getUserMedia(videoConstraints);
    console.log("success");
    return stream;
  }
  catch(e){
    console.log("error")
    return null
  }
}
  
export default function Cam({setMessage}) {
  
  const videoElem = React.useRef(null);
  const canvasElem = React.useRef(null);
  const [ctx,setCtx] = React.useState(null);
  const [isReceivingFile, setIsReceivingFile] = React.useState(false);
  
  React.useEffect(()=>{
    let errCount = 0;
    console.log("once...")
    setCtx(canvasElem.current.getContext("2d"))
    
    async function run(){   
      const srcObj = await init()
      videoElem.current.srcObject = srcObj;
    }
    run();
    
  },[])

  function videoPlaying(){
    console.log("video is playing...")
    setInterval(drawFrame,100)
  }
  
  function drawFrame(){
    if(videoElem.current && ctx){
      const calc = (720 - videoElem.current.offsetLeft)
      ctx.drawImage(videoElem.current, 0, 0 , 720, 720, 0, 0, 720, 720);
      const imgURL = canvasElem.current.toDataURL("image/jpeg", .95);
      const img = new Image()
      img.onload = ()=>{
        qr.decodeFromImage(img).then((res) => {
          if(res) {
            setMessage(res.data);
//             if(isReceivingFile == false){
//             }else{
//               // if(res.data.startsWith("data:")){RECORD_DATA.raw = ""; RECORD_DATA.frames.length = 0; }
//               // else if(res.data.endsWith(":endme")){setIsReceivingFile(false);RECORD_DATA.raw += res.data.split(":endme")[0]}
//               // else{ 
//               //   console.log(res.data);
//               //   RECORD_DATA.raw += res.data;
//               // }
              
//               if( res.data.endsWith(":endme") ){
//                 setIsReceivingFile(false);
//               }
              if(res.data.startsWith("data:")){
                if( RECORD_DATA.ids.includes("data:") == false ) {
                    RECORD_DATA.frames.push(res.data)
                    RECORD_DATA.ids.push("data:")
                }
              }else{
                const splitted = res.data.split("id:")
                
                if( RECORD_DATA.ids.includes(splitted[0]) == false ) {
                    RECORD_DATA.ids.push(splitted[0])
                    RECORD_DATA.frames.push(splitted[1])
                }
              }
//             } 
          }
        });
      }
      img.src = imgURL
      
    }
  }
  
  function recvFile(){
    setIsReceivingFile(true);
    console.log("is receiving file..")
  }
  function viewFile(){
    setIsReceivingFile(false);
    RECORD_DATA.raw = RECORD_DATA.frames.join("")
    console.log(RECORD_DATA)
    window.open(RECORD_DATA.raw, "_blank");
  }
  
  return (
    <div>
      <div style={{textAlign:"center", position:"relative"}}>
        <video 
          onPlaying={videoPlaying}
          style={{aspectRatio:"1 / 1", maxWidth:"500px", width: "100%", background:"black", scale: "-1 1", visibility:"hidden"}}
          playsInline
          autoPlay
          ref={videoElem}
        >
        </video>
        <canvas 
          ref={canvasElem}
          width={720}
          height={720}
          style={{position:"absolute",zIndex:"1",left:"50%",translate:"-50% 0",
                  aspectRatio:"1 / 1", maxWidth:"500px", width: "100%"}}>
        </canvas>
      </div>
      
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"40px"}}>
            <button onClick={recvFile}>RECV file</button>
            <button onClick={viewFile}>VIEW file</button>
      </div>
      
    </div>
  );
}
