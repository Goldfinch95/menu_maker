"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        error: null,
        success: null,
        warning: null,
        info: null,
        loading: null,
      }}
      style={
        {
          "--normal-bg": "#EF4444",
          "--normal-text": "#FFFFFF",
          "--normal-border": "#DC2626",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
