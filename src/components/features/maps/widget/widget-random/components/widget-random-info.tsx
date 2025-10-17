'use client'

import { useTranslations } from 'next-intl'

import { WidgetTogler } from '@/components/features/maps/widget/components/widget-togler'

export const WidgetRandomInfo = () => {
    const t = useTranslations()

    return (
        <div className="flex gap-x-4">
            <div className="flex-1 text-black-70">{t('map.widget.random.info')}</div>
            <WidgetTogler />
        </div>
    )
}
