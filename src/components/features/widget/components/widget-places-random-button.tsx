'use client'

import { useEffect, useState } from 'react'

import { FormButton } from '@/components/ui/form-button'
import { useI18n } from '@/utils/i18n/i18n.client'

type WidgetRandomButtonProps = {
    isLoading: boolean
    isUserLocated: boolean
    onClick: () => void
}

export const WidgetPlacesRandomButton = ({ isLoading, isUserLocated, onClick }: WidgetRandomButtonProps) => {
    const t = useI18n()
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [countdown, setCountdown] = useState<number | null>(null)

    useEffect(() => {
        setIsDisabled(true)
        setCountdown(3)
    }, [isLoading])

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (countdown !== null && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(prevCountdown => (prevCountdown !== null ? prevCountdown - 1 : null))
            }, 1000)
        } else {
            setIsDisabled(false)
        }
        return () => clearTimeout(timer)
    }, [countdown])

    return (
        <FormButton
            size="small"
            variant="orange"
            isLoading={isLoading}
            isDisabled={!isUserLocated || isDisabled}
            onClick={onClick}
        >
            {isDisabled && countdown !== null && countdown > 0
                ? t('widget.places.random.button_coundown', { countdown })
                : t('widget.places.random.button')}
        </FormButton>
    )
}
