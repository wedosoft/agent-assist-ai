import { useState, useEffect, useCallback } from "react";
import { FileText, Search, CheckSquare, ExternalLink, SkipForward } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StreamingResultProps {
  onComplete?: () => void;
}

interface StreamingSection {
  id: string;
  type: "summary" | "cause" | "action";
  items: string[];
}

const sections: StreamingSection[] = [
  {
    id: "summary",
    type: "summary",
    items: [
      "일본어 번역 파일 업로드 후 적용되지 않고 기본 파일만 다운로드되는 증상 보고 [0]",
      "고객이 파일 크기(약 70KB)와 특정 드롭다운 필드가 큰 점을 공유 [3]",
      "사업 임팩트(일본 첫 고객 온보딩 임박)로 긴급 처리 필요가 확인됨 [1]",
      "내부 원인 파악을 위해 엔지니어링 팀으로 에스컬레이션 진행 [4]",
      "최종 원인: 번역 필드(부모 포함) 64KB 제한 초과 시 업로드 처리 오류로 확인 [5]",
      "워크어라운드(특정 필드 번역 제거)로 즉시 해결 및 고객 성공 확인 [6, 7]",
      "버그 수정 배포 완료 후에도 정상 동작을 고객이 재확인, 종료 요청 [8, 9]"
    ]
  },
  {
    id: "cause",
    type: "cause",
    items: ["번역 필드(부모 포함) 64KB 제한 초과로 인한 업로드 처리 오류"]
  },
  {
    id: "action",
    type: "action",
    items: [
      "고객이 수정 후 정상 동작을 확인했음을 최종 기록",
      "티켓 상태를 '해결됨'으로 변경",
      "유사 문의 시 64KB 제한/워크어라운드(필드 분할/제거) 안내 템플릿 준비"
    ]
  }
];

export const StreamingResult = ({ onComplete }: StreamingResultProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [completedItems, setCompletedItems] = useState<Map<string, string[]>>(new Map());
  const [isComplete, setIsComplete] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  // Skip to show all content immediately
  const handleSkip = useCallback(() => {
    setIsSkipped(true);
    
    // Populate all completed items
    const allItems = new Map<string, string[]>();
    sections.forEach(section => {
      allItems.set(section.id, section.items);
    });
    setCompletedItems(allItems);
    setDisplayedText("");
    setCurrentSection(sections.length);
    setIsComplete(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (isSkipped) return;
    
    if (currentSection >= sections.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const section = sections[currentSection];
    if (currentItem >= section.items.length) {
      // Move to next section
      const timeout = setTimeout(() => {
        setCurrentSection(currentSection + 1);
        setCurrentItem(0);
        setDisplayedText("");
      }, 200);
      return () => clearTimeout(timeout);
    }

    const text = section.items[currentItem];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (isSkipped) {
        clearInterval(typeInterval);
        return;
      }
      
      if (charIndex <= text.length) {
        setDisplayedText(text.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        // Add to completed items
        setCompletedItems((prev) => {
          const newMap = new Map(prev);
          const existing = newMap.get(section.id) || [];
          newMap.set(section.id, [...existing, text]);
          return newMap;
        });
        setDisplayedText("");
        setTimeout(() => {
          setCurrentItem(currentItem + 1);
        }, 80);
      }
    }, 12);

    return () => clearInterval(typeInterval);
  }, [currentSection, currentItem, onComplete, isSkipped]);

  const isStreaming = !isComplete && !isSkipped;

  const renderSummarySection = () => {
    const completed = completedItems.get("summary") || [];
    const isActive = currentSection === 0;
    const showTyping = isActive && currentItem < sections[0].items.length && !isSkipped;

    return (
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">요약</h3>
          {isActive && isStreaming && (
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          )}
        </div>
        <ul className="space-y-2 pl-6">
          {completed.map((item, index) => (
            <li key={index} className={cn(
              "text-sm text-foreground leading-relaxed flex items-start gap-2",
              !isSkipped && "animate-fade-in"
            )}>
              <span className="text-muted-foreground mt-1.5 flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
          {showTyping && displayedText && (
            <li className="text-sm text-foreground leading-relaxed flex items-start gap-2">
              <span className="text-muted-foreground mt-1.5 flex-shrink-0">•</span>
              <span>
                {displayedText}
                <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
              </span>
            </li>
          )}
        </ul>
      </section>
    );
  };

  const renderCauseSection = () => {
    const completed = completedItems.get("cause") || [];
    const isActive = currentSection === 1;
    const showTyping = isActive && currentItem < sections[1].items.length && !isSkipped;
    const isVisible = currentSection >= 1 || completed.length > 0;

    if (!isVisible) return null;

    return (
      <section className={cn("space-y-3 transition-opacity duration-300", isVisible ? "opacity-100" : "opacity-0")}>
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">추정 원인</h3>
          {isActive && isStreaming && (
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          )}
        </div>
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          {completed.length > 0 ? (
            <>
              <p className="text-sm font-medium text-foreground">{completed[0]}</p>
              <div className={cn("flex items-center gap-3 text-xs", !isSkipped && "animate-fade-in")}>
                <span className="text-muted-foreground">신뢰도:</span>
                <div className="flex items-center gap-1">
                  <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="w-[95%] h-full bg-success rounded-full transition-all duration-500" />
                  </div>
                  <span className="text-success font-medium">95%</span>
                </div>
              </div>
              <a href="#" className={cn(
                "inline-flex items-center gap-1 text-xs text-primary hover:underline",
                !isSkipped && "animate-fade-in"
              )}>
                <span>근거: 메시지 5</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </>
          ) : showTyping && displayedText ? (
            <p className="text-sm font-medium text-foreground">
              {displayedText}
              <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
            </p>
          ) : null}
        </div>
      </section>
    );
  };

  const renderActionSection = () => {
    const completed = completedItems.get("action") || [];
    const isActive = currentSection === 2;
    const showTyping = isActive && currentItem < sections[2].items.length && !isSkipped;
    const isVisible = currentSection >= 2 || completed.length > 0;

    if (!isVisible) return null;

    return (
      <section className={cn("space-y-3 transition-opacity duration-300", isVisible ? "opacity-100" : "opacity-0")}>
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-success" />
          <h3 className="text-sm font-semibold text-foreground">권장 조치</h3>
          {isActive && isStreaming && (
            <span className="inline-block w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
          )}
        </div>
        <div className="bg-success/5 border border-success/20 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">티켓 종료 및 재발 방지 메모</span>
            <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-[10px] px-1.5 py-0">
              low
            </Badge>
          </div>
          <ol className="space-y-2 text-sm text-foreground">
            {completed.map((item, index) => (
              <li key={index} className={cn(
                "flex items-start gap-2",
                !isSkipped && "animate-fade-in"
              )}>
                <span className="text-muted-foreground font-medium">{index + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
            {showTyping && displayedText && (
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground font-medium">{completed.length + 1}.</span>
                <span>
                  {displayedText}
                  <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
                </span>
              </li>
            )}
          </ol>
          {(completed.length === sections[2].items.length || isComplete) && (
            <a href="#" className={cn(
              "inline-flex items-center gap-1 text-xs text-primary hover:underline",
              !isSkipped && "animate-fade-in"
            )}>
              <span>근거: 메시지 9</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="space-y-5">
      {/* Skip Button - Only shows during streaming */}
      {isStreaming && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground gap-1.5 h-7 px-2"
            onClick={handleSkip}
          >
            <SkipForward className="w-3.5 h-3.5" />
            건너뛰기
          </Button>
        </div>
      )}

      {renderSummarySection()}
      {renderCauseSection()}
      {renderActionSection()}

      {/* AI Disclaimer - shows after completion */}
      {isComplete && (
        <div className={cn("bg-accent rounded-lg p-3", !isSkipped && "animate-fade-in")}>
          <p className="text-xs text-accent-foreground">
            이 분석은 AI가 자동 생성한 것입니다. 최종 판단은 상담원의 책임입니다.
          </p>
        </div>
      )}
    </div>
  );
};
