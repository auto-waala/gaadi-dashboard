import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const CertifiedStamp = ({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) => (
  <div
    className={cn(
      "pointer-events-none inline-flex items-center gap-1 rounded-full border-2 border-india-green/80 bg-background/95 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-india-green shadow-md backdrop-blur",
      compact && "px-1.5",
      className,
    )}
    aria-label="AutoNext Certified"
    title="AutoNext Certified — passed 40-point inspection"
  >
    <BadgeCheck className="h-3.5 w-3.5 fill-india-green text-background" />
    Certified
  </div>
);
