import { getPlaceById } from '@/services/places'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { About } from './_components/about'
import { Actions } from './_components/actions'
import { Author } from './_components/author'
import { Header } from './_components/header/header'
import { Map } from './_components/map'
import { Photos } from './_components/photos'
import { PlaceAchivement } from './_components/place-achievement'
import { PlaceRating } from './_components/place-rating'
import { PlacesNearby } from './_components/places-nearby'
import { Reviews } from './_components/reviews'
import { UserActions } from './_components/user-actions'

export default async function PlacePage({
    params,
    searchParams,
}: {
    params: { locale: string; id: string }
    searchParams: { page: string }
}) {
    const { session, hasToken } = await getSSRSession()

    if (!session && hasToken) {
        return <TryRefreshComponent />
    }

    const accessToken = session?.getAccessToken()
    const place = await getPlaceById(params.id, accessToken)

    return (
        <div className="flex flex-col">
            <Header params={params} />
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">
                <div className="container py-24">
                    <div className="inner-container flex flex-col gap-y-16 lg:flex-row-reverse lg:gap-x-8">
                        <div className="flex w-full flex-col gap-y-8 lg:w-64">
                            <PlaceAchivement {...place} />
                            <PlaceRating {...place} />
                            <Actions {...place} />
                            <Author {...place} locale={params.locale} />
                            <UserActions {...place} />
                            <PlacesNearby {...place} />
                        </div>

                        <div className="flex flex-1 flex-col gap-y-16">
                            <About {...place} />
                            <Photos {...place} />
                            <Reviews {...place} page={searchParams.page} />
                            <Map {...place} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
