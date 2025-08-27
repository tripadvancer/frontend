'use client'

import { RefObject, useRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { useOnClickOutside } from 'usehooks-ts'

import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'

import { HeaderSearchInput } from './header-search-input'
import { HeaderSearchNearby } from './header-search-nearby'
import { HeaderSearchResult } from './header-search-result'
import { HeaderSearchSuggest } from './header-search-suggest'

export const HeaderSearch = () => {
    const ref = useRef<HTMLDivElement>(null)

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [isResultVisible, setIsResultVisible] = useState<boolean>(false)

    useKeypress(Keys.ESCAPE, () => {
        setIsResultVisible(false)
    })

    // TODO: Consider switching to a different package or waiting for a fix
    // Issue: `useOnClickOutside` does not support a `null` ref
    // More details: https://github.com/juliencrn/usehooks-ts/issues/663
    useOnClickOutside(ref as RefObject<HTMLDivElement>, () => {
        setIsResultVisible(false)
    })

    const handleInputClick = () => {
        setIsResultVisible(true)
    }

    const handleInputClear = () => {
        setSearchTerm('')
        setIsResultVisible(false)
    }

    const hideResults = () => {
        setSearchTerm('')
        setIsResultVisible(false)
    }

    return (
        <div className="relative w-full lg:w-[350px]" ref={ref}>
            <HeaderSearchInput
                value={searchTerm}
                isLoading={isLoading}
                onChange={setSearchTerm}
                onClick={handleInputClick}
                onClear={handleInputClear}
            />

            <AnimatePresence>
                {isResultVisible && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            hidden: { opacity: 0, y: -5 },
                            visible: { opacity: 1, y: 0 },
                            exit: { opacity: 0, y: -5 },
                        }}
                        transition={{ duration: 0.05 }}
                        className="absolute -left-1 -right-1 -top-1 z-0"
                    >
                        <div className="rounded-lg bg-white p-1 pt-12 shadow-small">
                            {/* <HeaderSearchNearby hideResults={hideResults} /> */}
                            {/* <hr className="my-1" /> */}
                            <HeaderSearchResult
                                searchTerm={searchTerm}
                                setIsLoading={setIsLoading}
                                hideResults={hideResults}
                            />
                            <hr className="my-1" />
                            <HeaderSearchSuggest hideResults={hideResults} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
