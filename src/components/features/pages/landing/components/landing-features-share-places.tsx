import { getTranslations } from 'next-intl/server'

import Image from 'next/image'

import { LandingFeaturesSharePlacesButtonWithAuth } from './landing-features-share-places-button-with-auth'

export const LandingFeaturesSharePlaces = async () => {
    const t = await getTranslations()

    return (
        <div className="grid items-center gap-y-8 sm:grid-cols-2 sm:gap-x-16">
            <Image
                src="/images/landing-features-share-places.svg"
                width={448}
                height={448}
                className="m-auto block"
                alt="Points of Interest"
            />
            <section className="flex flex-col gap-y-4 sm:gap-y-8">
                <h4 className="h5">{t.rich('page.landing.features.sharePlaces.title', { br: () => <br /> })}</h4>
                <p>{t('page.landing.features.sharePlaces.text')}</p>
                <div className="flex-none">
                    <LandingFeaturesSharePlacesButtonWithAuth />
                </div>
            </section>
        </div>
    )
}
