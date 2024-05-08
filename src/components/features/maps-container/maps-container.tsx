'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useScrollDirection } from 'react-use-scroll-direction'

import { animated, useTransition } from '@react-spring/web'
import { useMediaQuery } from 'usehooks-ts'

import { FormButton } from '@/components/ui/form-button'
import { MapIcon16, PinIcon16 } from '@/components/ui/icons'
import { useI18n } from '@/utils/i18n/i18n.client'

export const MapsContainer = ({ map, header, widget }: { map: ReactNode; header: ReactNode; widget: ReactNode }) => {
    const t = useI18n()
    const isMobile = useMediaQuery('(max-width: 639px)')

    const { isScrollingUp, isScrollingDown } = useScrollDirection()

    const [isToggleButtonVisible, setIsToggleButtonVisible] = useState<boolean>(true)
    const [isToggle, setIsToggle] = useState<boolean>(false)

    const fade = useTransition(isToggleButtonVisible, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 100 },
    })

    useEffect(() => {
        if (isMobile) {
            if (isScrollingUp) {
                setIsToggleButtonVisible(true)
            } else if (isScrollingDown) {
                setIsToggleButtonVisible(false)
            }
        }
    }, [isScrollingUp, isScrollingDown, isMobile])

    if (isMobile) {
        return (
            <div className="size-full">
                {isToggle ? (
                    <div style={{ minHeight: 'calc(100% + 1px)' }}>{widget}</div>
                ) : (
                    <>
                        <div className="fixed left-0 right-0 top-0 z-40 shadow-medium">{header}</div>
                        {map}
                    </>
                )}

                {fade(
                    (style, item) =>
                        item && (
                            <animated.div
                                style={style}
                                className="!fixed bottom-12 left-1/2 z-40 -translate-x-1/2 transform"
                            >
                                <FormButton
                                    shape="rounded"
                                    icon={isToggle ? <MapIcon16 /> : <PinIcon16 />}
                                    onClick={() => setIsToggle(!isToggle)}
                                >
                                    {isToggle ? t('widget.toggler.map') : t('widget.toggler.search_and_filters')}
                                </FormButton>
                            </animated.div>
                        ),
                )}
            </div>
        )
    }

    return (
        <div className="size-full">
            {map}
            <div className="scrollbar-hide fixed right-0 top-0 z-40 max-h-full w-[496px] overflow-y-auto pb-8 pl-8 pr-4 pt-4">
                <div className="overflow-hidden rounded-2xl shadow-large">{widget}</div>
            </div>
        </div>
    )
}
