import type { LngLat } from '@/utils/types/geo'

type NavigationProvider = {
    [key: string]: (lngLat: LngLat) => string
}

export const navigationProviders: NavigationProvider = {
    google: (lngLat: LngLat) => `https://google.com/maps/dir//${lngLat.lat},${lngLat.lng}`,
    waze: (lngLat: LngLat) => `https://waze.com/ul?ll=${lngLat.lat},${lngLat.lng}&navigate=yes`,
    apple: (lngLat: LngLat) => `https://maps.apple.com/?daddr=${lngLat.lat},${lngLat.lng}`,
    yandex: (lngLat: LngLat) => `https://maps.yandex.ru/?text=${lngLat.lat}+${lngLat.lng}`,
}
