'use client'

import { convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

type DraftToHtmlProps = {
    json: string
}

export const DraftToHtml = ({ json }: DraftToHtmlProps) => {
    const contentState = convertFromRaw(JSON.parse(json))
    const html = stateToHTML(contentState)

    return <div dangerouslySetInnerHTML={{ __html: html }} className="text-big" />
}
