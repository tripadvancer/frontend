import type { AppInfo } from 'supertokens-node/types'

// Must match the backend appInfo (backend/src/auth/auth.module.ts)
export const getSuperTokensConfig = (appName: string): AppInfo => ({
    appName,
    apiDomain: process.env.NEXT_PUBLIC_API_DOMAIN!,
    apiBasePath: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth`,
    websiteDomain: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN!,
    websiteBasePath: '/auth',
})
