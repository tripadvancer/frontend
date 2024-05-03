import Image from 'next/image'

import { getI18n } from '@/utils/i18n/i18n.server'

import { LandingFeaturesRandomButton } from './landing-features-random-button'

export const LandingFeaturesRandom = async () => {
    const t = await getI18n()

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
                <h3 className="h5">{t('landing.features.random.title', { br: <br /> })}</h3>
                <p>{t('landing.features.random.text')}</p>
                <div className="flex-none">
                    <LandingFeaturesRandomButton />
                </div>
            </section>
        </div>
    )
}
