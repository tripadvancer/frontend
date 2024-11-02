import { ReactNode } from 'react'

import { GeoJsonPoint } from '@/utils/types/geo'

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
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    countryCode: string | null
    reviewsCount: number
    author: {
        id: number
        name: string
        avatar: string | null
    }
    location: GeoJsonPoint
    activeUserId?: number
    isAuth: boolean
}

export const PlaceSidebarActions = (props: PlaceSidebarActionsProps) => {
    return (
        <div>
            <Item>
                <PlaceSidebarActionsCheckIn {...props} />
            </Item>
            <Item>
                <PlaceSidebarActionsSave {...props} />
            </Item>
            <Item>
                <PlaceSidebarActionsNavigate {...props} />
            </Item>
            <Item>
                <PlaceSidebarActionsShowOnMap {...props} />
            </Item>
            <Item>
                <PlaceSidebarActionsShare {...props} />
            </Item>
            {props.activeUserId === props.author.id && (
                <>
                    <Item>
                        <PlaceSidebarActionsEdit {...props} />
                    </Item>
                    <Item>
                        <PlaceSidebarActionsDelete {...props} />
                    </Item>
                </>
            )}
            {props.activeUserId !== props.author.id && (
                <Item>
                    <PlaceSidebarActionsComplain {...props} />
                </Item>
            )}
        </div>
    )
}
