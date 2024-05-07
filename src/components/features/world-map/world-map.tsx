'use client'

import { useState } from 'react'

import classNames from 'classnames'

import type { SVGPath } from '@/utils/types/common'

import { FormButton } from '@/components/ui/form-button'
import { CloseIcon24 } from '@/components/ui/icons'

import { world } from './paths/world'

export const WorldMap = ({ visited }: { visited: string[] }) => {
    const [source, setSource] = useState<SVGPath[]>(world)

    const handleClick = async (code: string) => {
        const paths = (await import(`./paths/${code.toLowerCase()}.ts`)).default
        setSource(paths)
    }

    const handleBack = () => {
        setSource(world)
    }

    return (
        <div className="relative rounded-2xl bg-blue-80 fill-black-40 p-6">
            <div
                className="flex-center hover-animated absolute left-4 top-4 size-10 cursor-pointer rounded-lg bg-white hover:text-blue-active"
                onClick={handleBack}
            >
                <CloseIcon24 />
            </div>

            <svg version="1.1" viewBox="0 0 1010 653" xmlns="http://www.w3.org/2000/svg">
                <g>
                    {source.map(item =>
                        item.paths.map(path => (
                            <path
                                key={path}
                                d={path}
                                className={classNames(
                                    'cursor-pointer fill-orange-10 stroke-blue-80 hover:fill-orange-80',
                                    {
                                        '!fill-orange-80': visited.includes(item.code),
                                    },
                                )}
                                onClick={() => handleClick(item.code)}
                            />
                        )),
                    )}
                </g>
            </svg>
        </div>
    )
}
