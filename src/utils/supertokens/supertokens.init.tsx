'use client'

import { ReactNode, useEffect } from 'react'

import SuperTokensAuth from 'supertokens-web-js'

import { useAppSettings } from '@/components/providers/settings-provider'

import { clientConfig } from './supertokens.client'

let isInitialized = false
let resolveInitialization!: () => void
const initialization = new Promise<void>(resolve => {
    resolveInitialization = resolve
})

export const waitForSuperTokensInitialization = () => initialization

export const SuperTokensInit = ({ children }: { children: ReactNode }) => {
    const settings = useAppSettings()

    useEffect(() => {
        if (!settings) {
            return
        }

        if (!isInitialized) {
            SuperTokensAuth.init(clientConfig(settings.name))
            isInitialized = true
            resolveInitialization()
        }
    }, [settings])

    return children
}
