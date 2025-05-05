import { useEffect, useState } from "react";

export function TypingAnimation({ children = "", delay = 0, className = "" }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const fullText = typeof children === "string" ? children : "";

    let i = 0;
    let intervalId;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        // only update if character exists
        if (i < fullText.length) {
          setDisplayedText((prev) => prev + fullText[i]);
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [children, delay]);

  return <div className={className}>{displayedText}</div>;
}
