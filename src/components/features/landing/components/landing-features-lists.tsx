import Image from 'next/image'

import { getI18n } from '@/utils/i18n/i18n.server'

export const LandingFeaturesLists = async () => {
    const t = await getI18n()

    return (
        <div className="grid items-center gap-y-8 sm:grid-cols-2 sm:gap-x-16">
            <Image
                src="/images/features-lists.svg"
                width={448}
                height={448}
                className="m-auto block"
                alt="Personalized travel lists"
            />
            <section className="sm:-order-1 sm:text-right">
                <h3 className="h5 mb-4 sm:mb-8">{t('landing.features.lists.title')}</h3>
                <p>{t('landing.features.lists.text')}</p>
            </section>
        </div>
    )
}
