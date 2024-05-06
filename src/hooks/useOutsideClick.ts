import { useEffect, useRef } from "react";

export function useOutsideClick(callback: () => void, listenCapturing = true) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);
    document.addEventListener("touchend", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
      document.removeEventListener("touchend", handleClick, listenCapturing);
    };
  }, [callback, listenCapturing]);

  return ref;
}
