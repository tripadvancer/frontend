'use client'

import { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'

import { FormButton } from '@/components/ui/form-button'

type WidgetRandomButtonProps = {
    isLoading: boolean
    isUserLocated: boolean
    onClick: () => void
}

export const WidgetRandomButton = ({ isLoading, isUserLocated, onClick }: WidgetRandomButtonProps) => {
    const t = useTranslations()
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
        <FormButton variant="orange" isLoading={isLoading} isDisabled={!isUserLocated || isDisabled} onClick={onClick}>
            {isDisabled && countdown !== null && countdown > 0
                ? t('map.widget.random.button.captionCoundown', { countdown })
                : t('map.widget.random.button.caption')}
        </FormButton>
    )
}
