import { getTranslations } from 'next-intl/server'

import Image from 'next/image'

import { LandingFeaturesRandomButton } from './landing-features-random-button'

export const LandingFeaturesRandom = async () => {
    const t = await getTranslations()

    return (
        <div className="grid items-center gap-y-8 sm:grid-cols-2 sm:gap-x-16">
            <Image
                src="/images/features-random.svg"
                width={448}
                height={448}
                className="m-auto block"
                alt="Random places around me"
            />
            <section className="flex flex-col gap-y-4 sm:gap-y-8">
                <h4 className="h5">{t.rich('page.landing.features.featureRandom.title', { br: () => <br /> })}</h4>
                <p>{t('page.landing.features.featureRandom.text')}</p>
                <div className="flex-none">
                    <LandingFeaturesRandomButton />
                </div>
            </section>
        </div>
    )
}
