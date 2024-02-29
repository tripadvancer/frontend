'use client'

import { useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'

import { getUserLocation } from '@/redux/features/user-slice'
import { useAppSelector } from '@/redux/hooks'
import { placesAroundAPI } from '@/redux/services/places-around-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetCategories } from './components/widget-categories'
import { WidgetFlipToggler } from './components/widget-flip-toggler'
import { WidgetHeader } from './components/widget-header'
import { WidgetRandomButton } from './components/widget-random-button'
import { WidgetRandomResults } from './components/widget-random-results'
import { WidgetRandomSlider } from './components/widget-random-slider'
import { WidgetSection } from './components/widget-section'

type WidgetRandomProps = {
    onFlip: () => void
}

export const WidgetRandom = ({ onFlip }: WidgetRandomProps) => {
    const t = useI18n()
    const userLocation = useAppSelector(getUserLocation)
    const [radius, setRadius] = useState<number>(50)
    const [selectedCategories, setSelectedCategories] = useState<number[]>([])
    const [searchRandomPlace, { data, error, isFetching, isSuccess }] = placesAroundAPI.useLazyGetRandomPlaceQuery()

    const handleRandomClick = () => {
        if (userLocation) {
            searchRandomPlace({
                lat: userLocation.lat,
                lng: userLocation.lng,
                radius: radius * 1000, // km to m
                categories: selectedCategories,
            })
        }
    }

    return (
        <ScrollContainer className="max-h-screen w-full sm:p-8">
            <div className="shadow-large rounded-b-2xl bg-white sm:rounded-2xl">
                <WidgetHeader />

                <div className="relative flex flex-col gap-y-8 rounded-2xl bg-orange-10 p-4 sm:p-8">
                    <WidgetFlipToggler variant="blue" onClick={onFlip} />
                    <p className="mr-12 text-black-70 sm:mr-8">{t('widget.random.intro')}</p>
                    <WidgetCategories
                        variant="orange"
                        selectedCategories={selectedCategories}
                        onChange={setSelectedCategories}
                    />
                </div>

                <div className="p-4 sm:p-8">
                    <WidgetSection title={t('widget.random.title')} variant="orange">
                        <div className="flex flex-1 flex-col gap-y-4 sm:gap-y-8">
                            <WidgetRandomSlider value={radius} onChange={setRadius} />
                            <WidgetRandomButton
                                isLoading={isFetching}
                                isUserLocated={!!userLocation}
                                onClick={handleRandomClick}
                            />
                            <WidgetRandomResults
                                place={data}
                                isSuccess={isSuccess}
                                isError={!!error}
                                isUserLocated={!!userLocation}
                            />
                        </div>
                    </WidgetSection>
                </div>
            </div>
        </ScrollContainer>
    )
}
