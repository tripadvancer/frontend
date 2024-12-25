'use client'

import { ChangeEvent, Ref, forwardRef } from 'react'

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

const SearchInputComponent = (props: SearchInputProps, ref: Ref<HTMLInputElement>) => {
    const t = useTranslations()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value)
    }

    return (
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
                {props.isLoading ? <Spinner size={16} /> : <SearchIcon size={16} absoluteStrokeWidth />}
            </div>

            <input
                ref={ref}
                type="text"
                name="search"
                value={props.value}
                autoComplete="off"
                className="hover-animated h-10 w-full rounded-lg border border-black-15 bg-white px-10 placeholder:text-black-40 focus:border-black-40 focus:outline-none disabled:cursor-no-drop"
                placeholder={t('component.search.placeholder')}
                onClick={props.onClick}
                onChange={handleChange}
            />

            {props.value.length > 0 && (
                <div
                    className="hover-animated absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-black-15 hover:text-blue-active"
                    onClick={props.onClear}
                >
                    <XIcon size={16} absoluteStrokeWidth />
                </div>
            )}
        </div>
    )
}

export const SearchInput = forwardRef(SearchInputComponent)
