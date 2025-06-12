import { useMemo } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { MapFiltersState, buildFiltersQueryString, parseFiltersFromSearchParams } from '@/utils/helpers/map-filters'

export function useMapFilters(): [MapFiltersState, (next: MapFiltersState) => void] {
    const searchParams = useSearchParams()
    const router = useRouter()

    const initialFilters = useMemo(() => parseFiltersFromSearchParams(searchParams), [searchParams])

    const setFiltersToUrl = (next: MapFiltersState) => {
        const query = buildFiltersQueryString(next)
        router.replace(`/maps/${query ? '?' + query : ''}`)
    }

    return [initialFilters, setFiltersToUrl]
}
