'use client'

import ScrollContainer from 'react-indiana-drag-scroll'

import { getUserLocation } from '@/redux/features/user-slice'
import { getWidgetState, setWidgetRandomRadius, toggleWidgetRandomOpened } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { placesAroundAPI } from '@/redux/services/places-around-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetFlipToggler } from './components/widget-flip-toggler'
import { WidgetHeader } from './components/widget-header'
import { WidgetRandomButton } from './components/widget-random-button'
import { WidgetRandomCategories } from './components/widget-random-categories'
import { WidgetRandomResults } from './components/widget-random-results'
import { WidgetRandomSlider } from './components/widget-random-slider'
import { WidgetSection } from './components/widget-section'

type WidgetRandomProps = {
    onFlip: () => void
}

export const WidgetRandom = ({ onFlip }: WidgetRandomProps) => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)
    const userLocation = useAppSelector(getUserLocation)

    const [searchRandomPlace, { data, error, isFetching, isSuccess }] = placesAroundAPI.useLazyGetRandomPlaceQuery()

    const handleRandomClick = () => {
        if (userLocation) {
            searchRandomPlace({
                lat: userLocation.lat,
                lng: userLocation.lng,
                radius: widgetState.random.radius * 1000, // km to m
                categories: widgetState.random.selectedCategories,
            })
        }
    }

    return (
        <ScrollContainer className="pointer-events-auto max-h-full w-full cursor-auto sm:p-8">
            <div className="rounded-b-2xl bg-white shadow-large sm:rounded-2xl">
                <WidgetHeader />

                <div className="relative flex flex-col gap-y-8 rounded-2xl bg-orange-10 p-4 sm:p-8">
                    <WidgetFlipToggler variant="blue" onClick={onFlip} />
                    <p className="mr-12 text-black-70 sm:mr-8">{t('widget.random.intro')}</p>
                    <WidgetRandomCategories />
                </div>

                <div className="p-4 sm:p-8">
                    <WidgetSection
                        title={t('widget.random.title')}
                        variant="orange"
                        isOpened={widgetState.random.isOpened}
                        onToggle={() => dispatch(toggleWidgetRandomOpened())}
                    >
                        <div className="flex flex-1 flex-col gap-y-4 sm:gap-y-8">
                            <WidgetRandomSlider
                                value={widgetState.random.radius}
                                onChange={value => dispatch(setWidgetRandomRadius(value))}
                            />
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
