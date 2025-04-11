'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { TooltipProvider } from '@/components/ui/tooltip'
import { makeStore } from '@/store'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={makeStore()}>
      <TooltipProvider>{children}</TooltipProvider>
    </Provider>
  )
}
