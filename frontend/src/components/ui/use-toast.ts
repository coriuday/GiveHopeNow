import { useState, useEffect } from "react"

export function useToast() {
  const [toast, setToast] = useState<{
    title?: string
    description?: string
    type?: 'default' | 'success' | 'error' | 'warning'
    duration?: number
  } | null>(null)

  const showToast = (props: {
    title?: string
    description?: string
    type?: 'default' | 'success' | 'error' | 'warning'
    duration?: number
  }) => {
    setToast(props)
  }

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, toast.duration || 3000)

      return () => clearTimeout(timer)
    }
  }, [toast])

  return {
    toast,
    showToast,
    dismissToast: () => setToast(null)
  }
}

export type UseToastReturn = ReturnType<typeof useToast> 