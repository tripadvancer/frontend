import { withAuth } from '@/utils/supertokens/with-auth'

import { CountryAddPlace } from './country-add-place'

export const CountryAddPlaceWithAuth = async () => {
    return withAuth({
        render: ({ auth }) => <CountryAddPlace {...auth} />,
    })
}
