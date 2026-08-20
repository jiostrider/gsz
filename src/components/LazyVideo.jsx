import React, { useEffect, useRef, useState } from 'react';

// 移动端友好的懒加载视频：滚动进入视口才加载源，离开视口自动暂停，降低流量与内存占用
export default function LazyVideo({ src, poster, className, ...rest }) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const loadedRef = useRef(false);

  // 视口观察：进入预加载区时加载，离开视口时暂停
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
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

  // 首次进入视口时才设置源并播放（preload=none 期间不产生网络请求）
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !shouldLoad || loadedRef.current) return;
    loadedRef.current = true;
    el.src = src;
    el.load();
    el.play().catch(() => {});
  }, [shouldLoad, src]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className={className}
      {...rest}
    />
  );
}
