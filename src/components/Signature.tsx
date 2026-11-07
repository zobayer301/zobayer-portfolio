import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Signature({ className = "" }: { className?: string }) {
  const fullText = "Zobayer";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && index < fullText.length) {
      // Typing phase: type next character
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, index + 1));
        setIndex((prev) => prev + 1);
      }, 160);
    } else if (!isDeleting && index === fullText.length) {
      // Completed typing: pause to display full signature
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 4200);
    } else if (isDeleting && index > 0) {
      // Deleting phase: backspace characters smoothly
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, index - 1));
        setIndex((prev) => prev - 1);
      }, 90);
    } else if (isDeleting && index === 0) {
      // Finished deleting: pause before starting again
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 700);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, fullText]);

  const restart = () => {
    setIsDeleting(false);
    setIndex(0);
    setDisplayText("");
  };

  const isComplete = displayText === fullText && !isDeleting;

  return (
    <div
      onClick={restart}
      title="Click to replay signature typewriter"
      className={`relative inline-flex flex-col items-center justify-center bg-transparent border-0 shadow-none p-0 cursor-pointer select-none group ${className}`}
    >
      {/* Typewriter text line */}
      <div className="relative flex items-center justify-center">
        <span
          className="font-['Dancing_Script',_'Caveat',_cursive] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-foreground drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] dark:drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
          style={{ letterSpacing: "0.04em" }}
        >
          {displayText}
        </span>

        {/* Blinking Typewriter Cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block w-[2.5px] sm:w-[3px] h-6 sm:h-8 md:h-10 ml-1 rounded-full bg-primary drop-shadow-[0_0_8px_var(--acc)] align-middle"
        />
      </div>

      {/* Underline flourish swoosh that draws when word is complete */}
      <div className="w-32 sm:w-40 md:w-44 h-4 sm:h-5 -mt-1 sm:-mt-2 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 180 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-primary drop-shadow-[0_1px_6px_var(--acc)] overflow-visible"
        >
          <AnimatePresence>
            {isComplete && (
              <motion.path
                key="flourish"
                d="M 10 10 C 45 4, 95 3, 140 7 C 160 9, 172 13, 170 11 C 168 9, 155 7, 138 6 C 105 4, 55 6, 25 12"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.95 }}
                exit={{ pathLength: 0, opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </svg>
      </div>
    </div>
  );
}

export default Signature;
