import { useEffect, useRef } from "react";

const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

export const useInfiniteScroll = (
    fetchData,
    baseLimit,
    loading,
    hasMore,
    maxLimit,
    step
) => {
  const pageRef = useRef(1);
  const limitRef = useRef(baseLimit);

  const loadMore = async () => {
    if (!loading && hasMore) {
      if (limitRef.current + step <= maxLimit) {
        limitRef.current += step;
        await fetchData(pageRef.current, limitRef.current);
      } else {
        pageRef.current += 1;
        limitRef.current = baseLimit;
        await fetchData(pageRef.current, baseLimit);
      }
    }
  };

  const handleScroll = debounce(async () => {
    const bottomReached =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 200;

    if (bottomReached) {
      await loadMore();
    }
  }, 300);

  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
