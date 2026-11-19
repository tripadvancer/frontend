import 'server-only'

import { apiFetch } from '@/services/api'
import { GetPlaceByIdResponse, GetPlacesByCountryCodeResponse } from '@/services/places.types'
import {
    GetPlacesAroundParams,
    GetPlacesAroundResponse,
} from '@/utils/redux/services/places-around/places-around.types'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'

export async function getPlacesByCountryCode(
    countryCode: string,
    categoriesIds: string | undefined,
): Promise<GetPlacesByCountryCodeResponse> {
    const params = new URLSearchParams(categoriesIds ? { categories_ids: categoriesIds } : {})
    const query = params.size ? `?${params}` : ''
    return apiFetch(`countries/${encodeURIComponent(countryCode)}/places${query}`)
}

// Rejected places are returned only to their author with the BOT role. The session is forwarded only when it is valid,
// because an expired access token fails the request.
export async function getPlaceById(placeId: string): Promise<GetPlaceByIdResponse> {
    const { session } = await getSSRSessionHelper()

    return apiFetch(`places/${encodeURIComponent(placeId)}`, {
        cache: 'no-store',
        notFoundOn404: true,
        withSession: Boolean(session),
    })
}

export async function getPlacesAround({
    lat,
    lng,
    radius,
    categories,
    limit,
}: GetPlacesAroundParams): Promise<GetPlacesAroundResponse> {
    const params = new URLSearchParams({
        lat: lat.toString(),
        lng: lng.toString(),
        radius: radius.toString(),
        categories_ids: categories.join(),
        ...(limit !== undefined && { limit: limit.toString() }),
    })
    return apiFetch(`places-around?${params}`)
}
