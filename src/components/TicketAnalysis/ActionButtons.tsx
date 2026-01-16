import { RefreshCw, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onRegenerate: () => void;
  onForceRefresh: () => void;
}

export const ActionButtons = ({ onRegenerate, onForceRefresh }: ActionButtonsProps) => {
  return (
    <div className="mt-4 flex gap-2">
      <Button
        variant="outline"
        size="sm"
        className="flex-1 gap-2"
        onClick={onRegenerate}
      >
        <RefreshCw className="w-4 h-4" />
        재생성
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex-1 gap-2"
        onClick={onForceRefresh}
      >
        <RotateCcw className="w-4 h-4" />
        강제 새로고침
      </Button>
    </div>
  );
};
