import React from 'react'
import { IRouteMap } from '../types'

export const ModalsStateContext = React.createContext<IRouteMap[]>([])

export const ModalsStateProvider = ModalsStateContext.Provider
