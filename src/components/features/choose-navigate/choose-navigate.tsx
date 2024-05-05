'use client'

import type { LngLat } from '@/utils/types/geo'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ChooseNavigateItem } from './choose-navigate-item'

export const ChooseNavigate = ({ lngLat }: { lngLat: LngLat }) => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">{t('choose_navigation_app.title')}</h1>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <ChooseNavigateItem provider="google" lngLat={lngLat} />
                <ChooseNavigateItem provider="waze" lngLat={lngLat} />
                <ChooseNavigateItem provider="apple" lngLat={lngLat} />
                <ChooseNavigateItem provider="yandex" lngLat={lngLat} />
            </div>
            <FormButton type="stroke" onClick={() => dialog.close()}>
                {t('common.action.cancel')}
            </FormButton>
        </div>
    )
}
