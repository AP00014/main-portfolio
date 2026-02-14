import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary",
        className
      )}
    />
  );
}
