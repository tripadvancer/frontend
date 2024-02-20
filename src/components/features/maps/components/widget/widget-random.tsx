import ScrollContainer from 'react-indiana-drag-scroll'

import type { IUserInfo } from '@/utils/types/user'

import { WidgetCategories } from './components/widget-categories'
import { WidgetFlipToggler } from './components/widget-flip-toggler'
import { WidgetHeader } from './components/widget-header'
import { WidgetSearch } from './components/widget-search'

type WidgetRandomProps = {
    userInfo: IUserInfo | null
    onFlip: () => void
}

export const WidgetRandom = ({ userInfo, onFlip }: WidgetRandomProps) => {
    return (
        <ScrollContainer className="max-h-screen w-full sm:p-8">
            <div className="rounded-b-2xl bg-white shadow-small sm:rounded-2xl">
                <WidgetHeader userInfo={userInfo} />
                <div className="relative flex flex-col gap-y-8 rounded-2xl bg-orange-10 p-4 sm:p-8">
                    <WidgetFlipToggler variant="places" onClick={onFlip} />
                    <WidgetSearch />
                    <WidgetCategories />
                </div>
            </div>
        </ScrollContainer>
    )
}
