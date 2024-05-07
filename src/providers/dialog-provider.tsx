'use client'

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'

interface DialogContextInterface {
    open(content: ReactNode): void
    close(): void
}

const defaultValues: DialogContextInterface = {
    open: () => {},
    close: () => {},
}

export const DialogContext = createContext(defaultValues)

export function useDialog(): DialogContextInterface {
    const context = useContext(DialogContext)

    if (context === undefined) {
        throw new Error('useDialog must be used within a DialogProvider')
    }

    return context
}

export function DialogProvider({ children }: { children: ReactNode }) {
    const [content, setContent] = useState<ReactNode>(null)

    const open = useCallback((content: ReactNode) => {
        setContent(content)
    }, [])

    const close = useCallback(() => {
        setContent(null)
    }, [])

    useKeypress(Keys.ESCAPE, close)

    //  todo: fix this hack to prevent scrolling when dialog is open
    useEffect(() => {
        if (content) {
            document.body.classList.add('overflow-y-hidden')
        } else {
            document.body.classList.remove('overflow-y-hidden')
        }
    }, [content])

    return (
        <DialogContext.Provider value={{ open, close }}>
            {children}
            <Dialog content={content} onClose={close} />
        </DialogContext.Provider>
    )
}
