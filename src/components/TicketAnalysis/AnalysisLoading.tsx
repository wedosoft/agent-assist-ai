import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { FileText, Search, CheckSquare } from "lucide-react";

interface AnalysisLoadingProps {
  progress: number;
  currentStep: string;
}

export const AnalysisLoading = ({ progress, currentStep }: AnalysisLoadingProps) => {
  return (
    <div className="space-y-6">
      {/* Spinner and Status */}
      <div className="flex flex-col items-center py-6">
        <div className="relative w-12 h-12 mb-4">
          <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-sm font-medium text-foreground mb-2">AI가 티켓을 분석하고 있습니다...</p>
        <div className="w-full max-w-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-primary font-medium">{currentStep}</span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          긴 대화는 분석에 시간이 더 걸릴 수 있습니다
        </p>
      </div>

      {/* Skeleton Content */}
      <div className="space-y-5">
        {/* Summary Section Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">요약</span>
          </div>
          <div className="space-y-2 pl-6">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>

        {/* Estimated Cause Section Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">추정 원인</span>
          </div>
          <div className="space-y-2 pl-6">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>

        {/* Recommended Actions Section Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-foreground">권장 조치</span>
          </div>
          <div className="space-y-2 pl-6">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
};
