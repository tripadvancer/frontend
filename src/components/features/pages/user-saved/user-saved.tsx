'use client'

import { useState } from 'react'

import { SavedListAddButton } from '@/components/features/common/saved/saved-list-add-button'
import { SavedListView } from '@/components/features/common/saved/saved-list-view'
import { SavedLists } from '@/components/features/common/saved/saved-lists'
import { IList } from '@/utils/types/common'

export const UserSaved = () => {
    const [activeList, setActiveList] = useState<IList | null>(null)

    if (activeList) {
        return <SavedListView list={activeList} onBack={() => setActiveList(null)} />
    }

    return (
        <div className="flex flex-col">
            <SavedListAddButton caption="New list" />
            <SavedLists onSelect={setActiveList} />
        </div>
    )
}
