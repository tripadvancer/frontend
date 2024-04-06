/**
 * Fetches the user's country code from the edge-geo API.
 * See: /app/api/edge-geo/routes.ts
 */
export const getUserCountryCode = async (): Promise<string | undefined> => {
    const url = process.env.NEXT_PUBLIC_INTERNAL_API_URL + '/edge-geo'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    const { countryCode } = await res.json()

    return countryCode?.toLowerCase()
}
