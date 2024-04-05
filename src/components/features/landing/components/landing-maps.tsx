import Image from 'next/image'
import Link from 'next/link'

import { getI18n } from '@/utils/i18n/i18n.server'

export const LandingMaps = async () => {
    const t = await getI18n()

    return (
        <section>
            <h2 className="h3 mb-4 text-center">{t('pages.landing.map.title')}</h2>
            <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                {t('pages.landing.map.description')}
            </p>

            <div className="relative">
                <Image src="/images/map.svg" width={1120} height={400} alt="The best trip planner" />
                <Link
                    href="/maps"
                    className="hover-animated absolute left-1/2 top-1/2 flex h-10 -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap rounded-lg bg-orange-100 px-6 text-white hover:bg-orange-active hover:text-white"
                >
                    {t('pages.landing.map.cta')}
                </Link>
            </div>
        </section>
    )
}
