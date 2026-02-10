import { getUserInfo } from '@/services/user'
import { withAuth } from '@/utils/supertokens/with-auth'

import { HeaderDesktop } from './header-desktop'

export const HeaderDesktopAuthWrapper = async () => {
    return withAuth({
        getAuthData: async () => {
            const userData = await getUserInfo()

            if (!userData) {
                return null
            }

            return { userName: userData.name }
        },

        render: ({ auth, data }) => <HeaderDesktop username={data?.userName ?? null} {...auth} />,
    })
}
