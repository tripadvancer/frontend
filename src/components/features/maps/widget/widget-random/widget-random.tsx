import { WidgetCategories } from '@/components/features/maps/widget/components/widget-categories'
import { WidgetHeader } from '@/components/features/maps/widget/components/widget-header/widget-header'

import { WidgetRandomBase } from './components/widget-random-base'
import { WidgetRandomInfo } from './components/widget-random-info'

export const WidgetRandom = () => {
    return (
        <div className="rounded-2xl bg-white">
            <WidgetHeader />
            <div className="flex flex-col gap-y-6 rounded-2xl bg-orange-10 px-4 py-6 sm:relative sm:gap-y-8 sm:p-8">
                <WidgetRandomInfo />
                <WidgetCategories variant="orange" />
            </div>
            <div className="px-4 py-6 sm:p-8">
                <WidgetRandomBase />
            </div>
        </div>
    )
}
