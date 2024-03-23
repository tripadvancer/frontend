import { AppInfo } from 'supertokens-node/types'

export const supertokensConfig: AppInfo = {
    appName: process.env.NEXT_PUBLIC_APP_NAME as string,
    apiDomain: 'tripadvancer.me',
    apiBasePath: (process.env.NEXT_PUBLIC_API_BASE_PATH + '/auth') as string,
    websiteDomain: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN as string,
}
