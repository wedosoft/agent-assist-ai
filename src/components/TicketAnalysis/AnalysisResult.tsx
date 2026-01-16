import { FileText, Search, CheckSquare, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const AnalysisResult = () => {
  const summaryItems = [
    "일본어 번역 파일 업로드 후 적용되지 않고 기본 파일만 다운로드되는 증상 보고 [0]",
    "고객이 파일 크기(약 70KB)와 특정 드롭다운 필드가 큰 점을 공유 [3]",
    "사업 임팩트(일본 첫 고객 온보딩 임박)로 긴급 처리 필요가 확인됨 [1]",
    "내부 원인 파악을 위해 엔지니어링 팀으로 에스컬레이션 진행 [4]",
    "최종 원인: 번역 필드(부모 포함) 64KB 제한 초과 시 업로드 처리 오류로 확인 [5]",
    "워크어라운드(특정 필드 번역 제거)로 즉시 해결 및 고객 성공 확인 [6, 7]",
    "버그 수정 배포 완료 후에도 정상 동작을 고객이 재확인, 종료 요청 [8, 9]"
  ];

  return (
    <div className="space-y-5">
      {/* Summary Section */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">요약</h3>
        </div>
        <ul className="space-y-2 pl-6">
          {summaryItems.map((item, index) => (
            <li key={index} className="text-sm text-foreground leading-relaxed flex items-start gap-2">
              <span className="text-muted-foreground mt-1.5 flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Estimated Cause Section */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">추정 원인</h3>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <p className="text-sm font-medium text-foreground">
            번역 필드(부모 포함) 64KB 제한 초과로 인한 업로드 처리 오류
          </p>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-muted-foreground">신뢰도:</span>
            <div className="flex items-center gap-1">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="w-[95%] h-full bg-success rounded-full"></div>
              </div>
              <span className="text-success font-medium">95%</span>
            </div>
          </div>
          <a href="#" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
            <span>근거: 메시지 5</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* Recommended Actions Section */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-success" />
          <h3 className="text-sm font-semibold text-foreground">권장 조치</h3>
        </div>
        <div className="bg-success/5 border border-success/20 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">티켓 종료 및 재발 방지 메모</span>
            <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-[10px] px-1.5 py-0">
              low
            </Badge>
          </div>
          <ol className="space-y-2 text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground font-medium">1.</span>
              <span>고객이 수정 후 정상 동작을 확인했음을 최종 기록</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground font-medium">2.</span>
              <span>티켓 상태를 '해결됨'으로 변경</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground font-medium">3.</span>
              <span>유사 문의 시 64KB 제한/워크어라운드(필드 분할/제거) 안내 템플릿 준비</span>
            </li>
          </ol>
          <a href="#" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
            <span>근거: 메시지 9</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* AI Disclaimer */}
      <div className="bg-accent rounded-lg p-3">
        <p className="text-xs text-accent-foreground">
          이 분석은 AI가 자동 생성한 것입니다. 최종 판단은 상담원의 책임입니다.
        </p>
      </div>
    </div>
  );
};
