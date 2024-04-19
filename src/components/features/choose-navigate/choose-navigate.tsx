'use client'

import type { LngLat } from '@/utils/types/geo'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { navigateToLocation } from '@/utils/helpers/common'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ChooseNavigateItem } from './choose-navigate-item'

export const ChooseNavigate = ({ lngLat }: { lngLat: LngLat }) => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">{t('place.choose_navigation_app')}</h1>
            <div className="flex flex-wrap justify-between gap-2">
                <ChooseNavigateItem caption="Google" onClick={() => navigateToLocation(lngLat, 'google')} />
                <ChooseNavigateItem caption="Waze" onClick={() => dialog.close()} />
                <ChooseNavigateItem caption="Apple" onClick={() => dialog.close()} />
                <ChooseNavigateItem caption="Yandex" onClick={() => dialog.close()} />
            </div>
            <FormButton type="stroke" onClick={() => dialog.close()}>
                {t('common.action.cancel')}
            </FormButton>
        </div>
    )
}
