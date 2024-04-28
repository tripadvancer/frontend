'use client'

import { FormButton } from '@/components/ui/form-button'
import { MapIcon16, PinIcon16 } from '@/components/ui/icons'
import { getWidgetState, toggleWidget } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

export const WidgetToggler = () => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    return (
        <FormButton
            className="!fixed bottom-2 left-1/2 z-40 -translate-x-1/2 transform sm:hidden"
            shape="rounded"
            icon={widgetState.widgetIsExpanded ? <MapIcon16 /> : <PinIcon16 />}
            onClick={() => dispatch(toggleWidget())}
        >
            {widgetState.widgetIsExpanded ? t('widget.toggler.map') : t('widget.toggler.search_and_filters')}
        </FormButton>
    )
}
