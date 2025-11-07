'use client'

import { useTranslations } from 'next-intl'

import { FormSwitcher } from '@/components/ui/form-switcher'

type MapFiltersSwitcherNearbyOnlyProps = {
    checked: boolean
    onChange: () => void
}

export const MapFiltersSwitcherShowOnlySaved = ({ checked, onChange }: MapFiltersSwitcherNearbyOnlyProps) => {
    const t = useTranslations()

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-x-2">
                <div className="cursor-pointer" onClick={onChange}>
                    {t('dialog.mapFilter.switcherShowOnlySaved.label')}
                </div>
                <FormSwitcher checked={checked} onChange={onChange} />
            </div>
            <div className="text-sm text-black-70">{t('dialog.mapFilter.switcherShowOnlySaved.description')}</div>
        </div>
    )
}
