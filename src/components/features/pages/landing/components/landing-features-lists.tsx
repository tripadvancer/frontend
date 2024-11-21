import { getTranslations } from 'next-intl/server'

import Image from 'next/image'

import { LandingFeaturesListsButton } from './landing-features-lists-buttons'

export const LandingFeaturesLists = async () => {
    const t = await getTranslations()

    return (
        <div className="grid items-center gap-y-8 sm:grid-cols-2 sm:gap-x-16">
            <Image
                src="/images/features-lists.svg"
                width={448}
                height={448}
                className="m-auto block"
                alt="Personalized travel lists"
            />
            <section className="flex flex-col gap-y-4 sm:-order-1 sm:gap-y-8 sm:text-right">
                <h4 className="h5">{t.rich('page.landing.features.featureLists.title', { br: () => <br /> })}</h4>
                <p>{t('page.landing.features.featureLists.text')}</p>
                <div className="flex-none">
                    <LandingFeaturesListsButton />
                </div>
            </section>
        </div>
    )
}
