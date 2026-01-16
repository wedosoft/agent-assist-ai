import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export const useTypewriter = ({
  text,
  speed = 20,
  delay = 0,
  onComplete,
}: UseTypewriterOptions) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    setIsTyping(false);

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let index = 0;

      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete]);

  return { displayedText, isTyping, isComplete };
};

// Hook for streaming multiple items sequentially
interface StreamItem {
  id: string;
  content: string;
}

interface UseStreamingContentOptions {
  items: StreamItem[];
  typingSpeed?: number;
  delayBetweenItems?: number;
  startDelay?: number;
  onAllComplete?: () => void;
}

export const useStreamingContent = ({
  items,
  typingSpeed = 15,
  delayBetweenItems = 100,
  startDelay = 0,
  onAllComplete,
}: UseStreamingContentOptions) => {
  const [visibleItems, setVisibleItems] = useState<Map<string, string>>(new Map());
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isAllComplete, setIsAllComplete] = useState(false);

  const startStreaming = useCallback(() => {
    setVisibleItems(new Map());
    setCurrentIndex(-1);
    setIsStreaming(true);
    setIsAllComplete(false);

    setTimeout(() => {
      setCurrentIndex(0);
    }, startDelay);
  }, [startDelay]);

  useEffect(() => {
    if (currentIndex < 0 || currentIndex >= items.length) return;

    const currentItem = items[currentIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= currentItem.content.length) {
        setVisibleItems((prev) => {
          const newMap = new Map(prev);
          newMap.set(currentItem.id, currentItem.content.slice(0, charIndex));
          return newMap;
        });
        charIndex++;
      } else {
        clearInterval(typeInterval);

        if (currentIndex < items.length - 1) {
          setTimeout(() => {
            setCurrentIndex(currentIndex + 1);
          }, delayBetweenItems);
        } else {
          setIsStreaming(false);
          setIsAllComplete(true);
          onAllComplete?.();
        }
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [currentIndex, items, typingSpeed, delayBetweenItems, onAllComplete]);

  return {
    visibleItems,
    currentIndex,
    isStreaming,
    isAllComplete,
    startStreaming,
  };
};
