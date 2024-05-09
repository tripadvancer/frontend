'use client'

import { animated, useTransition } from '@react-spring/web'

import { FormButton } from '@/components/ui/form-button'
import { MapIcon16, PinIcon16 } from '@/components/ui/icons'
import { useI18n } from '@/utils/i18n/i18n.client'

type MapsContainerTogglerProps = {
    isVisible: boolean
    isToggle: boolean
    onClick: () => void
}

export const MapsContainerToggler = ({ isVisible, isToggle, onClick }: MapsContainerTogglerProps) => {
    const t = useI18n()

    const slide = useTransition(isVisible, {
        from: { opacity: 0, transform: 'translateY(100px) translateX(-50%)' },
        enter: { opacity: 1, transform: 'translateY(-48px) translateX(-50%)' },
        leave: { opacity: 0, transform: 'translateY(100px) translateX(-50%)' },
    })

    return slide(
        (style, item) =>
            item && (
                <animated.div style={style} className="fixed bottom-0 left-1/2 z-40 transform">
                    <FormButton shape="rounded" icon={isToggle ? <MapIcon16 /> : <PinIcon16 />} onClick={onClick}>
                        {isToggle ? t('widget.toggler.map') : t('widget.toggler.search_and_filters')}
                    </FormButton>
                </animated.div>
            ),
    )
}
