import Image from 'next/image'
import Link from 'next/link'

import { getI18n } from '@/utils/i18n/i18n.server'

export const LandingMaps = async () => {
    const t = await getI18n()

    return (
        <section>
            <h2 className="h3 mb-4 text-center">{t('landing.map.title')}</h2>
            <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">{t('landing.map.text')}</p>
            <Link href="/maps">
                <Image
                    src="/images/map.jpg"
                    width={928}
                    height={580}
                    className="m-auto mb-8"
                    alt="The best trip planner"
                />
            </Link>
            <div className="text-center">
                <Link
                    href="/maps"
                    className="hover-animated inline-flex h-10 items-center whitespace-nowrap rounded-lg bg-orange-100 px-6 text-white hover:bg-orange-active hover:text-white"
                >
                    {t('landing.map.button')}
                </Link>
            </div>
        </section>
    )
}
