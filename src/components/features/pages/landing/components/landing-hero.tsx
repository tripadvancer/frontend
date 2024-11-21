import { getTranslations } from 'next-intl/server'

import Image from 'next/image'

import { LinkButton } from '@/components/ui/link-button'

import { LandingHeroBg } from './landing-hero-bg'
import { LandingJoinButtonWithAuth } from './landing-hero-join-button-with-auth'

export const LandingHero = async () => {
    const t = await getTranslations()

    return (
        <div className="relative flex flex-col justify-center bg-blue-80 pb-7 lg:h-[700px]">
            <LandingHeroBg />

            <div className="m-auto flex flex-col gap-y-8 px-4 py-16 text-center sm:w-[608px] lg:absolute lg:left-16 lg:top-1/2 lg:w-[600px] lg:-translate-y-1/2 lg:transform lg:px-0 lg:py-0 lg:text-left xl:left-1/2 xl:-translate-x-full">
                <div>
                    <h1 className="h1 mb-4 text-white">{t('page.landing.hero.title')}</h1>
                    <p className="text-big text-white">{t('page.landing.hero.text')}</p>
                </div>
                <div className="flex items-center justify-center gap-x-4 lg:justify-start">
                    <LandingJoinButtonWithAuth />
                    <LinkButton href="#features" variant="white">
                        {t('page.landing.hero.learnMore')}
                    </LinkButton>
                </div>
                <Image
                    src="/images/landing-hero-bg-phone.svg"
                    width={288}
                    height={186}
                    className="m-auto block lg:hidden"
                    alt="Tripadvancer"
                />
            </div>
        </div>
    )
}
