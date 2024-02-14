'use client'

import ScrollContainer from 'react-indiana-drag-scroll'

import { IUserInfo } from '@/utils/types/user'

import { WidgetCategories } from './components/widget-categories'
import { WidgetHeader } from './components/widget-header'
import { WidgetHeaderAbout } from './components/widget-header-about'
import { WidgetHeaderUserMenu } from './components/widget-header-user-menu'
import { WidgetPlaces } from './components/widget-places'

type WidgetProps = {
    userInfo: IUserInfo | null
}

export const Widget = ({ userInfo }: WidgetProps) => {
    return (
        <ScrollContainer className="fixed right-0 top-0 z-40 max-h-screen w-full cursor-auto sm:w-[512px] sm:p-8">
            <div role="widget" className="rounded-b-2xl bg-white shadow-small sm:rounded-2xl">
                <WidgetHeader userInfo={userInfo} />
                <WidgetHeaderAbout />
                {userInfo && <WidgetHeaderUserMenu {...userInfo} />}
                <WidgetCategories />
                <WidgetPlaces />
            </div>
        </ScrollContainer>
    )
}
