import { ReactNode } from 'react'

import Link from 'next/link'

type SearchItemProps = {
    title: string
    info: string
    icon: ReactNode
    href: string
    hideResults: () => void
}

export const SearchItem = (props: SearchItemProps) => {
    return (
        <Link
            href={props.href}
            className="group hover:bg-black-5 relative block cursor-pointer rounded-md"
            onClick={props.hideResults}
        >
            <div className="flex gap-x-2 px-3 py-2">
                <div className="text-black-40 size-9 shrink-0">{props.icon}</div>
                <div className="overflow-hidden">
                    <div className="hover-animated text-black-100 group-hover:text-blue-active line-clamp-1 break-words">
                        {props.title}
                    </div>
                    <div className="text-small text-black-40 line-clamp-1 break-words">{props.info}</div>
                </div>
            </div>
        </Link>
    )
}
