import classNames from 'classnames'

import { MoreIcon16 } from '@/components/ui/icons'

type ActionButtonProps = {
    isActivated: boolean
}

export const ActionButton = ({ isActivated }: ActionButtonProps) => {
    return (
        <div
            className={classNames(
                'hover-animated flex-center h-8 w-8 cursor-pointer rounded-lg bg-blue-20 text-blue-100 hover:bg-blue-active hover:text-white',
                {
                    'bg-blue-active text-white': isActivated,
                },
            )}
        >
            <MoreIcon16 />
        </div>
    )
}
