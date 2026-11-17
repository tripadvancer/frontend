import { getUserInfo } from '@/services/user'
import { withAuth } from '@/utils/supertokens/with-auth'

import { HeaderMobile } from './header-mobile'

export const HeaderMobileAuthWrapper = async () => {
    return withAuth({
        getAuthData: getUserInfo,
        render: ({ auth, data }) => <HeaderMobile username={data?.name ?? null} {...auth} />,
    })
}
