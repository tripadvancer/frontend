import { useCallback, useState } from 'react'

import { useTranslations } from 'next-intl'

import { useToast } from '@/providers/toast-provider'
import { translateApi } from '@/redux/services/translate/translate.api'

type TranslateProps = {
    originalText: string
    availableTargets: { label: string; code: string }[]
    onTranslate: (text: string) => void
}

export const Translate = ({ originalText, availableTargets, onTranslate }: TranslateProps) => {
    const t = useTranslations()
    const toast = useToast()

    const [currentLang, setCurrentLang] = useState<'original' | string>('original')
    const [translate, { isLoading, isError }] = translateApi.useTranslateMutation()

    const handleTranslate = useCallback(
        async (targetLang: string) => {
            try {
                const result = await translate({ q: originalText, targetLang }).unwrap()
                onTranslate(result.translatedText)
                setCurrentLang(targetLang)
            } catch (err) {
                toast.error(t('common.error'))
            }
        },
        [originalText, translate, onTranslate, t, toast],
    )

    const handleShowOriginal = useCallback(() => {
        onTranslate(originalText)
        setCurrentLang('original')
    }, [originalText, onTranslate])

    if (isLoading) {
        return <div className="animate-pulse text-black-40">{t('common.translate.translating')}</div>
    }

    if (isError) {
        return <div className="text-red-500">{t('common.error')}</div>
    }

    if (currentLang !== 'original') {
        return (
            <div className="text-black-40">
                <span className="link" onClick={handleShowOriginal}>
                    {t('common.translate.showOriginal')}
                </span>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-x-2 text-black-40">
            <span>{t('common.translate.translateTo')}</span>
            {availableTargets.map(({ label, code }) => (
                <span key={`lang-${code}`} className="link" onClick={() => handleTranslate(code)}>
                    {label}
                </span>
            ))}
        </div>
    )
}
