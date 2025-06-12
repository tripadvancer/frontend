'use client'

import { useRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { SearchIcon, XIcon } from 'lucide-react'

import { HeaderSearchInput } from './header-search-input'
import { HeaderSearchNearby } from './header-search-nearby'
import { HeaderSearchResult } from './header-search-result'
import { HeaderSearchSuggest } from './header-search-suggest'

export const HeaderMobileSearch = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false)

    const handleInputClear = () => {
        setSearchTerm('')
    }

    return (
        <div>
            <div className="cursor-pointer text-blue-100">
                {isSearchVisible ? (
                    <XIcon onClick={() => setIsSearchVisible(false)} />
                ) : (
                    <SearchIcon onClick={() => setIsSearchVisible(true)} />
                )}
            </div>

            <AnimatePresence>
                {isSearchVisible && (
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
                        className="fixed bottom-0 left-0 right-0 top-14 z-50 bg-white p-2"
                    >
                        <div>
                            <HeaderSearchInput
                                value={searchTerm}
                                isLoading={isLoading}
                                onChange={setSearchTerm}
                                onClick={() => {}}
                                onClear={handleInputClear}
                            />

                            <div className="mt-1">
                                <HeaderSearchNearby />
                                <hr className="my-1" />
                                <HeaderSearchResult searchTerm={searchTerm} setIsLoading={setIsLoading} />
                                <HeaderSearchSuggest />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
