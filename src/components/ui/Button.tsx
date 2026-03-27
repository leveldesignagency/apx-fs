import { cn } from "@/lib/utils"
import Link from "next/link"
import { ButtonHTMLAttributes, forwardRef, type Ref } from "react"

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "href"> {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  /** When set, renders as a Next.js link with the same visual styles as a button */
  href?: string
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "default", size = "md", href, children, disabled, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
      {
        "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
        "border border-input hover:bg-accent hover:text-accent-foreground": variant === "outline",
        "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
      },
      {
        "h-9 px-3 text-sm": size === "sm",
        "h-10 px-4 py-2": size === "md",
        "h-11 px-8 text-lg": size === "lg",
      },
      className
    )

    if (href) {
      return (
        <Link
          href={href}
          className={cn(classes, disabled && "pointer-events-none opacity-50")}
          aria-disabled={disabled}
          ref={ref as Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        className={classes}
        ref={ref as Ref<HTMLButtonElement>}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
