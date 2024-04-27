'use client'

import { Ref, forwardRef } from 'react'

import { CloseIcon16, SearchIcon16 } from '@/components/ui/icons'
import { Spinner } from '@/components/ui/spinner'
import { useI18n } from '@/utils/i18n/i18n.client'

type WidgetSearchInputProps = {
    value: string
    isLoading: boolean
    onChange: (value: string) => void
    onClick: () => void
    onClear: () => void
}

const WidgetSearchInputComponent = (props: WidgetSearchInputProps, ref: Ref<HTMLInputElement>) => {
    const t = useI18n()

    return (
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transform text-blue-100">
                {props.isLoading ? <Spinner size={16} /> : <SearchIcon16 />}
            </div>

            <input
                ref={ref}
                type="text"
                value={props.value}
                autoComplete="off"
                autoFocus
                className="hover-animated h-10 w-full rounded-lg border border-blue-20 bg-white px-10 placeholder:text-black-40 hover:border-blue-100 focus:border-blue-100 focus:outline-none"
                placeholder={t('widget.search.placeholder')}
                onChange={e => props.onChange(e.target.value)}
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

export const WidgetSearchInput = forwardRef(WidgetSearchInputComponent)
