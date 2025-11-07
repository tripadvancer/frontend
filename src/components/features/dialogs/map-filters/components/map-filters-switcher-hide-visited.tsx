'use client'

import { useTranslations } from 'next-intl'

import { FormSwitcher } from '@/components/ui/form-switcher'

type MapFiltersSwitcherNearbyOnlyProps = {
    checked: boolean
    onChange: () => void
}

export const MapFiltersSwitcherHideVisited = ({ checked, onChange }: MapFiltersSwitcherNearbyOnlyProps) => {
    const t = useTranslations()

    return (
        <div className="flex items-center justify-between gap-x-2">
            <div className="cursor-pointer" onClick={onChange}>
                {t('dialog.mapFilter.switcherHideVisited.label')}
            </div>
            <FormSwitcher checked={checked} onChange={onChange} />
        </div>
    )
}
