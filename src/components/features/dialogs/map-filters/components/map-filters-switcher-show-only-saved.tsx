'use client'

import { FormSwitcher } from '@/components/ui/form-switcher'

type MapFiltersSwitcherNearbyOnlyProps = {
    checked: boolean
    onChange: () => void
}

export const MapFiltersSwitcherShowOnlySaved = ({ checked, onChange }: MapFiltersSwitcherNearbyOnlyProps) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-x-2">
                <div className="cursor-pointer" onClick={onChange}>
                    Show only saved places
                </div>
                <FormSwitcher checked={checked} onChange={onChange} />
            </div>
            <div className="text-sm text-black-70">* This filter is applied only when viewing your saved places.</div>
        </div>
    )
}
