import { motion, type MotionProps } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const DEFAULT_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = DEFAULT_CHARS,
  className,
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const [scrambledText, setScrambledText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const onScrambleCompleteRef = useRef(onScrambleComplete);
  onScrambleCompleteRef.current = onScrambleComplete;

  useEffect(() => {
    if (!trigger || !spanRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(spanRef.current);
    return () => observer.disconnect();
  }, [trigger]);

  useEffect(() => {
    if (!trigger || !isVisible) return;

    const steps = Math.ceil(duration / speed);
    let step = 0;

    const interval = setInterval(() => {
      const progress = step / steps;
      let scrambled = "";

      for (let i = 0; i < children.length; i++) {
        if (children[i] === " ") {
          scrambled += " ";
          continue;
        }
        if (progress * children.length > i) {
          scrambled += children[i];
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      step++;

      if (step > steps) {
        clearInterval(interval);
        setScrambledText(null);
        onScrambleCompleteRef.current?.();
      } else {
        setScrambledText(scrambled);
      }
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [trigger, isVisible, children, duration, speed, characterSet]);

  return (
    <motion.span ref={spanRef} className={className} {...props}>
      {scrambledText ?? children}
    </motion.span>
  );
}

export default TextScramble;
