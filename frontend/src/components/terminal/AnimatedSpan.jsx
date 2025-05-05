import { useEffect, useState } from "react";

export function AnimatedSpan({ children, delay = 0, className = "" }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`${
        show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
      } transition-all duration-500 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
