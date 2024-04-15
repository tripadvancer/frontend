'use client'

import { CloseIcon16, SearchIcon16 } from '@/components/ui/icons'
import { Spinner } from '@/components/ui/spinner'
import { useI18n } from '@/utils/i18n/i18n.client'

type WidgetPickerSearchInputProps = {
    value: string
    isLoading: boolean
    onChange: (value: string) => void
    onClick: () => void
    onClear: () => void
}

export const WidgetPickerSearchInput = (props: WidgetPickerSearchInputProps) => {
    const t = useI18n()

    return (
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transform text-blue-100">
                {props.isLoading ? <Spinner size={16} /> : <SearchIcon16 />}
            </div>

            <input
                type="text"
                value={props.value}
                autoFocus
                autoComplete="off"
                className="hover-animated h-10 w-full rounded-lg border border-black-15 bg-white px-10 placeholder:text-black-40 focus:border-black-40 focus:outline-none disabled:cursor-no-drop"
                placeholder={t('location_picker.placeholder')}
                onClick={props.onClick}
                onChange={event => props.onChange(event.target.value)}
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
