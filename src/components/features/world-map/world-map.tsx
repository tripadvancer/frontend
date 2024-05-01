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
                            className={classNames('cursor-pointer fill-black-40 stroke-black-5 hover:fill-blue-100', {
                                'fill-blue-active': visited.includes(item.code),
                            })}
                            onClick={() => {}}
                        />
                    )),
                )}
            </g>
        </svg>
    )
}
