'use client'

import { useEffect, useState } from 'react'

import DOMPurify from 'dompurify'

type PlaceMainDescriptionProps = {
    description: string
}

export const PlaceMainDescription = ({ description }: PlaceMainDescriptionProps) => {
    const [sanitizedHTML, setSanitizedHTML] = useState('')

    useEffect(() => {
        // Step 1: Sanitize incoming HTML
        const clean = DOMPurify.sanitize(description, {
            ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 's'], // Only allow safe formatting tags
            ALLOWED_ATTR: [], // Disallow all attributes
            KEEP_CONTENT: true, // Keep inner text of disallowed tags
        })

        // Step 2: Normalize empty paragraphs so they are visible
        const normalized = clean.replace(/<p><\/p>/g, '<p>&nbsp;</p>')

        setSanitizedHTML(normalized)
    }, [description])

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="h5">About</h2>
            <div className="break-words text-big" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        </section>
    )
}
