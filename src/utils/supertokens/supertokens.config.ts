import { AppInfo } from 'supertokens-node/types'

export const getSuperTokensConfig = (appName: string): AppInfo => ({
    appName,
    apiDomain: process.env.NEXT_PUBLIC_API_DOMAIN as string,
    apiBasePath: (process.env.NEXT_PUBLIC_API_BASE_PATH + '/auth') as string,
    websiteDomain: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN as string,
})
