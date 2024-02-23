'use client'

import ScrollContainer from 'react-indiana-drag-scroll'

import type { IUserInfo } from '@/utils/types/user'

import { WidgetCategories } from './components/widget-categories'
import { WidgetFlipToggler } from './components/widget-flip-toggler'
import { WidgetHeader } from './components/widget-header'
import { WidgetSearch } from './components/widget-search'

type WidgetRandomProps = {
    onFlip: () => void
}

export const WidgetRandom = ({ onFlip }: WidgetRandomProps) => {
    return (
        <ScrollContainer className="max-h-screen w-full sm:p-8">
            <div className="rounded-b-2xl bg-white shadow-small sm:rounded-2xl">
                <WidgetHeader />

                <div className="relative flex flex-col gap-y-8 rounded-2xl bg-orange-10 p-4 sm:p-8">
                    <WidgetFlipToggler variant="blue" onClick={onFlip} />
                    <WidgetSearch />
                    <WidgetCategories variant="orange" />
                </div>
            </div>
        </ScrollContainer>
    )
}
