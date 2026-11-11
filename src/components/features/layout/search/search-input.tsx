'use client'

import { ChangeEvent } from 'react'

import { SearchIcon, XIcon } from 'lucide-react'

import { Spinner } from '@/components/ui/spinner'

type SearchInputProps = {
    value: string
    isLoading: boolean
    onChange: (value: string) => void
    onClick: () => void
    onClear: () => void
}

export const SearchInput = ({ value, isLoading, onChange, onClick, onClear }: SearchInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div className="relative z-10 w-full">
            <div className="absolute top-1/2 left-2 -translate-y-1/2 transform text-blue-100">
                {isLoading ? <Spinner size={20} /> : <SearchIcon size={20} absoluteStrokeWidth />}
            </div>

            <input
                type="text"
                name="search"
                value={value}
                autoComplete="off"
                className="hover-animated border-blue-20 placeholder:text-black-40 h-10 w-full rounded-lg border bg-white px-9 hover:border-blue-100 focus:border-blue-100 focus:outline-none"
                placeholder="Search"
                onChange={handleChange}
                onClick={onClick}
            />

            {value.length > 0 && (
                <div
                    className="hover-animated text-black-15 hover:text-blue-active absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer"
                    onClick={onClear}
                >
                    <XIcon size={20} absoluteStrokeWidth />
                </div>
            )}
        </div>
    )
}
