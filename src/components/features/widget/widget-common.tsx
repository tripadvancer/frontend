import { WidgetBody } from './components/widget-body'
import { WidgetCategories } from './components/widget-categories'
import { WidgetHeader } from './components/widget-header/widget-header'
import { WidgetPlacesWithAuth } from './components/widget-places-with-auth'
import { WidgetSearch } from './components/widget-search/widget-search'
import { WidgetToggler } from './components/widget-toggler'

export const WidgetCommon = () => {
    return (
        <div className="scrollbar-hide fixed right-0 top-0 z-40 max-h-full w-full overflow-y-auto pb-8 sm:w-[512px] sm:p-8">
            <div className="rounded-b-2xl bg-white shadow-large sm:rounded-2xl">
                <WidgetHeader />
                <WidgetBody>
                    <>
                        <div className="relative flex flex-col gap-y-4 rounded-2xl bg-blue-10 p-4 sm:gap-y-8 sm:p-8">
                            <WidgetSearch />
                            <WidgetCategories />
                        </div>
                        <div className="p-4 pb-8 sm:p-8">
                            <WidgetPlacesWithAuth />
                        </div>
                    </>
                </WidgetBody>
            </div>
            <WidgetToggler />
        </div>
    )
}
