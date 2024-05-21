'use client'

import { animated, useTransition } from '@react-spring/web'

import { FormButton } from '@/components/ui/form-button'
import { MapIcon16, PinIcon16 } from '@/components/ui/icons'
import { getAppMode, setAppMode } from '@/redux/features/app-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { AppModes } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'

type MapLayoutMobileTogglerProps = {
    isVisible: boolean
}

export const MapLayoutMobileToggler = ({ isVisible }: MapLayoutMobileTogglerProps) => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const appMode = useAppSelector(getAppMode)

    const slide = useTransition(isVisible, {
        from: { opacity: 0, transform: 'translateY(100px) translateX(-50%)' },
        enter: { opacity: 1, transform: 'translateY(-48px) translateX(-50%)' },
        leave: { opacity: 0, transform: 'translateY(100px) translateX(-50%)' },
    })

    const buttonProps = {
        [AppModes.MAP]: {
            icon: <PinIcon16 />,
            children: t('widget.toggler.search_and_filters'),
            onClick: () => dispatch(setAppMode(AppModes.WIDGET)),
        },
        [AppModes.WIDGET]: {
            icon: <MapIcon16 />,
            children: t('widget.toggler.map'),
            onClick: () => dispatch(setAppMode(AppModes.MAP)),
        },
    }

    return slide(
        (style, item) =>
            item && (
                <animated.div style={style} className="fixed bottom-0 left-1/2 z-40 transform">
                    {/* todo: maybe add a shadow if filter is applied */}
                    {/* <div className="shadow-red absolute bottom-0 left-0 right-0 top-0 animate-pulse rounded-full" /> */}
                    <FormButton shape="rounded" {...buttonProps[appMode]} />
                </animated.div>
            ),
    )
}
