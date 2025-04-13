import { ErrorBoundary } from 'react-error-boundary'

import { getPlaceById } from '@/services/places'

import { PlaceHeader } from './components/place-header'
import { PlaceMainAbandonedWarning } from './components/place-main-abandoned-warning'
import { PlaceMainDescription } from './components/place-main-description'
import { PlaceMainPhotos } from './components/place-main-photos'
import { PlaceMainReviewsWithAuth } from './components/place-main-reviews-with-auth'
import { PlaceSidebarActionsWithAuth } from './components/place-sidebar-actions-with-auth'
import { PlaceSidebarAuthor } from './components/place-sidebar-author'
import { PlaceSidebarNearby } from './components/place-sidebar-nearby'
import { PlaceSidebarRating } from './components/place-sidebar-rating'

export const Place = async ({ placeId }: { placeId: string }) => {
    const place = await getPlaceById(placeId)

    return (
        <div className="flex flex-col">
            <PlaceHeader {...place} />
            <div className="flex-1 bg-white">
                <div className="container py-24">
                    <div className="flex flex-col gap-y-16 lg:flex-row-reverse lg:gap-x-8">
                        <div className="flex w-full flex-col gap-y-8 lg:w-64">
                            <div className="flex flex-col gap-y-4">
                                <PlaceSidebarRating {...place} />
                                <PlaceSidebarActionsWithAuth {...place} />
                            </div>
                            <PlaceSidebarAuthor {...place} />
                            <ErrorBoundary fallback={null}>
                                <PlaceSidebarNearby {...place} />
                            </ErrorBoundary>
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col gap-y-16">
                            <PlaceMainAbandonedWarning {...place} />
                            <PlaceMainDescription {...place} />
                            <PlaceMainPhotos {...place} />
                            <PlaceMainReviewsWithAuth {...place} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
