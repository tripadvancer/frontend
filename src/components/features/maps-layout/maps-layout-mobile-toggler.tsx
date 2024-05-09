'use client'

import { animated, useTransition } from '@react-spring/web'

import { FormButton } from '@/components/ui/form-button'
import { MapIcon16, PinIcon16 } from '@/components/ui/icons'
import { getMobileMapLayout, setMobileMapLayout } from '@/redux/features/app-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { MobileMapLayoutEnum } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'

type MapLayoutMobileTogglerProps = {
    isVisible: boolean
}

export const MapLayoutMobileToggler = ({ isVisible }: MapLayoutMobileTogglerProps) => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const mobileMapLayout = useAppSelector(getMobileMapLayout)

    const isMapView = mobileMapLayout === MobileMapLayoutEnum.MAP

    const slide = useTransition(isVisible, {
        from: { opacity: 0, transform: 'translateY(100px) translateX(-50%)' },
        enter: { opacity: 1, transform: 'translateY(-48px) translateX(-50%)' },
        leave: { opacity: 0, transform: 'translateY(100px) translateX(-50%)' },
    })

    const handleClick = () => {
        dispatch(setMobileMapLayout(isMapView ? MobileMapLayoutEnum.WIDGET : MobileMapLayoutEnum.MAP))
    }

    return slide(
        (style, item) =>
            item && (
                <animated.div style={style} className="fixed bottom-0 left-1/2 z-40 transform">
                    <FormButton shape="rounded" icon={isMapView ? <PinIcon16 /> : <MapIcon16 />} onClick={handleClick}>
                        {isMapView ? t('widget.toggler.search_and_filters') : t('widget.toggler.map')}
                    </FormButton>
                </animated.div>
            ),
    )
}
