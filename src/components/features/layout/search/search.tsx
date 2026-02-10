'use client'

import { RefObject, useRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { useOnClickOutside } from 'usehooks-ts'

import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'

import { SearchInput } from './search-input'
import { SearchResult } from './search-result'
import { SearchSuggest } from './search-suggest'

type SearchProps = {
    closeMobileMenu?: () => void
}

export const Search = ({ closeMobileMenu }: SearchProps) => {
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
        closeMobileMenu?.()
    }

    return (
        <div className="relative w-full lg:w-[350px]" ref={ref}>
            <SearchInput
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
                            {/* <SearchNearby hideResults={hideResults} /> */}
                            {/* <hr className="my-1" /> */}
                            <SearchResult
                                searchTerm={searchTerm}
                                setIsLoading={setIsLoading}
                                hideResults={hideResults}
                            />
                            <SearchSuggest hideResults={hideResults} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
