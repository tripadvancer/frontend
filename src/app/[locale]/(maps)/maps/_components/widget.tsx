'use client'

import { useMap } from 'react-map-gl'

export const Widget = () => {
    const { map } = useMap()

    return <div className="fixed right-8 top-8 z-50 w-full rounded-2xl bg-white shadow-small sm:w-[448px]">Widget</div>
}
