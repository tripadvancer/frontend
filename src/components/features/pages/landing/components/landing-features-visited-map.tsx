import { getTranslations } from 'next-intl/server'

import Image from 'next/image'

import { LandingFeaturesVisitedMapButtonWithAuth } from './landing-features-visited-map-button-with-auth'

export const LandingFeaturesVisitedMap = async () => {
    const t = await getTranslations()

    return (
        <div className="grid items-center gap-y-8 sm:grid-cols-2 sm:gap-x-16">
            <Image
                src="/images/landing-features-visited-map.svg"
                width={448}
                height={448}
                className="m-auto block"
                alt="Random places around me"
            />
            <section className="flex flex-col gap-y-4 sm:-order-1 sm:gap-y-8 sm:text-right">
                <h4 className="h5">{t.rich('page.landing.features.visitedMap.title', { br: () => <br /> })}</h4>
                <p>{t('page.landing.features.visitedMap.text')}</p>
                <div className="flex-none">
                    <LandingFeaturesVisitedMapButtonWithAuth />
                </div>
            </section>
        </div>
    )
}
