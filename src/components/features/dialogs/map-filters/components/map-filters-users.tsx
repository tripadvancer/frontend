'use client'

import { FormInput } from '@/components/ui/form-input'

export const MapFiltersUsers = () => {
    return (
        <div className="space-y-2">
            <label htmlFor="text" className="font-medium">
                Users
            </label>
            <FormInput
                type="text"
                name="users"
                value=""
                autoComplete="off"
                placeholder="Search users"
                onChange={() => {}}
            />
        </div>
    )
}
