'use client'

import { ReactNode } from 'react'
import { MapProvider } from 'react-map-gl/maplibre'

import { SessionExpiredHandler } from '@/components/features/auth/session-expired-handler'
import { DialogProvider } from '@/components/providers/dialog-provider'
import { ReduxProvider } from '@/components/providers/redux-provider'
import { ToastProvider } from '@/components/providers/toast-provider'
import { SuperTokensInit } from '@/utils/supertokens/supertokens.init'

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ReduxProvider>
            <SuperTokensInit>
                <ToastProvider>
                    <MapProvider>
                        <DialogProvider>
                            {children}
                            <SessionExpiredHandler />
                        </DialogProvider>
                    </MapProvider>
                </ToastProvider>
            </SuperTokensInit>
        </ReduxProvider>
    )
}
