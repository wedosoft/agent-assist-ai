import { ExternalLink, MessageSquareQuote } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface EvidenceItem {
  messageId: number;
  excerpt: string;
  author?: string;
  timestamp?: string;
}

// Mock data - in real implementation, this would come from the ticket data
const evidenceData: Record<number, EvidenceItem> = {
  5: {
    messageId: 5,
    author: "엔지니어링팀",
    timestamp: "2024년 12월 12일 오후 2:30",
    excerpt: "확인 결과, 번역 필드(부모 포함)의 총 크기가 64KB를 초과하면 업로드 처리 중 오류가 발생하는 것으로 파악되었습니다. 이는 현재 시스템의 제한 사항으로, 향후 패치에서 수정될 예정입니다."
  },
  9: {
    messageId: 9,
    author: "김민정",
    timestamp: "2024년 12월 12일 오후 4:15",
    excerpt: "매니저님, 워크어라운드 적용 후 정상적으로 동작하는 것을 확인했습니다. 버그 수정 배포 이후에도 문제없이 작동합니다. 티켓 종료 요청드립니다. 감사합니다."
  }
};

interface EvidenceLinkProps {
  messageId: number;
  className?: string;
}

export const EvidenceLink = ({ messageId, className }: EvidenceLinkProps) => {
  const evidence = evidenceData[messageId];

  if (!evidence) {
    return (
      <a href="#" className={className}>
        <span>근거: 메시지 {messageId}</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button className={className}>
          <span>근거: 메시지 {messageId}</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent 
        side="top" 
        align="start" 
        className="w-80 p-0 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border">
          <MessageSquareQuote className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-foreground">
            메시지 #{evidence.messageId} 발췌
          </span>
        </div>
        
        {/* Content */}
        <div className="p-3 space-y-2">
          {/* Author & Time */}
          {(evidence.author || evidence.timestamp) && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              {evidence.author && <span className="font-medium">{evidence.author}</span>}
              {evidence.timestamp && <span>{evidence.timestamp}</span>}
            </div>
          )}
          
          {/* Excerpt */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/50 rounded-full" />
            <p className="pl-3 text-sm text-foreground leading-relaxed">
              {evidence.excerpt}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 py-2 bg-muted/30 border-t border-border">
          <p className="text-[10px] text-muted-foreground">
            클릭하면 원본 메시지로 이동합니다
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
