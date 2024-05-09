'use client'

import { useCallback } from 'react'

import { animated, useTransition } from '@react-spring/web'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { FormButton } from '@/components/ui/form-button'
import { MapIcon16, PinIcon16 } from '@/components/ui/icons'
import { useI18n } from '@/utils/i18n/i18n.client'

type MapLayoutMobileTogglerProps = {
    isVisible: boolean
}

export const MapLayoutMobileToggler = ({ isVisible }: MapLayoutMobileTogglerProps) => {
    const t = useI18n()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const isPlaces = searchParams.get('view') === 'places'

    const slide = useTransition(isVisible, {
        from: { opacity: 0, transform: 'translateY(100px) translateX(-50%)' },
        enter: { opacity: 1, transform: 'translateY(-48px) translateX(-50%)' },
        leave: { opacity: 0, transform: 'translateY(100px) translateX(-50%)' },
    })

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())

            if (value === searchParams.get(name)) {
                params.delete(name)
                return params.toString()
            }

            params.set(name, value)
            return params.toString()
        },
        [searchParams],
    )

    const handleClick = () => {
        router.push(pathname + '?' + createQueryString('view', 'places'))
    }

    return slide(
        (style, item) =>
            item && (
                <animated.div style={style} className="fixed bottom-0 left-1/2 z-40 transform">
                    <FormButton shape="rounded" icon={isPlaces ? <MapIcon16 /> : <PinIcon16 />} onClick={handleClick}>
                        {isPlaces ? t('widget.toggler.map') : t('widget.toggler.search_and_filters')}
                    </FormButton>
                </animated.div>
            ),
    )
}
