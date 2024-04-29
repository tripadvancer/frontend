import Image from 'next/image'

import { getI18n } from '@/utils/i18n/i18n.server'

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
            <section>
                <h3 className="h5 mb-4 sm:mb-8">{t('landing.features.random.title', { br: <br /> })}</h3>
                <p>{t('landing.features.random.text')}</p>
            </section>
        </div>
    )
}
