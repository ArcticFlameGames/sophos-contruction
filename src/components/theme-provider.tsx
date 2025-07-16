"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps as NextThemesProviderProps } from "next-themes"

type ThemeProviderProps = Omit<NextThemesProviderProps, 'attribute'> & {
  children: React.ReactNode
  attribute?: 'class' | 'data-theme' | 'data-theme-attribute'
}

export function ThemeProvider({ 
  children, 
  defaultTheme = "system",
  storageKey = "sophos-theme",
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = true,
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      defaultTheme={defaultTheme}
      storageKey={storageKey}
      attribute={attribute}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
