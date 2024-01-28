import { MailVerificationNotice } from '@/components/features/mail-verification-notice/mail-verification-notice'
import { getUserInfo } from '@/services/user'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { LanguageChanger } from './components/language-changer'
import { Logo } from './components/logo'
import { MapLink } from './components/map-link'
import { SignInLink } from './components/signin-link'
import { User } from './components/user'

export const Header = async () => {
    const { session, hasToken, hasInvalidClaims } = await getSSRSession()

    // if (!session) {
    // if (!hasToken) {
    //     return <div>Not login user</div>
    // }

    // return <TryRefreshComponent />
    // }

    // const userInfo = await getUserInfo(session.getAccessToken())

    return (
        <header className="sticky top-0 z-40 bg-blue-20">
            {hasInvalidClaims && <MailVerificationNotice />}
            <div className="container relative flex h-[56px] items-center justify-between sm:h-[76px]">
                <MapLink />
                <Logo />
                <div className="flex gap-x-4 sm:gap-x-6">
                    {/* {!session && <SignInLink />}
                    {session && hasToken && <User />} */}
                    <SignInLink />
                    <LanguageChanger />
                </div>
            </div>
        </header>
    )
}
