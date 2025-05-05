import { useEffect, useState } from "react";

export function AnimatedSpan({ delay = 0, children, className = "" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return visible ? <div className={className}>{children}</div> : null;
}
