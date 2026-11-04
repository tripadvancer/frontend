'use client'

import { useMemo, useState } from 'react'

import { useLocale, useTranslations } from 'next-intl'

import { FormCheckbox } from '@/components/ui/form-checkbox'
import { FormInput } from '@/components/ui/form-input'
import { countriesDictionary } from '@/utils/dictionaries/countries'

type FeedCountryFilterProps = {
    selectedCountryCodes: string[]
    onChange: (countryCodes: string[]) => void
}

export const FeedCountryFilter = ({ selectedCountryCodes, onChange }: FeedCountryFilterProps) => {
    const t = useTranslations()
    const locale = useLocale()
    const [searchQuery, setSearchQuery] = useState('')

    const countries = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLocaleLowerCase(locale)

        return countriesDictionary
            .map(country => ({
                code: country.code,
                name: country.name[locale] ?? country.name.en,
            }))
            .filter(country => country.name.toLocaleLowerCase(locale).includes(normalizedQuery))
            .sort((firstCountry, secondCountry) => firstCountry.name.localeCompare(secondCountry.name, locale))
    }, [locale, searchQuery])

    const handleCountryChange = (countryCode: string, isSelected: boolean) => {
        const updatedCountryCodes = isSelected
            ? [...selectedCountryCodes, countryCode]
            : selectedCountryCodes.filter(selectedCountryCode => selectedCountryCode !== countryCode)

        onChange(updatedCountryCodes)
    }

    return (
        <section className="flex flex-col gap-y-4 rounded-xl border border-black-15 p-4">
            <div className="flex items-center justify-between gap-x-2">
                <h2 className="h6">{t('page.feed.filters.title')}</h2>
                {selectedCountryCodes.length > 0 && (
                    <button className="link flex-none text-small" onClick={() => onChange([])}>
                        {t('page.feed.filters.clear')}
                    </button>
                )}
            </div>

            <FormInput
                type="search"
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder={t('page.feed.filters.searchPlaceholder')}
                aria-label={t('page.feed.filters.searchPlaceholder')}
            />

            <div className="max-h-72 space-y-3 overflow-y-auto pr-2">
                {countries.length > 0 ? (
                    countries.map(country => (
                        <FormCheckbox
                            key={`feed-country-${country.code}`}
                            id={`feed-country-${country.code}`}
                            label={country.name}
                            checked={selectedCountryCodes.includes(country.code)}
                            onChange={event => handleCountryChange(country.code, event.target.checked)}
                        />
                    ))
                ) : (
                    <p className="text-small text-black-40">{t('page.feed.filters.empty')}</p>
                )}
            </div>

            {selectedCountryCodes.length > 0 && (
                <p className="text-small text-black-40">
                    {t('page.feed.filters.selected', { count: selectedCountryCodes.length })}
                </p>
            )}
        </section>
    )
}
