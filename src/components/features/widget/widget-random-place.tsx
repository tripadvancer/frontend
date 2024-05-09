import { WidgetCategories } from './components/widget-categories'
import { WidgetHeader } from './components/widget-header/widget-header'
import { WidgetRandom } from './components/widget-random/widget-random'
import { WidgetRandomInfo } from './components/widget-random/widget-random-info'

export const WidgetRandomPlace = () => {
    return (
        <div className="bg-white">
            <WidgetHeader />
            <div className="flex flex-col gap-y-6 rounded-2xl bg-orange-10 px-4 py-6 sm:relative sm:gap-y-8 sm:p-8">
                <WidgetRandomInfo />
                <WidgetCategories variant="orange" />
            </div>
            <div className="px-4 py-6 sm:p-8">
                <WidgetRandom />
            </div>
        </div>
    )
}
