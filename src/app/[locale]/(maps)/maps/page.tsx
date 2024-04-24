import { CookieConsent } from '@/components/features/cookie-consent/cookie-consent'
import { Mapbox } from '@/components/features/map/mapbox'
import { Onboarding } from '@/components/features/onboarding/onboarding'
import { WidgetCommon } from '@/components/features/widget/widget-common'

export default function MapsPage() {
    return (
        <div className="h-dvh w-dvw border">
            <WidgetCommon />
            <Mapbox />
            <Onboarding />
            <CookieConsent />
        </div>
    )
}
