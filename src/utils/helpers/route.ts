import { CostingModel, RouteRequest, RouteResponse, RoutingApi } from '@stadiamaps/api'

import type { LngLat } from '@/utils/types/geo'

export function buildRoute(
    startLngLat: LngLat,
    endLngLat: LngLat,
    costing: CostingModel,
    callback: (response: RouteResponse) => void,
) {
    const api = new RoutingApi()

    const req: RouteRequest = {
        locations: [
            {
                lat: startLngLat.lat,
                lon: startLngLat.lng,
                type: 'break',
            },
            {
                lat: endLngLat.lat,
                lon: endLngLat.lng,
                type: 'break',
            },
        ],
        costing: costing,
    }

    api.route({ routeRequest: req })
        .then(callback)
        .catch(function (e: any) {
            console.error(e)
        })
}
