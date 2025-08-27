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
        <section className="container space-y-8 py-16 sm:space-y-16">
            <PlaceHeader {...place} />

            <div className="flex flex-col gap-y-8 sm:gap-y-16 lg:flex-row-reverse lg:gap-x-8">
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

                <div className="flex min-w-0 flex-1 flex-col gap-y-8 sm:gap-y-16">
                    <PlaceMainAbandonedWarning {...place} />
                    <PlaceMainPhotos {...place} />
                    <PlaceMainDescription {...place} />
                    <PlaceMainReviewsWithAuth {...place} />
                </div>
            </div>
        </section>
    )
}
