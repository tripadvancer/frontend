'use client'

import { useEffect, useState } from 'react'

import DOMPurify from 'dompurify'

type PlaceMainDescriptionProps = {
    description: string
}

export const PlaceMainDescription = ({ description }: PlaceMainDescriptionProps) => {
    const [sanitizedHTML, setSanitizedHTML] = useState('')

    useEffect(() => {
        const clean = DOMPurify.sanitize(description, {
            ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 's'], // Only allow safe formatting tags
            ALLOWED_ATTR: [], // Disallow all attributes (e.g., onclick, style, etc.)
            KEEP_CONTENT: true, // Keep inner text of disallowed tags (e.g., <div>text</div> → text)
        })

        setSanitizedHTML(clean)
    }, [description])

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="h5">About</h2>
            <div
                className="break-words text-big"
                // Insert sanitized HTML safely
                dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />
        </section>
    )
}
