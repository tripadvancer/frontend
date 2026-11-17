import { getUserInfo } from '@/services/user'
import { withAuth } from '@/utils/supertokens/with-auth'

import { HeaderDesktop } from './header-desktop'

export const HeaderDesktopAuthWrapper = async () => {
    return withAuth({
        getAuthData: getUserInfo,
        render: ({ auth, data }) => <HeaderDesktop username={data?.name ?? null} {...auth} />,
    })
}
