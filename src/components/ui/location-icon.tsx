import classNames from 'classnames'

import { LocationIcon16 } from './icons'

type LocationIconProps = {
    isLocating?: boolean
}

export const LocationIcon = ({ isLocating }: LocationIconProps) => {
    return (
        <div className="relative">
            <LocationIcon16 />
            <div
                className={classNames(
                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-big text-inherit',
                    {
                        'animate-pulse-full': isLocating,
                    },
                )}
            >
                &bull;
            </div>
        </div>
    )
}
