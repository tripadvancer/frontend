import { CookieConsent } from '@/components/features/cookie-consent/cookie-consent'
import { EmailVerification } from '@/components/features/email-verification/email-verification'
import { Mapbox } from '@/components/features/map/mapbox'
import { Onboarding } from '@/components/features/onboarding/onboarding'
import { Widget } from '@/components/features/widget/widget'

export default function MapsPage() {
    return (
        <div className="h-dvh w-dvw border">
            <EmailVerification />
            <Widget />
            <Mapbox />
            <Onboarding />
            <CookieConsent />
        </div>
    )
}
