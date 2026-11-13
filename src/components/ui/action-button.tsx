import classNames from 'classnames'
import { EllipsisIcon } from 'lucide-react'

type ActionButtonProps = {
    isActivated: boolean
}

export const ActionButton = ({ isActivated }: ActionButtonProps) => {
    return (
        <div
            className={classNames(
                'flex-center hover-animated bg-blue-20 hover:bg-blue-active h-8 w-8 cursor-pointer rounded-lg text-blue-100 hover:text-white',
                {
                    'bg-blue-active text-white': isActivated,
                },
            )}
        >
            <EllipsisIcon size={16} />
        </div>
    )
}
