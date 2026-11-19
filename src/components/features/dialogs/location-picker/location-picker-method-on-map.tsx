'use client'

import { useEffect, useState } from 'react'
import { ViewState } from 'react-map-gl/maplibre'

import { useDialog } from '@/components/providers/dialog-provider'
import { useAppSettings } from '@/components/providers/settings-provider'
import { FormButton } from '@/components/ui/form-button'
import { GlobalLoading } from '@/components/ui/global-loading'
import { stringToViewState, viewStateToString } from '@/utils/helpers/maps'

import { LocationPickerMap } from './location-picker-map'

type LocationPickerMethodOnMapProps = {
    initialValue: string
    onChangeMethod: () => void
    onConfirm: (value: string) => void
}

export const LocationPickerMethodOnMap = ({
    initialValue,
    onChangeMethod,
    onConfirm,
}: LocationPickerMethodOnMapProps) => {
    const settings = useAppSettings()
    const dialog = useDialog()

    const [viewState, setViewstate] = useState<Partial<ViewState>>({})

    useEffect(() => {
        if (settings) {
            setViewstate(
                initialValue
                    ? stringToViewState(initialValue, settings.map.flyToZoom)
                    : {
                          longitude: settings.map.center.longitude,
                          latitude: settings.map.center.latitude,
                          zoom: settings.map.zoom,
                          pitch: 0,
                          bearing: 0,
                      },
            )
        }
    }, [initialValue, settings])

    const handleCangeViewState = (viewState: Partial<ViewState>) => {
        setViewstate(viewState)
    }

    const handleConfirm = () => {
        onConfirm(viewStateToString(viewState))
        dialog.close()
    }

    if (!settings) {
        return <GlobalLoading />
    }

    return (
        <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
                <div className="bg-black-15 relative aspect-square w-full overflow-hidden rounded-lg">
                    <LocationPickerMap viewState={viewState} onChangeViewState={handleCangeViewState} />
                </div>
                <div className="cursor-pointer text-center text-blue-100" onClick={onChangeMethod}>
                    Enter coordinates manually
                </div>
            </div>
            <FormButton onClick={handleConfirm}>Confirm</FormButton>
        </div>
    )
}
