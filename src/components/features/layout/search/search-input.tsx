'use client'

import { ChangeEvent } from 'react'

import { SearchIcon, XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Spinner } from '@/components/ui/spinner'

type SearchInputProps = {
    value: string
    isLoading: boolean
    onChange: (value: string) => void
    onClick: () => void
    onClear: () => void
}

export const SearchInput = ({ value, isLoading, onChange, onClick, onClear }: SearchInputProps) => {
    const t = useTranslations()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div className="relative z-10 w-full">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 transform text-blue-100">
                {isLoading ? <Spinner size={20} /> : <SearchIcon size={20} absoluteStrokeWidth />}
            </div>

            <input
                type="text"
                name="search"
                value={value}
                autoComplete="off"
                className="hover-animated h-10 w-full rounded-lg border border-blue-20 bg-white px-9 placeholder:text-black-40 hover:border-blue-100 focus:border-blue-100 focus:outline-none"
                placeholder={t('component.search.placeholder')}
                onChange={handleChange}
                onClick={onClick}
            />

            {value.length > 0 && (
                <div
                    className="hover-animated absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-black-15 hover:text-blue-active"
                    onClick={onClear}
                >
                    <XIcon size={20} absoluteStrokeWidth />
                </div>
            )}
        </div>
    )
}
