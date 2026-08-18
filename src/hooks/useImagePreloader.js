import { useState, useEffect, useCallback, useRef } from 'react';

const assetImages = import.meta.glob('../assets/images/*.{png,jpg,jpeg,svg,webp,gif}', {
  eager: true,
  query: 'url',
  import: 'default',
});

const assetList = Object.values(assetImages);

function getNetworkType() {
  if (navigator.connection) {
    const { effectiveType, saveData } = navigator.connection;
    return { effectiveType, saveData };
  }
  return { effectiveType: 'unknown', saveData: false };
}

const PRIORITY_COUNT = 2;

export function useImagePreloader({ onComplete, timeoutMs = 15000 } = {}) {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState([]);
  const [total, setTotal] = useState(assetList.length);
  const completedRef = useRef(false);

  const finish = useCallback((finalFailed) => {
    if (completedRef.current) return;
    completedRef.current = true;
    setLoaded(true);
    if (onComplete) onComplete({ failed: finalFailed, total: assetList.length });
  }, [onComplete]);

  useEffect(() => {
    let cancelled = false;
    const failedItems = [];
    let loadedCount = 0;

    const netInfo = getNetworkType();
    const isSlow = netInfo.effectiveType === '2g' || netInfo.effectiveType === 'slow-2g';
    const isSaveData = netInfo.saveData;

    const timeoutId = setTimeout(() => {
      if (!cancelled && !completedRef.current) {
        finish(failedItems);
      }
    }, timeoutMs);

    const handleLoad = (img, url) => {
      if (cancelled || completedRef.current) return;
      loadedCount++;
      setProgress(Math.round((loadedCount / assetList.length) * 100));
      if (img) { img.onload = null; img.onerror = null; }
      if (loadedCount >= assetList.length) {
        finish(failedItems);
      }
    };

    const handleError = (url) => {
      if (cancelled || completedRef.current) return;
      loadedCount++;
      failedItems.push(url);
      setFailed([...failedItems]);
      setProgress(Math.round((loadedCount / assetList.length) * 100));
      if (loadedCount >= assetList.length) {
        finish(failedItems);
      }
    };

    const urlsToPreload = isSaveData
      ? assetList.slice(0, PRIORITY_COUNT)
      : assetList;

    setTotal(urlsToPreload.length);

    urlsToPreload.forEach((url, index) => {
      const img = new Image();
      img.onload = () => handleLoad(img, url);
      img.onerror = () => handleError(url);

      if (isSlow && index >= 2) {
        setTimeout(() => {
          if (!cancelled && !completedRef.current) {
            img.src = url;
          }
        }, index * 300);
      } else {
        img.src = url;
      }
    });

    if (urlsToPreload.length === 0) {
      finish([]);
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [timeoutMs, finish]);

  return { progress, loaded, failed, total, imageUrls: assetList };
}
