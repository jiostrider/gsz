import React, { useEffect, useRef, useState } from 'react';

// 移动端友好的懒加载视频：滚动进入视口才加载源，离开视口自动暂停，降低流量与内存占用
export default function LazyVideo({ src, poster, className, ...rest }) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);
  const loadedRef = useRef(false);

  // 视口观察：进入预加载区时标记加载，离开视口时暂停
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setShouldLoad(true);
        } else if (loadedRef.current && !el.paused) {
          el.pause();
        }
      },
      { rootMargin: '300px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 首次进入视口时才设置源（preload=none 期间不产生网络请求）
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !shouldLoad || loadedRef.current) return;
    loadedRef.current = true;
    el.src = src;
    el.load();
  }, [shouldLoad, src]);

  // 在视野中时确保自动播放（含重新滑回区域时恢复播放）
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !inView || !loadedRef.current) return;
    if (el.paused) el.play().catch(() => {});
  }, [inView]);

  // 播放结束兜底重播：将进度归零后立即重新播放，实现无缝衔接。
  // 与 loop 属性互补，解决部分浏览器/设备上 loop 失效导致"播放一次后无法重播"的问题。
  // 仅监听结束事件，不影响暂停、音量等其他控制。
  const handleEnded = () => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      onEnded={handleEnded}
      className={className}
      {...rest}
    />
  );
}
