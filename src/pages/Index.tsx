import { AnalysisPanel } from "@/components/TicketAnalysis";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[700px] rounded-lg shadow-lg border border-border overflow-hidden relative">
        {/* Theme Toggle */}
        <div className="absolute top-2 right-12 z-10">
          <ThemeToggle />
        </div>
        
        <AnalysisPanel />
      </div>
    </div>
  );
};

export default Index;
