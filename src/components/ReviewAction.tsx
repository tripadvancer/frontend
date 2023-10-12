'use client'

import { ActionControl } from '@/components/ActionControl'
import { Dropdown } from '@/components/Dropdown'

export const ReviewAction = () => {
    return (
        <Dropdown
            items={[
                {
                    caption: 'Complain',
                    value: 'complain',
                    onClick: () => console.log('Complain'),
                },
                {
                    caption: 'Edit',
                    value: 'edit',
                    onClick: () => console.log('Complain'),
                },
                {
                    caption: 'Delete',
                    value: 'delete',
                    onClick: () => console.log('Complain'),
                },
            ]}
        />
    )
}
