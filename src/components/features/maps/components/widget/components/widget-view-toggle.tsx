'use client'

import { FormButton } from '@/components/ui/form-button'
import { getWidgetPlacesVisibility, toggleWidgetPlacesVisibility } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const WidgetViewToggle = () => {
    const dispatch = useAppDispatch()
    const isPlacesVisible = useAppSelector(getWidgetPlacesVisibility)

    return (
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 transform sm:hidden">
            <FormButton size="small" shape="rounded" onClick={() => dispatch(toggleWidgetPlacesVisibility())}>
                {isPlacesVisible ? (
                    <>
                        {/* prettier-ignore */}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M1 12.6539L6.10794 15L11.0769 12.0567L15 13.4028V2.40695L10.9231 1L5.89206 3.97837L1 1.70352V12.6539ZM9 10.951L7 12.2143V5.6324L9 4.36908V10.951ZM11 9.89331L13 10.4776V3.74775L11 3.23741V9.89331ZM3 11.2265L5 12.2143V5.77146L3 4.99756V11.2265Z" />
                        </svg>
                        Map
                    </>
                ) : (
                    <>
                        {/* prettier-ignore */}
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 6C6.5 4.89543 7.39543 4 8.5 4C9.60457 4 10.5 4.89543 10.5 6C10.5 7.10457 9.60457 8 8.5 8C7.39543 8 6.5 7.10457 6.5 6Z" />
                            <path fillRule="evenodd" d="M8.5 15.9995L7.46927 15.0809C4.17789 12.1477 2.5 8.54211 2.5 6.10311C2.5 2.64043 5.15737 0 8.5 0C11.8426 0 14.5 2.64043 14.5 6.10311C14.5 8.54211 12.8221 12.1477 9.53073 15.0809L8.5 15.9995ZM12.5 6.10311C12.5 3.74787 10.7409 2 8.5 2C6.25908 2 4.5 3.74787 4.5 6.10311C4.5 7.77275 5.798 10.8469 8.5 13.3171C11.202 10.8469 12.5 7.77275 12.5 6.10311Z" />
                        </svg>
                        Places
                    </>
                )}
            </FormButton>
        </div>
    )
}
