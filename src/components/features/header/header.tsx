import Link from 'next/link'

import { EmailVerification } from '@/components/features/email-verification/email-verification'
import { FormButton } from '@/components/ui/form-button'
import { EditIcon24, MapIcon24 } from '@/components/ui/icons'
import { getI18n } from '@/utils/i18n/i18n.server'

import { HeaderLanguageChanger } from './components/header-language-changer'
import { HeaderLogo } from './components/header-logo'
import { HeaderUser } from './components/header-user'

export const Header = async () => {
    const t = await getI18n()

    return (
        <>
            <div className="absolute left-0 right-0 top-0 -z-10 h-[200px] bg-blue-20" />
            <header className="sticky top-0 z-40 bg-blue-20">
                <EmailVerification />
                <div className="container relative flex h-[56px] items-center justify-between sm:h-[76px]">
                    <HeaderLogo />
                    {/* <div className="flex gap-x-4 sm:gap-x-6">
                        <Link href="/maps" className="flex items-center gap-x-2 text-big-bold">
                            <MapIcon24 />
                            <span className="hidden md:block">{t('header.link.map')}</span>
                        </Link>
                    </div>
                    <HeaderLogo />
                    <div className="flex gap-x-4 sm:gap-x-6">
                        <HeaderUser />
                        <HeaderLanguageChanger />
                    </div> */}
                    <div className="flex items-center gap-x-2">
                        <FormButton variant="blue" size="small" shape="rounded">
                            Add place
                        </FormButton>
                        <HeaderUser />
                        {/* <HeaderLanguageChanger /> */}
                    </div>
                </div>
            </header>
        </>
    )
}
