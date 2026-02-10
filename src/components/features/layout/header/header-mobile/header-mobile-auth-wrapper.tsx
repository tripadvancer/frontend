import { getUserInfo } from '@/services/user'
import { withAuth } from '@/utils/supertokens/with-auth'

import { HeaderMobile } from './header-mobile'

export const HeaderMobileAuthWrapper = async () => {
    return withAuth({
        getAuthData: async () => {
            const userData = await getUserInfo()

            if (!userData) {
                return null
            }

            return { userName: userData.name }
        },

        render: ({ auth, data }) => <HeaderMobile username={data?.userName ?? null} {...auth} />,
    })
}
