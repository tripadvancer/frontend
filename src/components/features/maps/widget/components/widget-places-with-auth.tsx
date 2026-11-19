import { withAuth } from '@/utils/supertokens/with-auth'

import { WidgetPlaces } from './widget-places'

export const WidgetPlacesWithAuth = async () => {
    return withAuth({
        render: ({ auth }) => <WidgetPlaces isAuth={auth.isAuth} />,
    })
}
