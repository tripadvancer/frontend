import Link from 'next/link'

import { Avatar } from '@/components/ui/avatar'
import { formattedDate } from '@/utils/helpers/common'

type PlaceSidebarAuthorProps = {
    author: {
        id: number
        name: string
        avatar: string | null
    }
    createdAt: Date
}

export const PlaceSidebarAuthor = async ({ author, createdAt }: PlaceSidebarAuthorProps) => {
    return (
        <section>
            <h3 className="text-caps mb-4 uppercase">Author</h3>
            <Link href={`/users/${author.name.toLowerCase()}`} className="text-black-70 flex items-center gap-2">
                <div className="grow-0">
                    <Avatar {...author} size={32} />
                </div>
                <div className="grow overflow-hidden">
                    <div className="text-small-bold truncate">{author.name}</div>
                    <div className="text-small text-black-40">{formattedDate(createdAt)}</div>
                </div>
            </Link>
        </section>
    )
}
