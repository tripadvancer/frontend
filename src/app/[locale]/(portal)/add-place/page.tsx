import { notFound } from 'next/navigation'

import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

export default async function AddPlacePage() {
    const { session, hasToken } = await getSSRSession()

    if (!session) {
        if (!hasToken) {
            notFound()
        }

        return <TryRefreshComponent />
    }

    return (
        <div className="flex flex-col">
            Header
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">asa</div>
        </div>
    )
}
