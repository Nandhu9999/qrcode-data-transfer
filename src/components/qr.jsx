import * as React from "react";
import QRCode from "react-qr-code";

export default function QR({message}){ 
  
  
  return (
    <div style={{width:"100%"}}>
      <div style={{textAlign:"center"}}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "500px", width: "98%" }}
          value={message}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  )
}
