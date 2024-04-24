import { WidgetHeaderAbout } from './widget-header-about'
import { WidgetHeaderAboutToggler } from './widget-header-about-toggler'
import { WidgetHeaderLogo } from './widget-header-logo'
import { WidgetHeaderUser } from './widget-header-user'
import { WidgetHeaderUserMenuWithAuth } from './widget-header-user-menu-with-auth'

export const WidgetHeader = () => {
    return (
        <div role="widget-header">
            <div className="flex items-center justify-between p-4 sm:p-8">
                <div className="flex gap-x-4">
                    <WidgetHeaderAboutToggler />
                    <WidgetHeaderLogo />
                </div>
                <WidgetHeaderUser />
            </div>
            <WidgetHeaderAbout />
            <WidgetHeaderUserMenuWithAuth />
        </div>
    )
}
