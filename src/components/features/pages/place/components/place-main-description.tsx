'use client'

import { useEffect, useState } from 'react'

import DOMPurify from 'dompurify'
import { useTranslations } from 'next-intl'

type PlaceMainDescriptionProps = {
    description: string
}

export const PlaceMainDescription = ({ description }: PlaceMainDescriptionProps) => {
    const t = useTranslations()
    const [sanitizedHTML, setSanitizedHTML] = useState<string>('')

    useEffect(() => {
        DOMPurify.addHook('afterSanitizeAttributes', node => {
            if (node.tagName === 'A') {
                const href = node.getAttribute('href') ?? ''

                if (!/^(https?:|mailto:)/i.test(href)) {
                    node.removeAttribute('href')
                    return
                }

                node.setAttribute('target', '_blank')
                node.setAttribute('rel', 'noopener noreferrer nofollow')
            }
        })

        const clean = DOMPurify.sanitize(description, {
            ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 's', 'a'],
            ALLOWED_ATTR: ['href', 'target', 'rel'],
            ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
            KEEP_CONTENT: true,
        })

        const normalized = clean.replace(/<p><\/p>/g, '<p>&nbsp;</p>')
        setSanitizedHTML(normalized)

        return () => DOMPurify.removeAllHooks()
    }, [description])

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="h5">{t('page.place.about')}</h2>
            <div className="flex flex-col gap-y-4">
                <div className="break-words text-big" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            </div>
        </section>
    )
}
