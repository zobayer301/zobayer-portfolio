import { useState } from "react";
import { motion } from "framer-motion";

export function Signature({ className = "" }: { className?: string }) {
  const [key, setKey] = useState(0);

  const replay = () => setKey((k) => k + 1);

  return (
    <motion.button
      key={key}
      onClick={replay}
      title="Click to replay signature animation"
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative flex flex-col items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-background/80 dark:bg-background/85 backdrop-blur-md border border-border/70 dark:border-border/80 shadow-lg shadow-black/10 dark:shadow-black/40 hover:border-primary/50 transition-all duration-300 cursor-pointer select-none ${className}`}
    >
      {/* Subtle ambient backlight glow */}
      <div className="absolute -inset-1 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 pointer-events-none" />

      {/* Signature SVG */}
      <div className="relative w-36 sm:w-44 h-12 sm:h-14 flex items-center justify-center">
        <svg
          viewBox="0 0 240 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-foreground drop-shadow-sm overflow-visible"
        >
          {/* Letter 'Z' */}
          <motion.path
            d="M 24 28 C 32 20, 50 18, 58 22 C 64 25, 63 32, 56 35 C 48 39, 38 48, 30 62 C 26 69, 23 75, 30 75 C 38 75, 50 67, 58 63 C 63 60, 66 65, 61 69 C 53 75, 36 81, 28 77 C 23 74, 26 64, 34 58 C 44 51, 60 46, 70 50"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.9, ease: "easeInOut" }}
          />

          {/* Letters 'obayer' (continuous cursive stroke) */}
          <motion.path
            d="M 72 52 C 70 46, 77 42, 84 44 C 90 46, 92 54, 88 60 C 83 65, 74 64, 72 57 C 70 50, 76 44, 85 44 C 91 44, 96 47, 101 48 C 105 42, 112 22, 116 14 C 118 9, 122 10, 121 16 C 118 26, 112 46, 111 56 C 110 62, 114 64, 119 62 C 124 59, 128 52, 126 47 C 125 44, 120 46, 123 48 C 127 50, 132 52, 137 52 C 140 46, 146 42, 152 45 C 157 48, 157 56, 152 60 C 147 64, 139 62, 139 55 C 139 48, 146 44, 153 45 C 157 45, 159 50, 158 55 C 157 60, 159 63, 164 61 C 168 59, 172 53, 175 47 C 177 43, 183 42, 186 46 C 189 50, 188 57, 190 60 C 193 62, 197 57, 200 50 C 202 45, 206 44, 207 48 C 206 58, 201 75, 197 83 C 193 92, 184 93, 181 87 C 179 82, 186 73, 199 61 C 205 54, 213 45, 220 47 C 225 49, 224 58, 219 61 C 212 65, 206 61, 208 53 C 210 46, 221 46, 229 50 C 233 46, 240 44, 243 48 C 246 51, 244 56, 244 61 C 245 65, 250 65, 256 62"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 1.4, ease: "easeInOut" }}
          />

          {/* Underline Flourish Swoop */}
          <motion.path
            d="M 28 78 C 72 70, 135 68, 195 72 C 222 74, 246 78, 249 76 C 252 73, 242 70, 225 69 C 190 67, 128 68, 75 76"
            stroke="var(--acc)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 2.45, ease: "easeOut" }}
          />

          {/* Glowing dot at the end of signature flourish */}
          <motion.circle
            cx="248"
            cy="76"
            r="2.5"
            fill="var(--acc)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.9] }}
            transition={{ duration: 0.4, delay: 3.1 }}
          />
        </svg>
      </div>

      {/* Subtle caption */}
      <span className="text-[10px] tracking-widest uppercase font-sans font-medium text-muted-foreground/75 group-hover:text-primary transition-colors">
        Verified Signature
      </span>
    </motion.button>
  );
}

export default Signature;

