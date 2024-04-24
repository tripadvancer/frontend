import { getPlaceById } from '@/services/places'

import { PlaceHeader } from './components/place-header'
import { PlaceMainAbandonedWarning } from './components/place-main-abandoned-warning'
import { PlaceMainDescription } from './components/place-main-description'
import { PlaceMainPhotos } from './components/place-main-photos'
import { PlaceMainReviews } from './components/place-main-reviews'
import { PlaceSidebarActions } from './components/place-sidebar-actions'
import { PlaceSidebarAuthor } from './components/place-sidebar-author'
import { PlaceSidebarNearby } from './components/place-sidebar-nearby'
import { PlaceSidebarRating } from './components/place-sidebar-rating'

type PlaceProps = {
    placeId: string
    activeUserId?: number
    isAuth: boolean
}

export const Place = async ({ placeId, activeUserId, isAuth }: PlaceProps) => {
    const place = await getPlaceById(placeId)

    return (
        <div className="flex flex-col">
            <PlaceHeader {...place} />
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">
                <div className="container py-24">
                    <div className="inner-container flex flex-col gap-y-16 lg:flex-row-reverse lg:gap-x-8">
                        <div className="flex w-full flex-col gap-y-8 lg:w-64">
                            <div className="flex flex-col gap-y-4">
                                <PlaceSidebarRating {...place} />
                                <PlaceSidebarActions place={place} activeUserId={activeUserId} isAuth={isAuth} />
                            </div>
                            <PlaceSidebarAuthor {...place} />
                            <PlaceSidebarNearby {...place} />
                        </div>

                        <div className="flex min-w-0 flex-col gap-y-16">
                            <PlaceMainAbandonedWarning {...place} />
                            <PlaceMainDescription {...place} />
                            <PlaceMainPhotos {...place} />
                            <PlaceMainReviews place={place} activeUserId={activeUserId} isAuth={isAuth} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
