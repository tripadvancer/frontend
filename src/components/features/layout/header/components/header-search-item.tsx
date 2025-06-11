import { ReactNode } from 'react'

import Link from 'next/link'

type HeaderSearchItemProps = {
    title: string
    info: string
    icon: ReactNode
    href: string
}

export const HeaderSearchItem = (props: HeaderSearchItemProps) => {
    return (
        <Link href={props.href} className="group relative block cursor-pointer rounded-md hover:bg-black-5">
            <div className="flex gap-x-2 px-3 py-2">
                <div className="flex-shrink-0 text-black-40">{props.icon}</div>
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
