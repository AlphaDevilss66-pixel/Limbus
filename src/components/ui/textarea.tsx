
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:border-white/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 resize-none hover:border-white/20",
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
