import type { RequestTransformFunction } from 'maplibre-gl'

import { proxiedMapHosts } from '@/utils/helpers/map-proxy-constants'

export const transformMapRequest: RequestTransformFunction = url => {
    try {
        const parsedUrl = new URL(url)
        if (parsedUrl.protocol !== 'https:' || !proxiedMapHosts.has(parsedUrl.hostname)) {
            return { url }
        }
        return { url: `/api/map-proxy?url=${encodeURIComponent(parsedUrl.toString())}` }
    } catch {
        return { url }
    }
}
