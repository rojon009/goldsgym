import type { ReactNode } from "react";

interface CartoonButtonProps {
  label?: string;
  children?: ReactNode;
  color?: string;
  hasHighlight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  /** Tighter pill for nav bars */
  size?: "default" | "compact";
}

export function CartoonButton({
  label,
  children,
  color = "bg-primary",
  hasHighlight = true,
  disabled = false,
  onClick,
  size = "default",
}: CartoonButtonProps) {
  const sizeClass =
    size === "compact"
      ? "h-9 px-4 text-xs sm:h-10 sm:px-5 sm:text-sm"
      : "h-12 px-6 text-xl";
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <div
      className={`inline-block ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      <button
        disabled={disabled}
        onClick={handleClick}
        className={`relative rounded-full font-bold text-primary-foreground border-2 border-white/30 backdrop-blur-md transition-all duration-150 overflow-hidden group shadow-[0_8px_28px_-4px_rgba(45,212,191,0.35)] ${sizeClass}
        ${color} hover:shadow-[0_10px_32px_-4px_rgba(45,212,191,0.45)]
        ${disabled ? "opacity-50 pointer-events-none" : "hover:-translate-y-1 active:translate-y-0 active:shadow-none"}`}
      >
        <span className="relative z-10 whitespace-nowrap">
          {children ?? label}
        </span>
        {hasHighlight && !disabled && (
          <div className="absolute top-1/2 left-[-100%] w-16 h-24 bg-white/50 -translate-y-1/2 rotate-12 transition-all duration-500 ease-in-out group-hover:left-[200%]" />
        )}
      </button>
    </div>
  );
}
