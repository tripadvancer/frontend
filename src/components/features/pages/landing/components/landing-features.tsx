import { getTranslations } from 'next-intl/server'

import { LandingFeaturesLists } from './landing-features-lists'
import { LandingFeaturesPlaces } from './landing-features-places'
import { LandingFeaturesRandom } from './landing-features-random'

export const LandingFeatures = async () => {
    const t = await getTranslations()

    return (
        <section>
            <h3 className="h3 mb-4 text-center">{t('page.landing.features.title')}</h3>
            <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                {t.rich('page.landing.features.text', { br: () => <br /> })}
            </p>

            <div className="inner-container flex flex-col gap-y-16 sm:gap-y-8">
                <LandingFeaturesPlaces />
                <LandingFeaturesLists />
                <LandingFeaturesRandom />
            </div>
        </section>
    )
}
