import { SkullIcon } from 'lucide-react'

import { Notice } from '@/components/ui/notice'

type PlaceMainAbandonedWarningProps = {
    categories: number[]
}

export const PlaceMainAbandonedWarning = async ({ categories }: PlaceMainAbandonedWarningProps) => {
    // abandoned category id = 1 from categoriesDictionary
    if (categories.includes(1)) {
        return (
            <Notice
                message='Places in the "Abandoned" category might be dangerous, be careful.'
                icon={<SkullIcon />}
                variant="red"
            />
        )
    }

    return null
}
