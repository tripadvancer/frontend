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
            className="group relative block cursor-pointer rounded-md hover:bg-black-5"
            onClick={props.hideResults}
        >
            <div className="flex gap-x-2 px-3 py-2">
                <div className="size-9 shrink-0 text-black-40">{props.icon}</div>
                <div className="overflow-hidden">
                    <div className="hover-animated line-clamp-1 break-words text-black-100 group-hover:text-blue-active">
                        {props.title}
                    </div>
                    <div className="line-clamp-1 break-words text-small text-black-40">{props.info}</div>
                </div>
            </div>
        </Link>
    )
}
