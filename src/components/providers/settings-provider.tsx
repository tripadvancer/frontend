'use client'

import { ReactNode, createContext, useContext } from 'react'

import { settingsAPI } from '@/utils/redux/services/settings/settings.api'
import { ApplicationSettings } from '@/utils/redux/services/settings/settings.types'

const SettingsContext = createContext<ApplicationSettings | null>(null)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const { data } = settingsAPI.useGetSettingsQuery()

    return <SettingsContext.Provider value={data ?? null}>{children}</SettingsContext.Provider>
}

export function useAppSettings(): ApplicationSettings | null {
    return useContext(SettingsContext)
}
