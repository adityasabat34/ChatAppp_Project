import { Terminal } from "./terminal/Terminal";
import { TypingAnimation } from "./terminal/TypingAnimation";
import { AnimatedSpan } from "./terminal/AnimatedSpan";
import { useEffect, useState } from "react";

export function TerminalDemo() {
  const [key, setKey] = useState(0); // for triggering re-render

  useEffect(() => {
    const totalDuration = 7500 + 3000; // 7.5s for animation, 2s buffer
    const interval = setInterval(() => {
      setKey((prev) => prev + 1); // refresh the component
    }, totalDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-center min-h-screen bg-base-200 px-4 py-8">
      <div className="w-full max-w-3xl">
        <Terminal key={key}>
          <TypingAnimation>&gt; npm dlx shadcn@latest init </TypingAnimation>

          <AnimatedSpan delay={1500} className="text-green-500 font-semibold">
            <span>✔ Establishing secure connection...</span>
          </AnimatedSpan>

          <AnimatedSpan delay={2000} className="text-green-500 font-semibold">
            <span>✔ Authenticating your presence...</span>
          </AnimatedSpan>

          <AnimatedSpan delay={2500} className="text-green-500 font-semibold">
            <span>✔ Syncing recent messages...</span>
          </AnimatedSpan>

          <AnimatedSpan delay={3000} className="text-green-500 font-semibold">
            <span>✔ Loading your chat rooms...</span>
          </AnimatedSpan>

          <AnimatedSpan delay={3500} className="text-green-500 font-semibold">
            <span>✔ Fetching friend list...</span>
          </AnimatedSpan>

          <AnimatedSpan delay={4000} className="text-green-500 font-semibold">
            <span>✔ Updating emoji reactions...</span>
          </AnimatedSpan>

          <AnimatedSpan delay={4500} className="text-green-500 font-semibold">
            <span>✔ Checking unread messages...</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5000} className="text-green-500 font-semibold">
            <span>✔ Compiling chat history...</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5500} className="text-green-500 font-semibold">
            <span>✔ Summoning the GIF gods...</span>
          </AnimatedSpan>

          <AnimatedSpan delay={6000} className="text-blue-500 font-semibold">
            <span>ℹ Almost ready...</span>
            <span className="pl-2">Setting up your chat space</span>
          </AnimatedSpan>

          <AnimatedSpan
            delay={6500}
            className="text-muted-foreground font-extrabold"
          >
            Chat portal initialized successfully!
          </AnimatedSpan>

          <AnimatedSpan
            delay={7000}
            className="text-muted-foreground font-extrabold"
          >
            Welcome back, let's catch up 🎉
          </AnimatedSpan>
        </Terminal>
      </div>
    </div>
  );
}
