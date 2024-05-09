'use client'

import { animated, useTransition } from '@react-spring/web'

import { FormButton } from '@/components/ui/form-button'
import { MapIcon16, PinIcon16 } from '@/components/ui/icons'
import { useI18n } from '@/utils/i18n/i18n.client'

type MapsContainerTogglerProps = {
    isToggle: boolean
    isVisible: boolean
    onClick: () => void
}

export const MapsContainerToggler = ({ isToggle, isVisible, onClick }: MapsContainerTogglerProps) => {
    const t = useI18n()

    const fade = useTransition(isVisible, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 100 },
    })

    return fade(
        (style, item) =>
            item && (
                <animated.div style={style} className="!fixed bottom-12 left-1/2 z-40 -translate-x-1/2 transform">
                    <FormButton shape="rounded" icon={isToggle ? <MapIcon16 /> : <PinIcon16 />} onClick={onClick}>
                        {isToggle ? t('widget.toggler.map') : t('widget.toggler.search_and_filters')}
                    </FormButton>
                </animated.div>
            ),
    )
}
