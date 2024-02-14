import { getUserInfo } from '@/services/user'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { Mapbox } from './components/map/mapbox'
import { Widget } from './components/widget/widget'

export const Maps = async () => {
    const { session, hasToken } = await getSSRSession()

    let userInfo = null

    if (!session && hasToken) {
        return <TryRefreshComponent />
    }

    if (session) {
        userInfo = await getUserInfo(session.getAccessToken())
    }

    return (
        <>
            <Widget userInfo={userInfo} />
            <Mapbox />
        </>
    )
}
