import { WidgetCategories } from './components/widget-categories'
import { WidgetHeader } from './components/widget-header/widget-header'
import { WidgetPlacesWithAuth } from './components/widget-places-with-auth'
import { WidgetSearch } from './components/widget-search/widget-search'

export const Widget = () => {
    return (
        <div className="bg-white">
            <div className="sm:right-auth sticky left-0 right-0 top-0 z-40 sm:relative sm:left-auto sm:top-auto">
                <WidgetHeader />
                <div className="flex flex-col gap-y-6 rounded-2xl bg-blue-10 px-4 py-6 sm:relative sm:gap-y-8 sm:p-8">
                    <WidgetSearch />
                    <WidgetCategories />
                </div>
            </div>
            <div className="px-4 py-6 sm:p-8">
                <WidgetPlacesWithAuth />
            </div>
        </div>
    )
}
