import { getI18n } from '@/utils/i18n/i18n.server'

import { LandingFeaturesLists } from './landing-features-lists'
import { LandingFeaturesPlaces } from './landing-features-places'
import { LandingFeaturesRandom } from './landing-features-random'

export const LandingFeatures = async () => {
    const t = await getI18n()

    return (
        <section>
            <h2 className="mb-4 text-center text-h3-m sm:text-h3">{t('pages.landing.features.title')}</h2>
            <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                {t('pages.landing.features.description')}
            </p>

            <div className="inner-container flex flex-col gap-y-16 sm:gap-y-8">
                <LandingFeaturesPlaces />
                <LandingFeaturesRandom />
                <LandingFeaturesLists />
            </div>
        </section>
    )
}
