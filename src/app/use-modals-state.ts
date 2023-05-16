import { useContext } from 'react'
import { ModalsStateContext } from './providers/modals-state-provider'
import { IRouteMap } from './types'

export const useModalsState = (): IRouteMap[] => {
  const state = useContext(ModalsStateContext)
  if (!state) {
    throw new Error('Can not use `useModalsState` outside of the `Provider`')
  }
  return state
}
