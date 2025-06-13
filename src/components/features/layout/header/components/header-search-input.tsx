'use client'

import { ChangeEvent, Ref } from 'react'

import classNames from 'classnames'
import { SearchIcon, XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Spinner } from '@/components/ui/spinner'

type HeaderSearchInputProps = {
    value: string
    className?: string
    isLoading: boolean
    onChange: (value: string) => void
    onClick: () => void
    onClear: () => void
}

export const HeaderSearchInput = (props: HeaderSearchInputProps) => {
    const t = useTranslations()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value)
    }

    return (
        <div className={classNames('relative z-10 w-full', props.className)}>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transform text-blue-100">
                {props.isLoading ? <Spinner size={16} /> : <SearchIcon size={16} absoluteStrokeWidth />}
            </div>

            <input
                type="text"
                name="search"
                value={props.value}
                autoComplete="off"
                className="hover-animated h-10 w-full rounded-lg border border-blue-20 bg-white px-10 placeholder:text-black-40 hover:border-blue-100 focus:border-blue-100 focus:outline-none"
                placeholder="Search"
                onChange={handleChange}
                onClick={props.onClick}
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
