'use client'

import { FormInput } from '@/components/ui/form-input'

type MapFiltersUsersProps = {
    value: string
    onChange: (value: string) => void
}

export const MapFiltersUsers = ({ value, onChange }: MapFiltersUsersProps) => {
    return (
        <div className="space-y-2">
            <label htmlFor="text" className="font-medium">
                Users
            </label>
            <FormInput
                type="text"
                name="users"
                value={value}
                autoComplete="off"
                placeholder="Search users"
                onChange={e => onChange(e.target.value.trim())}
            />
        </div>
    )
}
