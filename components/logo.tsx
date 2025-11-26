"use client"

import Image from "next/image"
import { Building2 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface LogoProps {
  width?: number
  height?: number
  className?: string
  showIcon?: boolean
  iconClassName?: string
}

export function Logo({ 
  width = 40, 
  height = 40, 
  className,
  showIcon = true,
  iconClassName
}: LogoProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", className)}>
      {!imageError ? (
        <Image
          src="/logo.png"
          alt="Mekenet SACCO LTD Logo"
          width={width}
          height={height}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          priority={width > 100}
        />
      ) : (
        showIcon && (
          <Building2 className={cn("text-primary", iconClassName)} style={{ width, height }} />
        )
      )}
    </div>
  )
}

