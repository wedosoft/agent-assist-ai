import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalysisLoading } from "./AnalysisLoading";
import { StreamingResult } from "./StreamingResult";
import { FeedbackSection } from "./FeedbackSection";
import { ActionButtons } from "./ActionButtons";

interface AnalysisPanelProps {
  onClose?: () => void;
}

export const AnalysisPanel = ({ onClose }: AnalysisPanelProps) => {
  const [status, setStatus] = useState<"idle" | "loading" | "streaming" | "complete">("idle");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  const handleAnalyze = () => {
    setStatus("loading");
    setProgress(0);
    
    const steps = [
      "티켓 내용 읽는 중...",
      "대화 이력 분석 중...",
      "AI 분석 중..."
    ];
    
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setCurrentStep(steps[stepIndex]);
        setProgress(((stepIndex + 1) / steps.length) * 100);
        stepIndex++;
      } else {
        clearInterval(interval);
        // Transition to streaming state
        setStatus("streaming");
      }
    }, 600);
  };

  const handleStreamingComplete = () => {
    setStatus("complete");
  };

  const handleRegenerate = () => {
    handleAnalyze();
  };

  const handleForceRefresh = () => {
    setStatus("idle");
  };

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-sm font-medium text-foreground">NexusDesk AI 코파일럿</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {status === "idle" && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              티켓을 분석하여 요약, 추정 원인, 권장 조치를 제공합니다.
            </p>
            <Button onClick={handleAnalyze} className="gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              티켓 분석
            </Button>
          </div>
        )}

        {status === "loading" && (
          <AnalysisLoading progress={progress} currentStep={currentStep} />
        )}

        {(status === "streaming" || status === "complete") && (
          <>
            <StreamingResult onComplete={handleStreamingComplete} />
            {status === "complete" && (
              <>
                <FeedbackSection />
                <ActionButtons 
                  onRegenerate={handleRegenerate}
                  onForceRefresh={handleForceRefresh}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
