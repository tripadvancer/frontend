import Image from 'next/image'

import { getSettings } from '@/services/settings'
import { getI18n } from '@/utils/i18n/i18n.server'

export const LandingFeaturesPlaces = async () => {
    const t = await getI18n()
    const settings = await getSettings()

    return (
        <div className="grid items-center gap-y-8 sm:grid-cols-2 sm:gap-x-16">
            <Image
                src="/images/features-places.svg"
                width={448}
                height={448}
                className="m-auto block"
                alt="Points of Interest"
            />
            <section>
                <h3 className="h5 mb-4 sm:mb-8">
                    {t('onboarding.features.places.title', {
                        br: <br />,
                        placesCount: settings.placesCount,
                        countriesCount: settings.countriesCount,
                    })}
                </h3>
                <div className="flex flex-col gap-y-4">
                    <p>{t('onboarding.features.places.description.1')}</p>
                    <p>{t('onboarding.features.places.description.2')}</p>
                </div>
            </section>
        </div>
    )
}
