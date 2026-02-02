'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

type InstallPWAButtonProps = {
    width: number
    height: number
}

export default function InstallPWAButton({ width, height }: InstallPWAButtonProps) {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [isIos, setIsIos] = useState(false)
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const ua = window.navigator.userAgent.toLowerCase()
        const ios = /iphone|ipad|ipod/.test(ua)
        setIsIos(ios)

        const inStandalone = 'standalone' in window.navigator && window.navigator.standalone === true

        if (ios && !inStandalone) {
            setShowButton(true)
        }

        const handler = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e as BeforeInstallPromptEvent)
            setShowButton(true)
        }

        window.addEventListener('beforeinstallprompt', handler)

        return () => window.removeEventListener('beforeinstallprompt', handler)
    }, [])

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            await deferredPrompt.prompt()
            const choice = await deferredPrompt.userChoice
            if (choice.outcome === 'accepted') {
                console.log('PWA установлено')
            } else {
                console.log('Пользователь отказался от установки')
            }
            setDeferredPrompt(null)
            setShowButton(false)
        } else if (isIos) {
            alert('Чтобы установить приложение, нажмите "Поделиться" и выберите "На экран Домой"')
        } else {
            alert('Установка недоступна')
        }
    }

    if (!showButton) return null

    return (
        <Image
            src="/images/pwa.svg"
            width={width}
            height={height}
            className="cursor-pointer align-top"
            onClick={handleInstallClick}
            alt="Install Comedyportal App"
        />
    )
}
