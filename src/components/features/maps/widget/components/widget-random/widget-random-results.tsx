'use client'

import { WidgetMessage } from '../widget-message'
import { WidgetRandomPlace } from './widget-random-place'

type WidgetRandomResultsProps = {
    place:
        | {
              id: number
              title: string
              description: string
              cover: string | null
              avgRating: number | null
              reviewsCount: number
              countryCode: string | null
              isSaved: boolean
              coordinates: number[]
          }
        | undefined
    isSuccess: boolean
    isError: boolean
    isUserLocated: boolean
}

export const WidgetRandomResults = ({ place, isSuccess, isError, isUserLocated }: WidgetRandomResultsProps) => {
    if (isError) {
        return <WidgetMessage />
    }

    if (!isUserLocated) {
        return <WidgetMessage message="Allow location access to find places near you." />
    }

    if (isSuccess && !place) {
        return (
            <div className="m-auto text-center text-black-40">
                No places matcing your filter found.
                <br />
                Try changing categories or radius.
            </div>
        )
    }

    if (isSuccess && place) {
        return <WidgetRandomPlace {...place} />
    }

    return null
}
