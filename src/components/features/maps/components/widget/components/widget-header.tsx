import Image from 'next/image'

import { WidgetHeaderUser } from './widget-header-user'

export const WidgetHeader = () => {
    return (
        <div className="flex items-center justify-between p-4 sm:p-8">
            <Image src="/images/logo.svg" width="140" height="24" alt="Tripadvancer" />
            <WidgetHeaderUser />
        </div>
    )
}
