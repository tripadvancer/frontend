import { WidgetHeaderAbout } from './widget-header-about'
import { WidgetHeaderAboutToggler } from './widget-header-about-toggler'
import { WidgetHeaderAddPlaceWithAuth } from './widget-header-add-place-with-auth'
import { WidgetHeaderLogo } from './widget-header-logo'
import { WidgetHeaderUser } from './widget-header-user'
import { WidgetHeaderUserMenuWithAuth } from './widget-header-user-menu-with-auth'

export const WidgetHeader = () => {
    return (
        <div
            role="widget-header"
            className="sticky left-0 right-0 top-0 z-50 bg-white sm:relative sm:left-auto sm:right-auto sm:top-auto sm:rounded-t-2xl"
        >
            <div className="flex items-center justify-between p-4 sm:p-8">
                <div className="flex-center gap-x-4">
                    <WidgetHeaderAboutToggler />
                    <WidgetHeaderLogo />
                </div>
                <div className="center flex-center gap-x-2">
                    <WidgetHeaderAddPlaceWithAuth />
                    <WidgetHeaderUser />
                </div>
            </div>
            <WidgetHeaderAbout />
            <WidgetHeaderUserMenuWithAuth />
        </div>
    )
}
