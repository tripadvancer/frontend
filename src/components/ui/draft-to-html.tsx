'use client'

import { convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

export const DraftToHtml = ({ draft }: { draft: string }) => {
    const contentState = convertFromRaw(JSON.parse(draft))
    const html = stateToHTML(contentState)

    return <div dangerouslySetInnerHTML={{ __html: html }} className="text-big" />
}
