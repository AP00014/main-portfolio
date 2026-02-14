import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export default function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold transition-colors",
        variant === "primary" &&
          "bg-primary text-white hover:bg-secondary disabled:bg-blue-300",
        variant === "outline" &&
          "border border-primary text-primary hover:bg-primary hover:text-white",
        className
      )}
      {...props}
    />
  );
}
