import { getTranslations } from 'next-intl/server'

import Image from 'next/image'

import { LandingFeaturesPlacesButtonWithAuth } from './landing-features-places-button-with-auth'

export const LandingFeaturesPlaces = async () => {
    const t = await getTranslations()

    return (
        <div className="grid items-center gap-y-8 sm:grid-cols-2 sm:gap-x-16">
            <Image
                src="/images/features-places.svg"
                width={448}
                height={448}
                className="m-auto block"
                alt="Points of Interest"
            />
            <section className="flex flex-col gap-y-4 sm:gap-y-8">
                <h3 className="h5">{t.rich('page.landing.features.featurePlaces.title', { br: () => <br /> })}</h3>
                <p>{t('page.landing.features.featurePlaces.text')}</p>
                <div className="flex-none">
                    <LandingFeaturesPlacesButtonWithAuth />
                </div>
            </section>
        </div>
    )
}
