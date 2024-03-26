import { CookieConsent } from '@/components/features/cookie-consent/cookie-consent'
import { Mapbox } from '@/components/features/map/mapbox'
import { Onboarding } from '@/components/features/onboarding/onboarding'
import { Widget } from '@/components/features/widget/widget'

export default function MapsPage() {
    return (
        <div className="h-dvh w-dvw border">
            <Widget />
            <Mapbox />
            <Onboarding />
            <CookieConsent />
        </div>
    )
}
