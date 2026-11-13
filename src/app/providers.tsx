'use client'

import { ReactNode } from 'react'
import { MapProvider } from 'react-map-gl/maplibre'

import { setWorkerUrl } from 'maplibre-gl'

import { DialogProvider } from '@/components/providers/dialog-provider'
import { ReduxProvider } from '@/components/providers/redux-provider'
import { ToastProvider } from '@/components/providers/toast-provider'
import { SuperTokensInit } from '@/utils/supertokens/supertokens.init'

setWorkerUrl('/maplibre-gl-worker.mjs')

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ReduxProvider>
            <SuperTokensInit>
                <ToastProvider>
                    <MapProvider>
                        <DialogProvider>{children}</DialogProvider>
                    </MapProvider>
                </ToastProvider>
            </SuperTokensInit>
        </ReduxProvider>
    )
}
