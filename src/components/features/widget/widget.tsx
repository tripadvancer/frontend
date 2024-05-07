import { WidgetBody } from './components/widget-body'
import { WidgetCategories } from './components/widget-categories'
import { WidgetHeader } from './components/widget-header/widget-header'
import { WidgetPlacesWithAuth } from './components/widget-places-with-auth'
import { WidgetSearch } from './components/widget-search/widget-search'
import { WidgetToggler } from './components/widget-toggler'
import { WidgetScroll } from './widget-scroll'

export const Widget = () => {
    return (
        <WidgetScroll>
            <div className="rounded-b-2xl bg-white shadow-large sm:rounded-2xl">
                <WidgetHeader />
                <WidgetBody>
                    <>
                        <div className="relative flex flex-col gap-y-6 rounded-2xl bg-blue-10 px-4 py-6 sm:gap-y-8 sm:p-8">
                            <WidgetSearch />
                            <WidgetCategories />
                        </div>
                        <div className="px-4 py-6 sm:p-8">
                            <WidgetPlacesWithAuth />
                        </div>
                    </>
                </WidgetBody>
            </div>
            <WidgetToggler />
        </WidgetScroll>
    )
}
