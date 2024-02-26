import { CookieConsent } from '@/components/features/cookie-consent/cookie-consent'
import { EmailVerification } from '@/components/features/email-verification/email-verification'
import { Maps } from '@/components/features/maps/maps'

export default async function MapsPage() {
    return (
        <div className="h-screen w-screen">
            <EmailVerification />
            <Maps />
            <CookieConsent />
        </div>
    )
}
