'use client'

import type { LngLat } from '@/utils/types/geo'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ChoiceNavigator } from '../features/choice-navigator/choice-navigator'

export const RouteButton = (lngLat: LngLat) => {
    const t = useI18n()
    const dialog = useDialog()

    const handleClick = () => {
        dialog.open(<ChoiceNavigator {...lngLat} />)
    }

    return (
        <FormButton type="stroke" size="small" onClick={handleClick}>
            {t('common.action.route')}
        </FormButton>
    )
}
