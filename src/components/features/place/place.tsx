import { getPlaceById } from '@/services/places'

import { PlaceHeader } from './components/place-header'
import { PlaceMainAbout } from './components/place-main-about'
import { PlaceMainMap } from './components/place-main-map'
import { PlaceMainPhotos } from './components/place-main-photos'
import { PlaceMainReviews } from './components/place-main-reviews'
import { PlaceSidebarAchivement } from './components/place-sidebar-achievement'
import { PlaceSidebarActions } from './components/place-sidebar-actions'
import { PlaceSidebarAuthor } from './components/place-sidebar-author'
import { PlaceSidebarNearby } from './components/place-sidebar-nearby'
import { PlaceSidebarRating } from './components/place-sidebar-rating'
import { PlaceSidebarUserActions } from './components/place-sidebar-user-actions'

export const Place = async ({ placeId, reviewsCurrentPage }: { placeId: string; reviewsCurrentPage: string }) => {
    const place = await getPlaceById(placeId)

    return (
        <div className="flex flex-col">
            <PlaceHeader {...place} />
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">
                <div className="container py-24">
                    <div className="inner-container flex flex-col gap-y-16 lg:flex-row-reverse lg:gap-x-8">
                        <div className="flex w-full flex-col gap-y-8 lg:w-64">
                            <PlaceSidebarAchivement {...place} />
                            <PlaceSidebarRating {...place} />
                            <PlaceSidebarActions {...place} />
                            <PlaceSidebarAuthor {...place} />
                            <PlaceSidebarUserActions {...place} />
                            <PlaceSidebarNearby {...place} />
                        </div>

                        <div className="flex flex-1 flex-col gap-y-16">
                            <PlaceMainAbout {...place} />
                            <PlaceMainPhotos {...place} />
                            <PlaceMainReviews {...place} page={reviewsCurrentPage} />
                            <PlaceMainMap {...place} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
