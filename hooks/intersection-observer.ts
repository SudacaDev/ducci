import { useEffect, useRef, useState } from 'react';

function useIntersectionObserver<T extends Element = HTMLDivElement>(observerOptions: { root: null; rootMargin: string; threshold: number; }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return { ref, isIntersecting };
}

export default useIntersectionObserver;