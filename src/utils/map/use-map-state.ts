'use client'

import { useMemo } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { MapStateType, decodeMapState, encodeMapState, mapStateSchema } from '@/utils/map/map-state-utils'

export function useMapState(): [MapStateType, (next: MapStateType, options?: { cleanUrl?: boolean }) => void] {
    const searchParams = useSearchParams()
    const router = useRouter()

    const initialMapState = useMemo(() => decodeMapState(searchParams.get('state')), [searchParams])

    const setMapState = (next: MapStateType, options?: { cleanUrl?: boolean }) => {
        const encoded = encodeMapState(next)

        if (options?.cleanUrl && encoded === encodeMapState(mapStateSchema.getDefault())) {
            router.replace('/maps')
        } else {
            router.replace(`/maps/${encoded ? '?state=' + encoded : ''}`)
        }
    }

    return [initialMapState, setMapState]
}
