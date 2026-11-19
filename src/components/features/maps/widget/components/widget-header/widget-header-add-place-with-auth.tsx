import { withAuth } from '@/utils/supertokens/with-auth'

import { WidgetHeaderAddPlace } from './widget-header-add-place'

export const WidgetHeaderAddPlaceWithAuth = async () => {
    return withAuth({
        render: ({ auth }) => <WidgetHeaderAddPlace {...auth} />,
    })
}
