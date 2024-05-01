'use client'

import { ReactNode } from 'react'
import { MapProvider } from 'react-map-gl/maplibre'
import { ParallaxProvider } from 'react-scroll-parallax'

import { DialogProvider } from '@/providers/dialog-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { ReduxProvider } from '@/redux/provider'
import { I18nProvider } from '@/utils/i18n/i18n.provider'
import { SuperTokensInit } from '@/utils/supertokens/supertokens.init'

export function Providers({ children, locale }: { children: ReactNode; locale: string }) {
    return (
        <ReduxProvider>
            <I18nProvider locale={locale}>
                <SuperTokensInit>
                    <ToastProvider>
                        <MapProvider>
                            <DialogProvider>
                                <ParallaxProvider>{children}</ParallaxProvider>
                            </DialogProvider>
                        </MapProvider>
                    </ToastProvider>
                </SuperTokensInit>
            </I18nProvider>
        </ReduxProvider>
    )
}
