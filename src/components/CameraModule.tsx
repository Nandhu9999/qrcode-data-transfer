import { useRef, useState, useEffect } from "react";
import QrcodeDecoder from "qrcode-decoder";
var qr = new QrcodeDecoder();

const videoConstraints = {
  audio: false,
  video: {
    width: 720,
    height: 720,
    facingMode: "environment",
  },
};

const RECORD_DATA = {
  raw: "",
  frames: [],
  ids: [],
};

async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(videoConstraints);
    console.log("success");
    return stream;
  } catch (e) {
    console.log("error");
    return null;
  }
}

const CameraModule = () => {
  const videoElem = useRef<HTMLVideoElement | null>(null);
  const canvasElem = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<any>(null);

  useEffect(() => {
    if (canvasElem.current) setCtx(canvasElem.current.getContext("2d"));

    async function run() {
      const srcObj = await init();
      if (videoElem.current) videoElem.current.srcObject = srcObj;
    }

    run();
  }, []);

  function videoPlaying() {
    console.log("video is playing...");
    // setInterval(drawFrame, 100);
  }

  return (
    <div>
      <div style={{ textAlign: "center", position: "relative" }}>
        <video
          onPlaying={videoPlaying}
          style={{
            aspectRatio: "1 / 1",
            maxWidth: "500px",
            width: "100%",
            background: "black",
            scale: "-1 1",
            visibility: "hidden",
          }}
          playsInline
          autoPlay
          ref={videoElem}
        ></video>
        <canvas
          ref={canvasElem}
          width={720}
          height={720}
          style={{
            position: "absolute",
            zIndex: "1",
            left: "50%",
            translate: "-50% 0",
            aspectRatio: "1 / 1",
            maxWidth: "500px",
            width: "100%",
          }}
        ></canvas>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40px",
        }}
      ></div>
    </div>
  );
};

export default CameraModule;
