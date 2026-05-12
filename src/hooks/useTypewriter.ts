import { useState, useEffect } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
}

export const useTypewriter = ({
  text,
  speed = 50,
  delay = 0,
}: UseTypewriterOptions) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset state when text changes
    setDisplayText("");
    setCurrentIndex(0);
    setIsComplete(text.length === 0);
  }, [text]);

  useEffect(() => {
    if (text.length === 0) {
      return undefined;
    }

    // Initial delay before starting to type (or immediate kickoff when delay is 0)
    if (currentIndex === 0) {
      const wait = delay > 0 ? delay : 0;
      const delayTimeout = setTimeout(() => {
        setCurrentIndex(1);
      }, wait);
      return () => clearTimeout(delayTimeout);
    }

    // Type characters one by one
    if (currentIndex > 0 && currentIndex <= text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex));
        if (currentIndex === text.length) {
          setIsComplete(true);
        }
        setCurrentIndex((i) => i + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [currentIndex, text, speed, delay]);

  return { displayText, isComplete };
};
