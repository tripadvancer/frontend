import { WidgetBody } from './components/widget-body'
import { WidgetBodyToggler } from './components/widget-body-toggler'
import { WidgetHeader } from './components/widget-header'

export const Widget = () => {
    return (
        <>
            <div className="scrollbar-hide fixed right-0 top-0 z-40 max-h-full w-full overflow-y-auto pb-8 sm:w-[512px] sm:p-8">
                <div className="rounded-b-2xl bg-white shadow-large sm:rounded-2xl">
                    <WidgetHeader />
                    <WidgetBody />
                </div>
            </div>
            <WidgetBodyToggler />
        </>
    )
}
