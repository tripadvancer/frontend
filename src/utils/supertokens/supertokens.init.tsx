'use client'

import { ReactNode, useEffect } from 'react'

import SuperTokensAuth from 'supertokens-web-js'

import { useAppSettings } from '@/components/providers/settings-provider'

import { clientConfig } from './supertokens.client'
import { markSuperTokensInitialized } from './supertokens.initialization'

let isInitialized = false

export const SuperTokensInit = ({ children }: { children: ReactNode }) => {
    const settings = useAppSettings()

    useEffect(() => {
        if (!settings) {
            return
        }

        if (!isInitialized) {
            SuperTokensAuth.init(clientConfig(settings.name))
            isInitialized = true
            markSuperTokensInitialized()
        }
    }, [settings])

    return children
}
