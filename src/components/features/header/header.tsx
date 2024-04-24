import Link from 'next/link'

import { EmailVerification } from '@/components/features/email-verification/email-verification'
import { getI18n } from '@/utils/i18n/i18n.server'

import { HeaderButtons } from './components/header-buttons'
import { HeaderLanguageChanger } from './components/header-language-changer'
import { HeaderLogo } from './components/header-logo'

export const Header = async () => {
    const t = await getI18n()

    return (
        <>
            <div className="absolute left-0 right-0 top-0 -z-10 h-[200px] bg-blue-20" />
            <header className="sticky top-0 z-40 bg-blue-20">
                <EmailVerification />
                <div className="container flex-center relative h-[56px] gap-x-6 sm:h-[76px]">
                    <HeaderLogo />
                    <Link href="/maps" className="text-big-bold">
                        {t('header.link.map')}
                    </Link>
                    <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-x-2 sm:right-8">
                        <HeaderButtons />
                    </div>
                </div>
            </header>
        </>
    )
}
