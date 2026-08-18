import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function BackgroundVideo({ muted = true }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const src = "https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => { hls.destroy(); };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [muted]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-80"
      ></video>
      <audio
        ref={audioRef}
        src={new URL('../assets/audio/bgm.mp3', import.meta.url).href}
        loop
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 z-10"></div>
    </div>
  );
}
