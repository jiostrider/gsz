import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

// 双码率音频源：标准版(96kbps) + 弱网版(48kbps单声道)
const SRC_HIGH = new URL('../assets/audio/bgm.mp3', import.meta.url).href;
const SRC_LOW = new URL('../assets/audio/bgm-low.mp3', import.meta.url).href;

// 基于 Network Information API 判断网络质量，用于自适应码率
function getNetworkTier() {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!conn) return 'good'; // 不支持时按良好网络处理
  const { effectiveType, downlink } = conn;
  if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') return 'poor';
  if (effectiveType === '4g' && typeof downlink === 'number' && downlink < 1.5) return 'poor';
  return 'good';
}

export default function BackgroundVideo({ muted = true, audioRef: externalAudioRef }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [quality, setQuality] = useState(() => (getNetworkTier() === 'good' ? 'high' : 'low'));
  const src = "https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
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

  // 选择音频源（自适应码率）：挂载即加载，splash 阶段完成预加载，
  // 保证用户点击进入时音频已就绪，启动无延迟
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextSrc = quality === 'high' ? SRC_HIGH : SRC_LOW;
    if (audio.getAttribute('data-src') === nextSrc) return;

    const currentTime = audio.currentTime || 0;
    const shouldResume = !muted && !audio.paused;
    audio.pause();
    audio.src = nextSrc;
    audio.setAttribute('data-src', nextSrc);
    audio.load(); // preload=auto，muted 阶段同样后台下载
    if (shouldResume) {
      audio.currentTime = currentTime;
      audio.play().catch(() => {});
    }
  }, [quality]);

  // 监听网络变化，实时切换码率（弱网降级 / 恢复升级）
  useEffect(() => {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!conn) return;
    const handleChange = () => setQuality(getNetworkTier() === 'good' ? 'high' : 'low');
    conn.addEventListener('change', handleChange);
    return () => conn.removeEventListener('change', handleChange);
  }, []);

  // 播放中断/缓冲卡顿处理：降级到低码率版本
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleStall = () => {
      if (quality === 'high') setQuality('low');
    };
    audio.addEventListener('stalled', handleStall);
    audio.addEventListener('waiting', handleStall);
    return () => {
      audio.removeEventListener('stalled', handleStall);
      audio.removeEventListener('waiting', handleStall);
    };
  }, [quality]);

  // 播放/暂停控制（muted 变化）
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      audio.pause();
    } else {
      audio.volume = 1;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [muted]);

  // 页面不可见时暂停，降低后台资源与电量占用；恢复可见后继续播放
  useEffect(() => {
    const handleVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        audio.pause();
      } else if (!muted) {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [muted]);

  return (
    <div className="bg-video absolute inset-0 overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-80"
      ></video>
      <audio
        ref={(el) => {
          audioRef.current = el;
          if (externalAudioRef) externalAudioRef.current = el;
        }}
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 z-10"></div>
    </div>
  );
}
