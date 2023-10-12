import Image from 'next/image'
import Link from 'next/link'

import { CountryFeed } from '@/components/CountryFeed'
import { getCountries } from '@/services/countries'
import { getScopedI18n } from '@/utils/i18n.server'

export default async function Home() {
    const t = await getScopedI18n('pages.home')
    const countries = await getCountries()

    return (
        <div className="container py-24">
            <section className="mb-24">
                <h1 className="mb-5 text-center text-5xl">{t('countries.title')}</h1>
                <p className="m-auto mb-16 w-2/3 text-center text-base text-custom-black-70">
                    {t('countries.description')}
                </p>
                <CountryFeed countries={countries} />
            </section>

            <section className="mb-24">
                <h2 className="mb-5 text-center text-4xl">{t('features.title')}</h2>
                <p className="m-auto mb-16 w-2/3 text-center text-base text-custom-black-70">
                    {t('features.description')}
                </p>

                <div className="mb-8 flex flex-row items-center gap-16">
                    <Image src="/images/pic-1.svg" width={448} height={448} alt="" />
                    <div>
                        <h3 className="mb-8 text-3xl">{t('features.places.title', { br: <br /> })}</h3>
                        <p className="text-sm">{t('features.places.description')}</p>
                    </div>
                </div>

                <div className="mb-8 flex flex-row items-center gap-16">
                    <div className="text-right">
                        <h3 className="mb-8 text-3xl">{t('features.random.title', { br: <br /> })}</h3>
                        <p className="text-sm">{t('features.random.description')}</p>
                    </div>
                    <Image src="/images/pic-2.svg" width={448} height={448} alt="" />
                </div>

                <div className="flex flex-row items-center gap-16">
                    <Image src="/images/pic-3.svg" width={448} height={448} alt="" />
                    <div>
                        <h3 className="mb-8 text-3xl">{t('features.lists.title', { br: <br /> })}</h3>
                        <p className="text-sm">{t('features.lists.description')}</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="mb-5 text-center text-4xl">{t('map.title')}</h2>
                <p className="m-auto mb-16 w-2/3 text-center text-base text-custom-black-70">{t('map.description')}</p>

                <div className="relative">
                    <Image src="/images/map.svg" width={1120} height={400} alt="" />
                    <Link
                        href="/map"
                        className="absolute left-1/2 top-1/2 flex h-10 -translate-x-1/2 -translate-y-1/2 transform items-center rounded-lg bg-custom-orange-100 px-6 text-sm font-medium text-white hover-animated hover:bg-custom-orange-active hover:text-white"
                    >
                        {t('map.cta')}
                    </Link>
                </div>
            </section>
        </div>
    )
}
