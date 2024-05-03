import Link from 'next/link'

import { EmailVerification } from '@/components/features/email-verification/email-verification'
import { MapIcon24, MenuIcon24 } from '@/components/ui/icons'
import { getI18n } from '@/utils/i18n/i18n.server'

import { HeaderButtons } from './components/header-buttons'
import { HeaderLogo } from './components/header-logo'

export const Header = async () => {
    const t = await getI18n()

    return (
        <>
            <div className="absolute left-0 right-0 top-0 -z-10 h-[200px] bg-blue-20" />
            <header className="sticky top-0 z-40 bg-blue-20">
                <EmailVerification />
                <div className="container flex h-[56px] items-center justify-between gap-x-6 sm:h-[76px]">
                    <div className="flex gap-x-4">
                        <div className="link-black block sm:hidden">
                            <MenuIcon24 />
                        </div>
                        <HeaderLogo />
                    </div>

                    <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform sm:block">
                        <Link href="/maps" className="flex items-center gap-x-2 text-big-bold">
                            <MapIcon24 />
                            {t('header.link.map')}
                        </Link>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <HeaderButtons />
                    </div>
                </div>
            </header>
        </>
    )
}
