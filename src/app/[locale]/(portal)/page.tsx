import Image from 'next/image'
import Link from 'next/link'

import { CountriesFeed } from '@/components/CountriesFeed/CountriesFeed'
import { getCountries } from '@/services/countries'
import { getScopedI18n } from '@/utils/i18n.server'

export default async function Home() {
    const t = await getScopedI18n('pages.home')
    const countries = await getCountries()

    return (
        <div className="container py-24">
            <section className="mb-24">
                <h1 className="text-h1-m sm:text-h1 mb-4 text-center">{t('countries.title')}</h1>
                <p className="sm:w-2/3 text-black-70 text-big m-auto mb-16 w-full text-center">
                    {t('countries.description')}
                </p>
                <CountriesFeed countries={countries} />
            </section>

            <section className="mb-24">
                <h2 className="text-h3-m sm:text-h3 mb-4 text-center">{t('features.title')}</h2>
                <p className="sm:w-2/3 text-black-70 text-big m-auto mb-16 w-full text-center">
                    {t('features.description')}
                </p>

                <div className="inner-container sm:gap-y-8 flex flex-col gap-y-16">
                    <div className="grid-row-2 sm:grid-rows-none sm:grid-cols-2 sm:gap-x-16 grid items-center gap-y-8">
                        <Image src="/images/pic-1.svg" width={448} height={448} className="m-auto block" alt="" />
                        <section>
                            <h3 className="sm:mb-8 text-h5-m sm:text-h5 mb-4">
                                {t('features.places.title', { br: <br /> })}
                            </h3>
                            <p>{t('features.places.description')}</p>
                        </section>
                    </div>

                    <div className="grid-row-2 sm:grid-rows-none sm:grid-cols-2 sm:gap-x-16 grid items-center gap-y-8">
                        <Image src="/images/pic-2.svg" width={448} height={448} className="m-auto block" alt="" />
                        <section className="sm:text-right sm:-order-1">
                            <h3 className="sm:mb-8 text-h5-m sm:text-h5 mb-4">
                                {t('features.random.title', { br: <br /> })}
                            </h3>
                            <p>{t('features.random.description')}</p>
                        </section>
                    </div>

                    <div className="grid-row-2 sm:grid-rows-none sm:grid-cols-2 sm:gap-x-16 grid items-center gap-y-8">
                        <Image src="/images/pic-3.svg" width={448} height={448} className="m-auto block" alt="" />
                        <section>
                            <h3 className="sm:mb-8 text-h5-m sm:text-h5 mb-4">
                                {t('features.lists.title', { br: <br /> })}
                            </h3>
                            <p>{t('features.lists.description')}</p>
                        </section>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-h3-m sm:text-h3 mb-4 text-center">{t('map.title')}</h2>
                <p className="sm:w-2/3 text-black-70 text-big m-auto mb-16 w-full text-center">
                    {t('map.description')}
                </p>

                <div className="relative">
                    <Image src="/images/map.svg" width={1120} height={400} alt="" />
                    <Link
                        href="/map"
                        className="hover-animated hover:bg-orange-active absolute left-1/2 top-1/2 flex h-10 -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap rounded-lg bg-orange-100   px-6 text-white hover:text-white"
                    >
                        {t('map.cta')}
                    </Link>
                </div>
            </section>
        </div>
    )
}
