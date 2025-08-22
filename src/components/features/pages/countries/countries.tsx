import { MapIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import Image from 'next/image'

import { CountriesGrid } from '@/components/features/common/countries-grid/countries-grid'
import { LinkButton } from '@/components/ui/link-button'
import { getCountries } from '@/services/countries'
import { getSettings } from '@/services/settings'

export const Countries = async () => {
    const t = await getTranslations()
    const countries = await getCountries()
    const settings = await getSettings()

    return (
        <section className="container space-y-16 py-16">
            <div className="space-y-4 sm:w-3/4">
                <h1 className="h1 max-w-full break-words">{t('page.countries.title')}</h1>
                <p className="text-big text-black-70">
                    {t.rich('page.countries.description', {
                        placesCount: settings.placesCount,
                        countriesCount: settings.countriesCount,
                    })}
                </p>
            </div>

            <div className="space-y-4 sm:space-y-8">
                <div className="flex flex-col items-center gap-8 rounded-2xl bg-orange-10 p-8 text-center sm:flex-row sm:text-left">
                    <Image
                        src="/images/mini-map.png"
                        width={162}
                        height={56}
                        className="shrink-0"
                        alt="Tripadvancer Map"
                    />
                    <div className="flex-1">
                        <h2 className="h5">{t('page.countries.goToMapTitle')}</h2>
                        <p className="text-big text-black-70">{t('page.countries.goToMapText')}</p>
                    </div>
                    <LinkButton href="/maps" variant="orange" className="flex shrink-0 items-center gap-x-2">
                        <MapIcon />
                        {t('page.countries.goToMapButton')}
                    </LinkButton>
                </div>

                <CountriesGrid countries={countries} />
            </div>
        </section>
    )
}
