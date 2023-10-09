'use client'

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'

import { Dialog } from '@/components/Dialog'

interface DialogContextInterface {
    setContent(dialogContent: ReactNode): void
    unsetContent(): void
}

const defaultValue: DialogContextInterface = {
    setContent: () => {},
    unsetContent: () => {},
}

export const DialogContext = createContext(defaultValue)

export function useDialog(): DialogContextInterface {
    const context = useContext(DialogContext)

    if (context === undefined) {
        throw new Error('useDialog must be used within a DialogProvider')
    }

    return context
}

export function DialogProvider({ children }: { children: ReactNode }) {
    const [content, setContent] = useState<ReactNode>(null)

    const unsetContent = useCallback(() => {
        setContent(null)
    }, [])

    useEffect(() => {
        if (content) {
            document.body.classList.add('overflow-y-hidden')
        } else {
            document.body.classList.remove('overflow-y-hidden')
        }
    }, [content])

    return (
        <DialogContext.Provider value={{ setContent, unsetContent }}>
            {children}
            {content && <Dialog content={content} onClose={unsetContent} />}
        </DialogContext.Provider>
    )
}
