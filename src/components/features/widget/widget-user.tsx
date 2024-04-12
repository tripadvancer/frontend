import { WidgetBody } from './components/widget-body'
import { WidgetHeader } from './components/widget-header/widget-header'
import { WidgetToggler } from './components/widget-toggler'

export const WidgetUser = () => {
    return (
        <div className="scrollbar-hide fixed right-0 top-0 z-40 max-h-full w-full overflow-y-auto pb-8 sm:w-[512px] sm:p-8">
            <div className="rounded-b-2xl bg-white shadow-large sm:rounded-2xl">
                <WidgetHeader />
                <WidgetBody>User widget body</WidgetBody>
            </div>
            <WidgetToggler />
        </div>
    )
}
