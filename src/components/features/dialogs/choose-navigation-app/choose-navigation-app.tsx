'use client'

import { useDialog } from '@/components/providers/dialog-provider'
import { FormButton } from '@/components/ui/form-button'
import { LngLat } from '@/utils/types/geo'

import { ChooseNavigationAppItem } from './choose-navigation-app-item'

export const ChooseNavigationApp = ({ lngLat }: { lngLat: LngLat }) => {
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">{'Choose navigation app'}</h1>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <ChooseNavigationAppItem provider="google" lngLat={lngLat} />
                <ChooseNavigationAppItem provider="waze" lngLat={lngLat} />
                <ChooseNavigationAppItem provider="apple" lngLat={lngLat} />
                <ChooseNavigationAppItem provider="yandex" lngLat={lngLat} />
            </div>
            <FormButton type="stroke" onClick={() => dialog.close()}>
                {'Cancel'}
            </FormButton>
        </div>
    )
}
