'use client'

import { useEffect, useState } from 'react'

import DOMPurify from 'dompurify'

import { Translate } from '@/components/ui/translate'

type PlaceMainDescriptionProps = {
    description: string
}

export const PlaceMainDescription = ({ description }: PlaceMainDescriptionProps) => {
    const [sanitizedHTML, setSanitizedHTML] = useState('')
    const [displayText, setDisplayText] = useState(description)

    useEffect(() => {
        setDisplayText(description)
    }, [description])

    useEffect(() => {
        const clean = DOMPurify.sanitize(displayText, {
            ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 's'],
            ALLOWED_ATTR: [],
            KEEP_CONTENT: true,
        })

        const normalized = clean.replace(/<p><\/p>/g, '<p>&nbsp;</p>')
        setSanitizedHTML(normalized)
    }, [displayText])

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="h5">About</h2>

            <div className="flex flex-col gap-y-4">
                <Translate
                    originalText={description}
                    availableTargets={[
                        { label: 'Русский', code: 'ru' },
                        { label: 'English', code: 'en' },
                    ]}
                    onTranslate={setDisplayText}
                />

                <div className="break-words text-big" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            </div>
        </section>
    )
}
