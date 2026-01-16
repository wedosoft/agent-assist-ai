import { useTypewriter } from "@/hooks/use-typewriter";
import { cn } from "@/lib/utils";

interface StreamingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export const StreamingText = ({
  text,
  speed = 15,
  delay = 0,
  className,
  showCursor = true,
  onComplete,
}: StreamingTextProps) => {
  const { displayedText, isTyping } = useTypewriter({
    text,
    speed,
    delay,
    onComplete,
  });

  return (
    <span className={cn("whitespace-pre-wrap", className)}>
      {displayedText}
      {showCursor && isTyping && (
        <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />
      )}
    </span>
  );
};
