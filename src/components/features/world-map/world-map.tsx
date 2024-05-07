'use client'

import classNames from 'classnames'

import { world } from './paths/world'

export const WorldMap = ({ visited }: { visited: string[] }) => {
    return (
        <svg version="1.1" viewBox="0 0 1010 653" xmlns="http://www.w3.org/2000/svg">
            <g>
                {world.map(item =>
                    item.paths.map(path => (
                        <path
                            key={path}
                            d={path}
                            className={classNames('cursor-pointer fill-orange-10 stroke-blue-80 hover:fill-orange-80', {
                                '!fill-orange-80': visited.includes(item.code),
                            })}
                            onClick={() => {}}
                        />
                    )),
                )}
            </g>
        </svg>
    )
}
