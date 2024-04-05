import { geolocation } from '@vercel/edge'

export const runtime = 'edge'

export function GET(request: Request) {
    if (process.env.NODE_ENV === 'production') {
        const { country, latitude, longitude } = geolocation(request)

        return new Response(JSON.stringify({ countryCode: country, lng: longitude, lat: latitude }), {
            headers: { 'content-type': 'application/json' },
        })
    }

    // If environment is not production, return fake country code from .env NEXT_PUBLIC_TEST_USER_COUNTRY
    return new Response(JSON.stringify({ countryCode: process.env.NEXT_PUBLIC_TEST_USER_COUNTRY }), {
        headers: { 'content-type': 'application/json' },
    })
}
