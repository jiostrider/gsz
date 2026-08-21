import React, { useEffect, useRef, useState } from 'react';

// 移动端友好的懒加载视频：滚动进入视口才加载源，离开视口自动暂停，降低流量与内存占用
export default function LazyVideo({ src, poster, className, ...rest }) {
  const videoRef = useRef(null);
  const fallbackRef = useRef(null);
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

  // 打印/导出 PDF 前，用静态图替代视频避免空白：
  // 已加载的视频尽力抓取最后一帧，未加载的回退到 poster 首帧海报
  useEffect(() => {
    const onBeforePrint = () => {
      const el = videoRef.current;
      const img = fallbackRef.current;
      if (!img) return;
      // 先立即用海报兜底，保证打印快照不会出现空白
      img.src = poster || '';
      img.classList.add('print-active');
      // 已加载出画面的视频：异步 seek 到末尾抓最后一帧，成功后替换
      if (el && loadedRef.current && el.readyState >= 2 && el.videoWidth > 0) {
        (async () => {
          try {
            const prevTime = el.currentTime;
            const wasPaused = el.paused;
            el.pause();
            el.currentTime = Math.max(0, (el.duration || 0) - 0.05);
            await new Promise((resolve) => {
              const done = () => {
                el.removeEventListener('seeked', done);
                resolve();
              };
              el.addEventListener('seeked', done);
              setTimeout(done, 1000); // 兜底，避免 seek 卡死
            });
            const canvas = document.createElement('canvas');
            canvas.width = el.videoWidth;
            canvas.height = el.videoHeight;
            canvas.getContext('2d').drawImage(el, 0, 0);
            const frame = canvas.toDataURL('image/jpeg', 0.85);
            img.src = frame;
            // 还原播放状态
            el.currentTime = prevTime;
            if (!wasPaused) el.play().catch(() => {});
          } catch {
            // 抓帧失败则保持海报，不影响打印
          }
        })();
      }
    };
    const onAfterPrint = () => {
      fallbackRef.current?.classList.remove('print-active');
    };
    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('afterprint', onAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', onBeforePrint);
      window.removeEventListener('afterprint', onAfterPrint);
    };
  }, [poster]);

  return (
    <>
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
      {/* 打印时替代视频的静态图（最后一帧或海报），屏幕浏览时隐藏 */}
      <img
        ref={fallbackRef}
        src={poster}
        alt=""
        aria-hidden
        className={`print-video-fallback ${className}`}
      />
    </>
  );
}
