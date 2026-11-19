'use client'

import { ArrowLeftIcon, PencilIcon, TrashIcon } from 'lucide-react'

import { ListEdit } from '@/components/features/dialogs/list-form/list-edit'
import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Confirmation } from '@/components/ui/confirmation'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { listAPI } from '@/utils/redux/services/list/list.api'
import { IList } from '@/utils/types/common'

import { SavedListPlacesFeed } from './saved-list-places-feed'

type SavedListViewProps = {
    list: IList
    onBack: () => void
    actions?: DropdownItemProps[]
    selectedCategories?: number[]
}

export const SavedListView = ({ list, onBack, actions = [], selectedCategories }: SavedListViewProps) => {
    const dialog = useDialog()
    const toast = useToast()

    const { data: lists } = listAPI.useGetListsQuery()
    const [deleteList] = listAPI.useDeleteListMutation()
    const activeList = lists?.find(({ id }) => id === list.id) ?? list

    const items: DropdownItemProps[] = [
        ...actions,
        {
            caption: 'Edit',
            value: 'edit',
            icon: <PencilIcon size={16} />,
            onClick: () => dialog.open(<ListEdit {...activeList} />),
        },
        {
            caption: 'Delete',
            value: 'delete',
            icon: <TrashIcon size={16} />,
            isRed: true,
            onClick: () =>
                dialog.open(
                    <Confirmation
                        variant="red"
                        title="Delete list"
                        message="Are you sure you want to delete this list? This action is irreversible."
                        onConfirm={async () => {
                            try {
                                await deleteList(activeList.id).unwrap()
                                onBack()
                                dialog.close()
                            } catch {
                                toast.error(UNEXPECTED_ERROR_MESSAGE)
                            }
                        }}
                    />,
                ),
        },
    ]

    return (
        <div className="flex flex-col gap-y-6">
            <div className="flex-center justify-between gap-x-8">
                <button
                    type="button"
                    className="hover-animated hover:text-blue-active relative cursor-pointer overflow-hidden border-0 bg-transparent pl-6 text-left"
                    onClick={onBack}
                >
                    <div className="absolute top-1 left-0">
                        <ArrowLeftIcon size={16} absoluteStrokeWidth />
                    </div>
                    <div className="text-big-bold overflow-hidden text-ellipsis">{activeList.name}</div>
                </button>
                <Dropdown items={items} />
            </div>
            {activeList.description && <div className="text-black-70 wrap-break-word">{activeList.description}</div>}
            <SavedListPlacesFeed listId={activeList.id} selectedCategories={selectedCategories} />
        </div>
    )
}
