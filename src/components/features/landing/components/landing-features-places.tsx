import Image from 'next/image'

import { getI18n } from '@/utils/i18n/i18n.server'

import { LandingFeaturesPlacesButton } from './landing-features-places-button'

export const LandingFeaturesPlaces = async () => {
    const t = await getI18n()

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
                <h3 className="h5">{t('landing.features.places.title', { br: <br /> })}</h3>
                <p>{t('landing.features.places.text')}</p>
                <div className="flex-none">
                    <LandingFeaturesPlacesButton />
                </div>
            </section>
        </div>
    )
}
