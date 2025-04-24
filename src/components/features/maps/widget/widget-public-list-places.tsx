import Image from 'next/image'
import Link from 'next/link'

import { ActionButton } from '@/components/ui/action-button'
import { Avatar } from '@/components/ui/avatar'
import { FormButton } from '@/components/ui/form-button'

import { WidgetHeader } from './components/widget-header/widget-header'
import { WidgetPlacesWithAuth } from './components/widget-places-with-auth'

export const WidgetPublicListPlaces = () => {
    return (
        <div className="rounded-2xl bg-white">
            <WidgetHeader />
            <div className="flex flex-col gap-y-4 rounded-2xl bg-orange-10 px-4 sm:p-8">
                <Image
                    src="/images/public-list-cover-example.png"
                    alt="Places"
                    width={288}
                    height={182}
                    className="w-full"
                />
                <h1 className="text-big-bold">All Cyprus Official Trails</h1>
                <p className="text-black-70">
                    This is a list of all official trails in Cyprus. It includes the name, length, and difficulty level
                    of each trail. The list is updated regularly to ensure that it is accurate and up-to-date.
                </p>
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-black-70">
                        <div className="grow-0">
                            <Avatar size={32} name="Oskolsky" avatar={null} />
                        </div>
                        <div className="grow-1 overflow-hidden">
                            <div className="truncate text-small-bold">Oskolsky</div>
                            <div className="text-small text-black-40">Beginner</div>
                        </div>
                    </Link>
                    <FormButton size="small">Save</FormButton>
                </div>
            </div>
            <div className="px-4 py-6 sm:p-8">
                <WidgetPlacesWithAuth />
            </div>
        </div>
    )
}
