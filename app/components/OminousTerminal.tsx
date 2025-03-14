"use client";

import { useEffect, useState } from "react";

const messages = [
  "Initializing neural network...",
  "Scanning for extreme sports signatures...",
  "Analyzing adrenaline patterns...",
  "Warning: Danger levels exceeding normal parameters...",
  "System override: Extreme mode activated...",
];

export default function OminousTerminal() {
  const [currentText, setCurrentText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < messages[messageIndex].length) {
      const timer = setTimeout(() => {
        setCurrentText((prev) => prev + messages[messageIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setCurrentText("");
        setCharIndex(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [charIndex, messageIndex]);

  return (
    <div className="fixed bottom-24 right-8 w-80 h-40 bg-black/80 backdrop-blur border border-purple-500/50 rounded-lg shadow-lg overflow-hidden font-mono text-sm">
      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-b border-purple-500/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-purple-300 text-xs">terminal@extreme-sports</span>
      </div>
      <div className="p-4 text-green-400">
        <span className="text-purple-400">$</span> {currentText}
        <span className="animate-pulse">_</span>
      </div>
    </div>
  );
}
