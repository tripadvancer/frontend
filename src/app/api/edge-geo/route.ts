import { geolocation } from '@vercel/edge'

export const runtime = 'edge'

export function GET(request: Request) {
    const { country } = geolocation(request)
    console.log(country)

    return new Response(`<h1>Your location is ${country}</h1>`, {
        headers: { 'content-type': 'text/html' },
    })
}
