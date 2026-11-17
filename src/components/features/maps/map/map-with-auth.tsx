import { withAuth } from '@/utils/supertokens/with-auth'

import { Map } from './map'

export const MapWithAuth = async () => {
    return withAuth({
        render: ({ auth }) => <Map {...auth} />,
    })
}
