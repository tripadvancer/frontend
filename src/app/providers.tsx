'use client'

import { ReactNode } from 'react'
import { MapProvider } from 'react-map-gl/maplibre'
import { ParallaxProvider } from 'react-scroll-parallax'

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
                            <ParallaxProvider>{children}</ParallaxProvider>
                        </DialogProvider>
                    </MapProvider>
                </ToastProvider>
            </SuperTokensInit>
        </ReduxProvider>
    )
}
