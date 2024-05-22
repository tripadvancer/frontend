'use client'

import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetTogler } from '../widget-togler'

export const WidgetRandomInfo = () => {
    const t = useI18n()

    return (
        <div className="flex gap-x-4">
            <div className="flex-1 text-black-70">{t('widget.random.info')}</div>
            <WidgetTogler />
        </div>
    )
}
