'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { LocationPickerMethodManually } from './location-picker-method-manually'
import { LocationPickerMethodOnMap } from './location-picker-method-on-map'

type LocationPickerProps = {
    location: string
    onConfirm: (value: string) => void
}

export const LocationPicker = ({ location, onConfirm }: LocationPickerProps) => {
    const t = useTranslations()
    const [inputMethod, setInputMethod] = useState<'manual' | 'map'>('manual')

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">{t('dialog.locationPicker.title')}</h1>

            {inputMethod === 'manual' && (
                <LocationPickerMethodManually
                    initialValue={location}
                    onChangeMethod={() => setInputMethod('map')}
                    onConfirm={onConfirm}
                />
            )}
            {inputMethod === 'map' && (
                <LocationPickerMethodOnMap
                    initialValue={location}
                    onChangeMethod={() => setInputMethod('manual')}
                    onConfirm={onConfirm}
                />
            )}
        </div>
    )
}
