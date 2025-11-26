import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex field-sizing-content min-h-[80px] sm:min-h-[100px] w-full rounded-lg border-2 bg-transparent px-4 py-3 text-sm sm:text-base shadow-sm transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        "focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:ring-4 focus-visible:shadow-md",
        "hover:border-primary/50",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
