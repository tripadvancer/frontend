'use client'

import { ChangeEvent } from 'react'

import { useTranslations } from 'next-intl'

import { CloseIcon16, SearchIcon16 } from '@/components/ui/icons'
import { Spinner } from '@/components/ui/spinner'

type LocationPickerMapSearchInputProps = {
    value: string
    isLoading: boolean
    onHide: () => void
    onChange: (value: string) => void
    onClick: () => void
    onClear: () => void
}

export const LocationPickerMapSearchInput = (props: LocationPickerMapSearchInputProps) => {
    const t = useTranslations()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value)
    }

    return (
        <div className="flex h-10 items-center sm:h-8">
            <div
                className="flex-center size-10 shrink-0 cursor-pointer text-blue-active sm:size-8"
                onClick={props.isLoading ? undefined : props.onHide}
            >
                {props.isLoading ? <Spinner size={16} /> : <SearchIcon16 />}
            </div>

            <div className="h-full w-full shrink">
                <input
                    type="text"
                    name="search"
                    value={props.value}
                    autoComplete="off"
                    autoFocus
                    className="h-full w-full bg-transparent focus:outline-none"
                    placeholder={t('dialog.locationPicker.placeholder')}
                    onClick={props.onClick}
                    onChange={handleChange}
                />
            </div>

            {props.value && (
                <div
                    className="flex-center hover-animated size-10 shrink-0 cursor-pointer text-black-15 hover:text-blue-active sm:size-8"
                    onClick={props.onClear}
                >
                    <CloseIcon16 />
                </div>
            )}
        </div>
    )
}
