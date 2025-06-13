import { WidgetHeader } from '@/components/features/maps/widget/components/widget-header/widget-header'
import { WidgetSearch } from '@/components/features/maps/widget/components/widget-search/widget-search'

import { WidgetFilters } from '../components/widget-filters'
import { WidgetBaseWithAuth } from './components/widget-base/widget-base-with-auth'

export const Widget = () => {
    return (
        <div className="rounded-2xl bg-white">
            <WidgetHeader />
            <div className="flex flex-col gap-y-4 rounded-2xl bg-blue-10 px-4 py-6 sm:relative sm:gap-y-4 sm:p-8">
                <WidgetSearch />
                <WidgetFilters />
            </div>
            <div className="px-4 py-6 sm:p-8">
                <WidgetBaseWithAuth />
            </div>
        </div>
    )
}
