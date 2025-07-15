'use client'

import { FormSwitcher } from '@/components/ui/form-switcher'

type MapFiltersSwitcherNearbyOnlyProps = {
    checked: boolean
    onChange: () => void
}

export const MapFiltersSwitcherNearbyOnly = ({ checked, onChange }: MapFiltersSwitcherNearbyOnlyProps) => {
    return (
        <div className="flex items-center justify-between gap-x-2">
            <div className="cursor-pointer" onClick={onChange}>
                Show only places near me
            </div>

            <FormSwitcher checked={checked} onChange={onChange} />
        </div>
    )
}
