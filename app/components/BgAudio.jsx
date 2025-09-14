"use client";
import React, { useEffect, useRef } from "react";

const BgAudio = () => {
  const bgAudioRef = useRef(null);

  useEffect(() => {
    const bgAudio = bgAudioRef.current;
    if (bgAudio) {
      bgAudio.loop = true;
      bgAudio.muted = false; 
      bgAudio.play().catch(() => {}); 

      
      const handleClick = () => {
        if (bgAudio) {
          bgAudio.muted = false;
          bgAudio.play().catch(() => {});
        }
        document.removeEventListener("click", handleClick);
      };

      document.addEventListener("click", handleClick);
    }
  }, []);

  return (
    <div>
      <audio
        ref={bgAudioRef}
        src="/audio/dark.mp3"
        preload="auto"
        autoPlay={true}
        loop={true}
        muted={false}
      />
    </div>
  );
};

export default BgAudio;
