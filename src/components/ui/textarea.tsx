
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-xl border border-purple-500/30 bg-purple-900/20 backdrop-blur-xl px-4 py-3 text-sm text-white ring-offset-background placeholder:text-purple-400/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:border-purple-400/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 shadow-glow resize-none hover:shadow-glow-intense",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
