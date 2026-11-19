import { proxiedMapHosts } from '@/utils/helpers/map-proxy-constants'

export async function GET(request: Request) {
    const url = new URL(request.url).searchParams.get('url')
    if (!url || url.length > 4096) {
        return new Response('Invalid map resource URL', { status: 400 })
    }

    let resourceUrl: URL
    try {
        resourceUrl = new URL(url)
    } catch {
        return new Response('Invalid map resource URL', { status: 400 })
    }

    if (
        resourceUrl.protocol !== 'https:' ||
        resourceUrl.username ||
        resourceUrl.password ||
        !proxiedMapHosts.has(resourceUrl.hostname)
    ) {
        return new Response('Map resource host is not allowed', { status: 403 })
    }

    try {
        const origin = new URL(request.url).origin
        const upstream = await fetch(resourceUrl, {
            redirect: 'error',
            headers: { Referer: `${origin}/` },
        })
        const headers = new Headers()
        for (const name of ['content-type', 'cache-control', 'etag', 'last-modified']) {
            const value = upstream.headers.get(name)
            if (value) headers.set(name, value)
        }
        headers.set('cache-control', 'public, max-age=3600, stale-while-revalidate=86400')
        headers.set('x-content-type-options', 'nosniff')

        return new Response(upstream.body, { status: upstream.status, headers })
    } catch {
        return new Response('Map resource unavailable', { status: 502 })
    }
}
