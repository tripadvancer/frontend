'use client'

import { SearchIcon } from 'lucide-react'

import Image from 'next/image'

import { FormButton } from '@/components/ui/form-button'
import { WidgetModes } from '@/utils/enums'
import { getWidgetMode, setWidgetMode } from '@/utils/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'

export const WidgetTogler = () => {
    const dispatch = useAppDispatch()
    const widgetMode = useAppSelector(getWidgetMode)

    const buttonProps = {
        [WidgetModes.PLACES]: {
            variant: 'orange' as 'blue' | 'orange',
            icon: <Image src="/images/icons/random.svg" alt="Random" width={24} height={24} />,
            onClick: () => dispatch(setWidgetMode(WidgetModes.RANDOM)),
        },
        [WidgetModes.RANDOM]: {
            variant: 'blue' as 'blue' | 'orange',
            icon: <SearchIcon />,
            onClick: () => dispatch(setWidgetMode(WidgetModes.PLACES)),
        },
    }

    return <FormButton {...buttonProps[widgetMode]} />
}
