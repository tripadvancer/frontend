'use client'

import { WidgetTogler } from '../widget-togler'

export const WidgetRandomInfo = () => {
    return (
        <div className="flex gap-x-4">
            <div className="text-black-70 flex-1">
                Select categories, radius around you or a specified point and we will select interesting place for you.
            </div>
            <WidgetTogler />
        </div>
    )
}
