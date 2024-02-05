import { CookieConsent } from '@/components/features/cookie-consent/cookie-consent'
import { EmailVerificationNotice } from '@/components/features/email-verification-notice/email-verification-notice'
import { Maps } from '@/components/features/maps/maps'

export default function MapsPage() {
    return (
        <div className="h-screen w-screen">
            <EmailVerificationNotice />
            <Maps />
            <CookieConsent />
        </div>
    )
}
