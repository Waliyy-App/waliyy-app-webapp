// useInfiniteScroll.js
import { useEffect, useRef } from 'react';

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export const useInfiniteScroll = (
    fetchData,
    currentPage,
    currentLimit,
    baseLimit,
    step,
    maxLimit,
    loading,
    hasMore
) => {
  const pageRef = useRef(currentPage);
  const limitRef = useRef(currentLimit);

  useEffect(() => {
    pageRef.current = currentPage;
    limitRef.current = currentLimit;
  }, [currentPage, currentLimit]);

  const handleScroll = debounce(async () => {
    if (loading || !hasMore) return;
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= docHeight - 200) {
      if (limitRef.current + step <= maxLimit) {
        const nextLimit = limitRef.current + step;
        await fetchData(pageRef.current, nextLimit);
      } else {
        const nextPage = pageRef.current + 1;
        await fetchData(nextPage, baseLimit, true);
      }
    }
  }, 300);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};
