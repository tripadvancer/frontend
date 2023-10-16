import Image from 'next/image'
import Link from 'next/link'

import { CountryFeed } from '@/components/Country/CountryFeed'
import { getCountries } from '@/services/countries'
import { getScopedI18n } from '@/utils/i18n.server'

export default async function Home() {
    const t = await getScopedI18n('pages.home')
    const countries = await getCountries()

    return (
        <div className="container py-24">
            <section className="mb-24">
                <h1 className="mb-4 text-center text-5xl font-medium phone:text-4xl">{t('countries.title')}</h1>
                <p className="m-auto mb-16 w-2/3 text-center text-base text-custom-black-70 phone:w-full">
                    {t('countries.description')}
                </p>
                <CountryFeed countries={countries} />
            </section>

            <section className="mb-24">
                <h2 className="mb-4 text-center text-4xl font-medium phone:text-2xl">{t('features.title')}</h2>
                <p className="m-auto mb-16 w-2/3 text-center text-base text-custom-black-70 phone:w-full">
                    {t('features.description')}
                </p>

                <div className="inner-container flex flex-col gap-y-8 phone:gap-y-16">
                    <div className="phone:grid-row-2 grid grid-cols-2 items-center gap-x-16 phone:grid-cols-none phone:gap-y-8">
                        <Image src="/images/pic-1.svg" width={448} height={448} className="block phone:m-auto" alt="" />
                        <section>
                            <h3 className="mb-8 text-2xl font-medium phone:mb-4 phone:text-xl">
                                {t('features.places.title', { br: <br /> })}
                            </h3>
                            <p className="text-sm">{t('features.places.description')}</p>
                        </section>
                    </div>

                    <div className="phone:grid-row-2 grid grid-cols-2 items-center gap-x-16 phone:grid-cols-none phone:gap-y-8">
                        <section className="text-right phone:text-left">
                            <h3 className="mb-8 text-2xl font-medium phone:mb-4 phone:text-xl">
                                {t('features.random.title', { br: <br /> })}
                            </h3>
                            <p className="text-sm">{t('features.random.description')}</p>
                        </section>
                        <Image
                            src="/images/pic-2.svg"
                            width={448}
                            height={448}
                            className="block phone:-order-1 phone:m-auto"
                            alt=""
                        />
                    </div>

                    <div className="phone:grid-row-2 grid grid-cols-2 items-center gap-x-16 phone:grid-cols-none phone:gap-y-8">
                        <Image src="/images/pic-3.svg" width={448} height={448} className="block phone:m-auto" alt="" />
                        <section>
                            <h3 className="mb-8 text-2xl font-medium phone:mb-4 phone:text-xl">
                                {t('features.lists.title', { br: <br /> })}
                            </h3>
                            <p className="text-sm">{t('features.lists.description')}</p>
                        </section>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="mb-4 text-center text-4xl font-medium phone:text-3xl">{t('map.title')}</h2>
                <p className="m-auto mb-16 w-2/3 text-center text-base text-custom-black-70 phone:w-full">
                    {t('map.description')}
                </p>

                <div className="relative">
                    <Image src="/images/map.svg" width={1120} height={400} alt="" />
                    <Link
                        href="/map"
                        className="hover-animated absolute left-1/2 top-1/2 flex h-10 -translate-x-1/2 -translate-y-1/2 transform items-center whitespace-nowrap rounded-lg bg-custom-orange-100 px-6 text-sm font-medium text-white hover:bg-custom-orange-active hover:text-white"
                    >
                        {t('map.cta')}
                    </Link>
                </div>
            </section>
        </div>
    )
}
