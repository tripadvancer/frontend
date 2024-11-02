'use client'

import { ChangeEvent } from 'react'

import { useTranslations } from 'next-intl'

import { CloseIcon16, SearchIcon16 } from '@/components/ui/icons'
import { Spinner } from '@/components/ui/spinner'

type WidgetSearchInputProps = {
    value: string
    isLoading: boolean
    onChange: (value: string) => void
    onClick: () => void
    onClear: () => void
}

export const WidgetSearchInput = (props: WidgetSearchInputProps) => {
    const t = useTranslations()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value)
    }

    return (
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transform text-blue-100">
                {props.isLoading ? <Spinner size={16} /> : <SearchIcon16 />}
            </div>

            <input
                type="text"
                name="search"
                value={props.value}
                autoComplete="off"
                className="hover-animated h-10 w-full rounded-lg border border-blue-20 bg-white px-10 placeholder:text-black-40 hover:border-blue-100 focus:border-blue-100 focus:outline-none"
                placeholder={t('map.widget.search.placeholder')}
                onChange={handleChange}
                onClick={props.onClick}
            />

            {props.value.length > 0 && (
                <div
                    className="hover-animated absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-black-15 hover:text-blue-active"
                    onClick={props.onClear}
                >
                    <CloseIcon16 />
                </div>
            )}
        </div>
    )
}
