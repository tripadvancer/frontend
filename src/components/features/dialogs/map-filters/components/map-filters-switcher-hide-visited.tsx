'use client'

import { FormSwitcher } from '@/components/ui/form-switcher'

type MapFiltersSwitcherHideVisitedProps = {
    checked: boolean
    onChange: () => void
}

export const MapFiltersSwitcherHideVisited = ({ checked, onChange }: MapFiltersSwitcherHideVisitedProps) => {
    return (
        <div className="flex items-center justify-between gap-x-2">
            <div className="cursor-pointer" onClick={onChange}>
                Hide visited places
            </div>
            <FormSwitcher checked={checked} onChange={onChange} />
        </div>
    )
}
