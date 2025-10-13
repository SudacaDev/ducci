import { useRef, useEffect, useState, RefObject } from "react";

type IntersectionOptions = {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
};

type IntersectionHookReturn<T extends HTMLElement> = {
  ref: RefObject<T>;
  isIntersecting: boolean;
};

/**
 * Hook para detectar cuándo un elemento entra o sale del viewport usando la API Intersection Observer.
 *
 * @param {IntersectionOptions} options - Opciones del Intersection Observer (root, rootMargin, threshold).
 * @returns {IntersectionHookReturn<T>} Un objeto con:
 * - ref: La referencia que debes aplicar al elemento objetivo.
 * - isIntersecting: Estado booleano que es true cuando el elemento es visible.
 */
function useIntersectionObserver<T extends HTMLElement>(
  options: IntersectionOptions = {}, // Asignamos un objeto vacío por defecto y lo tipamos
): IntersectionHookReturn<T> {
  const ref = useRef<T>(null);

  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const targetElement = ref.current;
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        setIntersecting(entry.isIntersecting);
      },
      options,
    );

    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
    };
  }, [options]);

  return { ref, isIntersecting };
}

export default useIntersectionObserver;
