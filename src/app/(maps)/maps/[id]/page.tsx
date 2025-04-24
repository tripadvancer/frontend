import { CookieConsent } from '@/components/features/banners/cookie-consent/cookie-consent'
import { MapWithAuth } from '@/components/features/maps/map/map-with-auth'
import { MapsLayout } from '@/components/features/maps/maps-layout/maps-layout'
import { WidgetHeader } from '@/components/features/maps/widget/components/widget-header/widget-header'
import { WidgetPublicListPlaces } from '@/components/features/maps/widget/widget-public-list-places'
import { WidgetRandomPlace } from '@/components/features/maps/widget/widget-random-place'

export default function MapsPage() {
    return (
        <div className="h-dvh w-dvw">
            <MapsLayout
                map={<MapWithAuth />}
                header={<WidgetHeader />}
                widget={<WidgetPublicListPlaces />}
                widgetRandom={<WidgetRandomPlace />}
            />
            <CookieConsent />
        </div>
    )
}
