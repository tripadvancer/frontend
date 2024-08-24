'use client'

import { ReactNode } from 'react'
import { MapProvider } from 'react-map-gl/maplibre'
import { ParallaxProvider } from 'react-scroll-parallax'

import { DialogProvider } from '@/providers/dialog-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { ReduxProvider } from '@/redux/provider'
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
