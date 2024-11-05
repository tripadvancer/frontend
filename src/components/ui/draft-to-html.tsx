'use client'

import { convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

type DraftToHtmlProps = {
    draft: string
}

export const DraftToHtml = ({ draft }: DraftToHtmlProps) => {
    const contentState = convertFromRaw(JSON.parse(draft))
    const html = stateToHTML(contentState)

    return <div dangerouslySetInnerHTML={{ __html: html }} />
}
