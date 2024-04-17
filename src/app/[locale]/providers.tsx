'use client'

import { MapProvider } from 'react-map-gl/maplibre'
import { ParallaxProvider } from 'react-scroll-parallax'

import { DialogProvider } from '@/providers/dialog-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { ReduxProvider } from '@/redux/provider'
import { I18nProvider } from '@/utils/i18n/i18n.provider'
import { SupertokensProvider } from '@/utils/supertokens/supertokens.provider'

export function Providers({ children, locale }: { children: React.ReactNode; locale: string }) {
    return (
        <ReduxProvider>
            <I18nProvider locale={locale}>
                <SupertokensProvider>
                    <ToastProvider>
                        <MapProvider>
                            <DialogProvider>
                                <ParallaxProvider>{children}</ParallaxProvider>
                            </DialogProvider>
                        </MapProvider>
                    </ToastProvider>
                </SupertokensProvider>
            </I18nProvider>
        </ReduxProvider>
    )
}
