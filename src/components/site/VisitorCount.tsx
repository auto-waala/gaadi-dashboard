import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const VISIT_COUNT_KEY = "autonext_visit_count";
const BASE_COUNT = 128450; // seed so the number looks realistic

export const VisitorCount = () => {
  const [count, setCount] = useState<number>(BASE_COUNT);

  useEffect(() => {
    const local = Number(localStorage.getItem(VISIT_COUNT_KEY) || 0);
    setCount(BASE_COUNT + local);
    const handler = () => {
      const v = Number(localStorage.getItem(VISIT_COUNT_KEY) || 0);
      setCount(BASE_COUNT + v);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground/80">
      <Eye className="h-3.5 w-3.5 text-primary" />
      <span>{count.toLocaleString()} visitors</span>
    </div>
  );
};
