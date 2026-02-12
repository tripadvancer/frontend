'use client'

import { motion } from 'framer-motion'
import { ListIcon, MapIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import Image from 'next/image'

import { FormButton } from '@/components/ui/form-button'
import { AppModes, WidgetModes } from '@/utils/enums'
import { getAppMode, setAppMode } from '@/utils/redux/features/app-slice'
import { getWidgetMode } from '@/utils/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'

type MapLayoutMobileTogglerProps = {
    isVisible: boolean
}

export const MapLayoutMobileToggler = ({ isVisible }: MapLayoutMobileTogglerProps) => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const appMode = useAppSelector(getAppMode)
    const widgetMode = useAppSelector(getWidgetMode)

    const buttonProps = {
        [WidgetModes.PLACES]: {
            [AppModes.MAP]: {
                icon: <ListIcon size={16} />,
                children: t('map.widget.toggler.list'),
                onClick: () => dispatch(setAppMode(AppModes.WIDGET)),
            },
            [AppModes.WIDGET]: {
                icon: <MapIcon size={16} />,
                children: t('map.widget.toggler.map'),
                onClick: () => dispatch(setAppMode(AppModes.MAP)),
            },
        },
        [WidgetModes.RANDOM]: {
            [AppModes.MAP]: {
                icon: <Image src="/images/icons/random.svg" alt="Random" width={16} height={16} />,
                children: t('map.widget.toggler.random'),
                variant: 'orange' as 'blue' | 'orange',
                onClick: () => dispatch(setAppMode(AppModes.WIDGET)),
            },
            [AppModes.WIDGET]: {
                icon: <MapIcon size={16} />,
                children: t('map.widget.toggler.map'),
                variant: 'orange' as 'blue' | 'orange',
                onClick: () => dispatch(setAppMode(AppModes.MAP)),
            },
        },
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 100, x: '-50%' }}
            animate={isVisible ? { opacity: 1, y: -48, x: '-50%' } : { opacity: 0, y: 100, x: '-50%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-0 left-1/2 z-40 transform"
        >
            <FormButton shape="rounded" {...buttonProps[widgetMode][appMode]} />
        </motion.div>
    )
}
