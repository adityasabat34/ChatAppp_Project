import { Terminal } from "./terminal/Terminal";
import { TypingAnimation } from "./terminal/TypingAnimation";
import { AnimatedSpan } from "./terminal/AnimatedSpan";
import { useEffect, useState } from "react";

export function TerminalDemo() {
  const [key, setKey] = useState(0); // for triggering re-render

  useEffect(() => {
    const totalDuration = 7500 + 2000; // 7.5s for animation, 2s buffer
    const interval = setInterval(() => {
      setKey((prev) => prev + 1); // refresh the component
    }, totalDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-center min-h-screen bg-base-200 px-4 py-8">
      <div className="w-full max-w-3xl">
        <Terminal key={key}>
          <TypingAnimation>&gt; npm dlx shadcn@latest init</TypingAnimation>

          <AnimatedSpan delay={1500} className="text-green-500 font-semibold">
            <span>✔ Preflight checks.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={2000} className="text-green-500 font-semibold">
            <span>✔ Verifying framework. Found Next.js.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={2500} className="text-green-500 font-semibold">
            <span>✔ Validating Tailwind CSS.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={3000} className="text-green-500 font-semibold">
            <span>✔ Validating import alias.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={3500} className="text-green-500 font-semibold">
            <span>✔ Writing components.json.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={4000} className="text-green-500 font-semibold">
            <span>✔ Checking registry.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={4500} className="text-green-500 font-semibold">
            <span>✔ Updating tailwind.config.ts</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5000} className="text-green-500 font-semibold">
            <span>✔ Updating app/globals.css</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5500} className="text-green-500 font-semibold">
            <span>✔ Installing dependencies.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={6000} className="text-blue-500 font-semibold">
            <span>ℹ Updated 1 file:</span>
            <span className="pl-2">- lib/utils.ts</span>
          </AnimatedSpan>

          <TypingAnimation delay={6500} className="text-muted-foreground">
            Success! Project initialization completed.
          </TypingAnimation>

          <TypingAnimation delay={7000} className="text-muted-foreground">
            You may now add components.
          </TypingAnimation>
        </Terminal>
      </div>
    </div>
  );
}
