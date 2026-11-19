'use client'

import { ReactNode } from 'react'

import { useAppSettings } from '@/components/providers/settings-provider'
import { PlaceReviewStatus } from '@/utils/enums'
import { GeoJsonPoint } from '@/utils/types/geo'

import { PlaceSidebarActionsCheckIn } from './place-sidebar-actions-check-in'
import { PlaceSidebarActionsComplain } from './place-sidebar-actions-complain'
import { PlaceSidebarActionsDelete } from './place-sidebar-actions-delete'
import { PlaceSidebarActionsEdit } from './place-sidebar-actions-edit'
import { PlaceSidebarActionsNavigate } from './place-sidebar-actions-navigate'
import { PlaceSidebarActionsReviewStatus } from './place-sidebar-actions-review-status'
import { PlaceSidebarActionsSave } from './place-sidebar-actions-save'
import { PlaceSidebarActionsSendToMSP } from './place-sidebar-actions-send-to-msp'
import { PlaceSidebarActionsShare } from './place-sidebar-actions-share'
import { PlaceSidebarActionsShowOnMap } from './place-sidebar-actions-show-on-map'

const Item = ({ children }: { children: ReactNode }) => {
    return <div className="border-black-40 text-big-bold border-t border-dashed py-4 last:border-b">{children}</div>
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
    reviewStatus: PlaceReviewStatus | null
    reviewMessage: string | null
    canManageReviewStatus: boolean
    activeUserId?: number
    isAuth: boolean
}

export const PlaceSidebarActions = (props: PlaceSidebarActionsProps) => {
    const settings = useAppSettings()

    return (
        <div>
            {props.canManageReviewStatus && props.reviewStatus && (
                <Item>
                    <PlaceSidebarActionsReviewStatus
                        id={props.id}
                        reviewStatus={props.reviewStatus}
                        reviewMessage={props.reviewMessage}
                    />
                </Item>
            )}
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
                <PlaceSidebarActionsSendToMSP {...props} />
            </Item>
            <Item>
                <PlaceSidebarActionsShowOnMap {...props} />
            </Item>
            <Item>
                <PlaceSidebarActionsShare {...props} />
            </Item>
            {props.activeUserId === props.author.id && (
                <>
                    {settings?.switchers.update_places && (
                        <Item>
                            <PlaceSidebarActionsEdit {...props} />
                        </Item>
                    )}
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
