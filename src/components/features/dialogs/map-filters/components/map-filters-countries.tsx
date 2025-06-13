'use client'

import { FormInput } from '@/components/ui/form-input'

export const MapFiltersCountries = () => {
    return (
        <div className="space-y-2">
            <label htmlFor="text" className="font-medium">
                Countries
            </label>
            <FormInput
                type="text"
                name="countries"
                value=""
                autoComplete="off"
                placeholder="Search countries"
                onChange={() => {}}
            />
        </div>
    )
}
