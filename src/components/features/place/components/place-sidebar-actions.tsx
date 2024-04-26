import { ReactNode } from 'react'

import type { IPlace } from '@/utils/types/place'

import { PlaceSidebarActionsCheckIn } from './place-sidebar-actions-check-in'
import { PlaceSidebarActionsComplain } from './place-sidebar-actions-complain'
import { PlaceSidebarActionsDelete } from './place-sidebar-actions-delete'
import { PlaceSidebarActionsEdit } from './place-sidebar-actions-edit'
import { PlaceSidebarActionsNavigate } from './place-sidebar-actions-navigate'
import { PlaceSidebarActionsSave } from './place-sidebar-actions-save'
import { PlaceSidebarActionsShare } from './place-sidebar-actions-share'
import { PlaceSidebarActionsShowOnMap } from './place-sidebar-actions-show-on-map'

const Item = ({ children }: { children: ReactNode }) => {
    return <div className="border-t border-dashed border-black-40 py-4 text-big-bold last:border-b">{children}</div>
}

type PlaceSidebarActionsProps = {
    place: IPlace
    activeUserId?: number
    isAuth: boolean
}

export const PlaceSidebarActions = ({ place, activeUserId, isAuth }: PlaceSidebarActionsProps) => {
    return (
        <div>
            <Item>
                <PlaceSidebarActionsCheckIn place={place} isAuth={isAuth} />
            </Item>
            <Item>
                <PlaceSidebarActionsSave place={place} isAuth={isAuth} />
            </Item>
            <Item>
                <PlaceSidebarActionsNavigate place={place} />
            </Item>
            <Item>
                <PlaceSidebarActionsShowOnMap place={place} isAuth={isAuth} />
            </Item>
            <Item>
                <PlaceSidebarActionsShare place={place} />
            </Item>
            {activeUserId === place.author.id && (
                <>
                    <Item>
                        <PlaceSidebarActionsEdit place={place} />
                    </Item>
                    <Item>
                        <PlaceSidebarActionsDelete place={place} />
                    </Item>
                </>
            )}
            {activeUserId !== place.author.id && (
                <Item>
                    <PlaceSidebarActionsComplain place={place} isAuth={isAuth} />
                </Item>
            )}
        </div>
    )
}
