import { EmailVerificationClaim } from 'supertokens-node/recipe/emailverification'

import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { EmailVerificationNotice } from '../email-verification-notice/email-verification-notice'
import { LanguageChanger } from './components/language-changer'
import { Logo } from './components/logo'
import { MapLink } from './components/map-link'
import { User } from './components/user'

export const Header = async () => {
    const { session, hasToken } = await getSSRSession()

    if (!session && hasToken) {
        return <TryRefreshComponent />
    }

    const emailVerificationClaim = await session?.getClaimValue(EmailVerificationClaim)
    const emailIsNotVerified = emailVerificationClaim === false // because it can be undefined

    return (
        <>
            <div className="absolute left-0 right-0 top-0 -z-10 h-[200px] bg-blue-20" />
            <header className="sticky top-0 z-40 bg-blue-20">
                {emailIsNotVerified && <EmailVerificationNotice />}
                <div className="container relative flex h-[56px] items-center justify-between sm:h-[76px]">
                    <MapLink />
                    <Logo />
                    <div className="flex gap-x-4 sm:gap-x-6">
                        <User />
                        <LanguageChanger />
                    </div>
                </div>
            </header>
        </>
    )
}
