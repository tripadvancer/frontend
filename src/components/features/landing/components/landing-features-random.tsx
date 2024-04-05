import Image from 'next/image'

import { getI18n } from '@/utils/i18n/i18n.server'

export const LandingFeaturesRandom = async () => {
    const t = await getI18n()

    return (
        <div className="grid-row-2 grid items-center gap-y-8 sm:grid-cols-2 sm:grid-rows-none sm:gap-x-16">
            <Image
                src="/images/features-random.svg"
                width={448}
                height={448}
                className="m-auto block"
                alt="Random places around me"
            />
            <section className="sm:-order-1 sm:text-right">
                <h3 className="h5 mb-4 sm:mb-8">{t('onboarding.features.random.title', { br: <br /> })}</h3>
                <p>{t('onboarding.features.random.description')}</p>
            </section>
        </div>
    )
}
