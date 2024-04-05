import { geolocation } from '@vercel/edge'

export function GET(request: Request) {
    const { country } = geolocation(request)

    return new Response(JSON.stringify({ countryCode: country }), {
        headers: { 'content-type': 'application/json' },
    })
}
