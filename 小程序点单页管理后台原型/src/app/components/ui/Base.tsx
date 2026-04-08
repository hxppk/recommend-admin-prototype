import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline" | "ghost" | "danger", size?: "sm" | "md" | "lg" }>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
    };
    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };
    
    return (
      <button
        ref={ref}
        className={cn("inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed", variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
  return <div className={cn("bg-card text-card-foreground rounded-lg border border-border shadow-sm", className)}>{children}</div>;
}

export function Badge({ children, variant = "default" }: { children: React.ReactNode, variant?: "default" | "success" | "warning" | "danger" | "neutral" }) {
  // Mapping to theme colors roughly
  const variants = {
    default: "bg-primary/10 text-primary border-primary/20",
    success: "bg-green-100 text-green-700 border-green-200", // Semantic success not in theme, keeping hardcoded or mapped to something else? 
    // Actually theme has 'chart-1' etc, but let's stick to standard colors for status if not in theme. 
    // However, I should try to use theme if possible. Let's stick to hardcoded for specific statuses to ensure distinctness if theme lacks them.
    // Wait, let's use standard tailwind colors for statuses (green, amber, red) as they are universally understood, but maybe muted versions.
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    danger: "bg-destructive/10 text-destructive border-destructive/20",
    neutral: "bg-muted text-muted-foreground border-border",
  };
  // Note: Success/Warning are not strictly in the theme variables provided (primary/secondary/accent/destructive).
  // I will leave them as hardcoded Tailwind colors for now as they are "content" colors, but use `destructive` for danger.

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border", variants[variant])}>
      {children}
    </span>
  );
}
