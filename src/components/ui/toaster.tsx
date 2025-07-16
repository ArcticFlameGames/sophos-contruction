"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface ToasterToast extends ToastPrimitive.ToastProps {
  id: string
  title?: string
  description?: string
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(
        "grid grid-cols-[auto_max-content] items-center gap-x-4 rounded-md p-4 shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out",
        "data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
        "data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
        className
      )}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitive.Root.displayName

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

export function Toaster() {
  const { toasts } = useToast()
  const { theme } = useTheme()

  return (
    <ToastPrimitive.Provider>
      {toasts.map((toast: ToasterToast) => {
        const { id, title, description, ...props } = toast;
        return (
          <Toast
            key={id}
            className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} border border-gray-200 dark:border-gray-700`}
            {...props}
          >
            <div className="grid gap-1">
              {title && <div className="font-semibold">{title}</div>}
              {description && (
                <div className="text-sm opacity-90">{description}</div>
              )}
            </div>
            <ToastPrimitive.Close className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none group-hover:opacity-100">
              <X className="h-4 w-4" />
            </ToastPrimitive.Close>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastPrimitive.Provider>
  )
}

export { Toast, ToastViewport }
