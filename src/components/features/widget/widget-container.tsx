'use client'

import { ReactNode } from 'react'

import classNames from 'classnames'

import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'

import { WidgetToggler } from './components/widget-toggler'

export const WidgetContainer = ({ children }: { children: ReactNode }) => {
    const widgetState = useAppSelector(getWidgetState)

    return (
        <div
            className={classNames(
                'scrollbar-hide fixed right-0 top-0 z-40 w-full overflow-y-auto sm:h-auto sm:max-h-full sm:w-[496px] sm:pb-8 sm:pl-8 sm:pr-4 sm:pt-4',
                {
                    'h-full pb-0': widgetState.widgetIsExpanded,
                    'h-auto pb-8': !widgetState.widgetIsExpanded,
                },
            )}
        >
            <div
                className={classNames('bg-white shadow-large sm:rounded-2xl', {
                    'min-h-full sm:min-h-0': widgetState.widgetIsExpanded,
                })}
            >
                {children}
            </div>
            <WidgetToggler />
        </div>
    )
}
