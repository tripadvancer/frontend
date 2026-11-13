'use client'

import { ChangeEvent } from 'react'

import { SearchIcon, XIcon } from 'lucide-react'

import { Spinner } from '@/components/ui/spinner'

type WidgetSearchInputProps = {
    value: string
    isLoading: boolean
    onChange: (value: string) => void
    onClick: () => void
    onClear: () => void
}

export const WidgetSearchInput = (props: WidgetSearchInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value)
    }

    return (
        <div className="relative">
            <div className="absolute top-1/2 left-4 -translate-y-1/2 transform text-blue-100">
                {props.isLoading ? <Spinner size={16} /> : <SearchIcon size={16} absoluteStrokeWidth />}
            </div>

            <input
                type="text"
                name="search"
                value={props.value}
                autoComplete="off"
                className="hover-animated border-blue-20 placeholder:text-black-40 h-10 w-full rounded-lg border bg-white px-10 hover:border-blue-100 focus:border-blue-100 focus:outline-none"
                placeholder="Find a country, place or address"
                onChange={handleChange}
                onClick={props.onClick}
            />

            {props.value.length > 0 && (
                <div
                    className="hover-animated text-black-15 hover:text-blue-active absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer"
                    onClick={props.onClear}
                >
                    <XIcon size={16} absoluteStrokeWidth />
                </div>
            )}
        </div>
    )
}
