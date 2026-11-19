'use client'

import { useEffect, useState } from 'react'

import DOMPurify from 'dompurify'

type PlaceMainDescriptionProps = {
    description: string
}

export const PlaceMainDescription = ({ description }: PlaceMainDescriptionProps) => {
    const [sanitizedHTML, setSanitizedHTML] = useState<string>('')
    const [isSanitized, setIsSanitized] = useState(false)
    const plainText = description
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;|&#160;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;|&apos;/gi, "'")
        .replace(/\s+/g, ' ')
        .trim()

    useEffect(() => {
        const clean = DOMPurify.sanitize(description, {
            ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 's', 'a'],
            ALLOWED_ATTR: ['href', 'target', 'rel'],
            ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
            KEEP_CONTENT: true,
        })
        const template = document.createElement('template')
        template.innerHTML = clean
        template.content.querySelectorAll('a').forEach(anchor => {
            const href = anchor.getAttribute('href') ?? ''

            if (/^(https?:|mailto:)/i.test(href)) {
                anchor.setAttribute('target', '_blank')
                anchor.setAttribute('rel', 'noopener noreferrer nofollow')
            } else {
                anchor.removeAttribute('href')
            }
        })

        setSanitizedHTML(template.innerHTML.replace(/<p><\/p>/g, '<p>&nbsp;</p>'))
        setIsSanitized(true)
    }, [description])

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="h5">About this place</h2>
            <div className="flex flex-col gap-y-4">
                {isSanitized ? (
                    <div className="text-big wrap-break-word" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
                ) : (
                    <p className="text-big wrap-break-word">{plainText}</p>
                )}
            </div>
        </section>
    )
}
