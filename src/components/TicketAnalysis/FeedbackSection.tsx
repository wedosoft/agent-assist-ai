import { ThumbsUp, ThumbsDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const FeedbackSection = () => {
  const [feedback, setFeedback] = useState<"helpful" | "not-helpful" | "edit" | null>(null);

  const handleFeedback = (type: "helpful" | "not-helpful" | "edit") => {
    setFeedback(type === feedback ? null : type);
  };

  return (
    <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
      <p className="text-sm text-foreground mb-3">이 인사이트가 도움이 되었나요?</p>
      <div className="flex gap-2">
        <Button
          variant={feedback === "helpful" ? "default" : "outline"}
          size="sm"
          className="flex-1 gap-2"
          onClick={() => handleFeedback("helpful")}
        >
          <ThumbsUp className="w-4 h-4" />
          도움됨
        </Button>
        <Button
          variant={feedback === "not-helpful" ? "destructive" : "outline"}
          size="sm"
          className="flex-1 gap-2"
          onClick={() => handleFeedback("not-helpful")}
        >
          <ThumbsDown className="w-4 h-4" />
          도움안됨
        </Button>
        <Button
          variant={feedback === "edit" ? "secondary" : "outline"}
          size="sm"
          className="flex-1 gap-2"
          onClick={() => handleFeedback("edit")}
        >
          <Pencil className="w-4 h-4" />
          수정
        </Button>
      </div>
    </div>
  );
};
