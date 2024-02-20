'use client'

import type { IUserInfo } from '@/utils/types/user'

import { WidgetHeaderAbout } from './widget-header-about'
import { WidgetHeaderAboutToggler } from './widget-header-about-toggler'
import { WidgetHeaderLogo } from './widget-header-logo'
import { WidgetHeaderUser } from './widget-header-user'
import { WidgetHeaderUserMenu } from './widget-header-user-menu'

type WidgetHeaderProps = {
    userInfo: IUserInfo | null
}

export const WidgetHeader = ({ userInfo }: WidgetHeaderProps) => {
    return (
        <div role="widget-header">
            <div className="flex items-center justify-between p-4 sm:p-8">
                <div className="flex gap-x-4">
                    <WidgetHeaderAboutToggler />
                    <WidgetHeaderLogo />
                </div>
                <WidgetHeaderUser userInfo={userInfo} />
            </div>
            <WidgetHeaderAbout />
            <WidgetHeaderUserMenu userInfo={userInfo} />
        </div>
    )
}
