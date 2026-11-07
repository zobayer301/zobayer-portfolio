import { useState, useEffect } from "react";

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
      }, 170);
    } else if (!isDeleting && index === fullText.length) {
      // Completed typing: hold the full signature
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 4500);
    } else if (isDeleting && index > 0) {
      // Deleting phase: backspace smoothly
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, index - 1));
        setIndex((prev) => prev - 1);
      }, 95);
    } else if (isDeleting && index === 0) {
      // Pause before re-typing
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 800);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, fullText]);

  const restart = () => {
    setIsDeleting(false);
    setIndex(0);
    setDisplayText("");
  };

  return (
    <div
      onClick={restart}
      title="Click to replay signature"
      className={`relative inline-flex items-center justify-center bg-transparent border-0 shadow-none p-0 cursor-pointer select-none ${className}`}
    >
      <span
        className="font-['Great_Vibes',_'Alex_Brush',_cursive] text-4xl sm:text-5xl md:text-6xl font-normal text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] tracking-wide"
        style={{ letterSpacing: "0.03em" }}
      >
        {displayText}
      </span>
    </div>
  );
}

export default Signature;
