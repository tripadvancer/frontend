'use client'

import { FormInput } from '@/components/ui/form-input'

type MapFiltersCountriesProps = {
    value: string
    onChange: (value: string) => void
}

export const MapFiltersCountries = ({ value, onChange }: MapFiltersCountriesProps) => {
    return (
        <div className="space-y-2">
            <label htmlFor="text" className="font-medium">
                Countries
            </label>
            <FormInput
                type="text"
                name="countries"
                value={value}
                autoComplete="off"
                placeholder="Search countries"
                onChange={e => onChange(e.target.value.trim())}
            />
        </div>
    )
}
